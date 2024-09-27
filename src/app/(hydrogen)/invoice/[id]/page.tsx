'use client';

import { useState, useEffect, useMemo } from 'react';
import { PiDownloadSimpleBold, PiEnvelopeBold } from 'react-icons/pi';
import { Button, Tab, Dropdown, Drawer, MultiSelect } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import axiosInstance from '@/axiosInstance';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation'; // Updated import
import { useParams } from 'next/navigation';
import { Table, Badge } from 'rizzui';
import { Textarea } from 'rizzui';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { Element } from 'react-scroll';
import { PiCheckCircle, PiCaretDownBold } from 'react-icons/pi';
import { Collapse } from 'rizzui';
import cn from '@utils/class-names';
import Timeline from '@/app/shared/logistics/tracking/timeline';


import { RxCross2 } from 'react-icons/rx';

import {
  Title,
  // Select,
  NumberInput,
  AdvancedRadio,
  type SelectOption,
} from 'rizzui';

import { Modal, Text, ActionIcon, Input, Password, Checkbox } from 'rizzui';
import TextArea from 'antd/es/input/TextArea';
import { stringify } from 'querystring';

// Define TypeScript interfaces for your data
interface Invoice {
  customid: string;
  externalid: string;
  issuedate: string;
  duedate: string;
  name: string;
  currency: string;
  total_amount: number;
  paid_amount: number;
  customerid: string;
  status: number;
  created_at: string;
  file_path: string;
  updated_at: string;
  reference: string;
  currency_code: string;
  account: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_amount_to_pay: number;
  total_paid_amount: number;
}


interface Payment {
  invoice: string;
  amount: number;
  method: string;
  reference: string;
  account: string;
  user: string;
  payment_date: string;
}


interface InvoiceDetails {
  invoice: Invoice;  // Assuming this is the type for the invoice
  customer: Customer; // Replace with your actual Customer type
  payments: Payment[]; // Assuming payments is an array of Payment
}

const optionss: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  optionss.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};


// Utility function to determine the file type from the URL
const getFileType = (url: string) => {
  const extension = url.split('.').pop(); // Get the last part after the dot

  // Check if extension is undefined
  if (extension) {
    const lowerCaseExtension = extension.toLowerCase(); // Convert to lowercase
    if (['pdf'].includes(lowerCaseExtension)) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(lowerCaseExtension)) return 'image';
  }

  return 'unknown'; // Default return value if extension is undefined or does not match
};


// Define FileViewer component
const FileViewer = ({ url }: { url: string }) => {
  const fileType = getFileType(url);

  switch (fileType) {
    case 'pdf':
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
          width="100%"
          height="100%"
          className="rounded-lg"
          title="PDF Viewer"
        ></iframe>
      );
    case 'image':
      return (
        <img
          src={url}
          alt="Invoice preview"
          className="h-auto max-w-full rounded-lg"
        />
      );
    default:
      return (
        <div className="flex h-[600px] items-center justify-center rounded-lg bg-gray-100">
          Unsupported file type
        </div>
      );
  }
};

const pageHeader = {
  title: 'Invoice Details',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoices',
    },
    {
      name: 'Details',
    },
  ],
};
type Option = {
  label: string;
  value: string;
};

const multiselectoptions = [
  { label: 'Apple 🍎', value: 'apple' },
  { label: 'Banana 🍌', value: 'banana' },
  { label: 'Cherry 🍒', value: 'cherry' },
];


interface InvoiceDetails {
  invoice: Invoice;  
  customer: Customer; 
  payments: Payment[]; 
}



export default function InvoiceDetailsPage() {
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the dynamic route parameter


  const [modalState, setModalState] = useState(false);
  const [drawerState, setDrawerState] = useState(false);
  // const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [invoiceData, setInvoiceData] = useState<InvoiceDetails | null>(null);


  const [fileUrl, setFileUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [subject, setSubject] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [addCC, setAddCC] = useState('');
  const [emailDescription, setEmailDescription] = useState('');
  // const [reminders, setReminders] = useState([]); // State to store reminders
  const [reminders, setReminders] = useState<any[]>([]);

  // const [reminderError, setReminderError] = useState(null);
  const [reminderError, setReminderError] = useState<string | null>(null);
  

  // const [value, setValue] = useState(null);
  const [value, setValue] = useState([]);
  // State hooks to manage form inputs
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [reference, setReference] = useState('');


  const options = [
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Debit Card', value: 'Debit Card' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Net Banking', value: 'Net Banking' },
    { label: 'Credit', value: 'Credit' },
    { label: 'UPI', value: 'UPI' },
  ];

  const customerData = {
    name: 'John Doe',
    totalAmount: 5000,
    balanceRemaining: 2000,
    accountManager: 'Jane Smith',
    email: 'john.doe@example.com',
    cc: 'rushikesh.doe@example.com',
  };

  const companyOptions = [
    {
      label: 'Google Inc',
      value: 'google',
    },
    {
      label: 'RizzUI Inc',
      value: 'rizzui',
    },
  ];


  // useEffect(() => {
  //   async function fetchData() {
  //     if (!id) {
  //       setError(new Error('Invoice ID is missing'));
  //       setIsLoading(false);
  //       return;
  //     }
  
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       // Fetching invoice details
  //       const response = await axiosInstance.get(`/invoices/invoice_details/${id}/`);
  //       setInvoiceData(response.data);
  //       setFileUrl(response.data.invoice.file_path);
  
  //       // Fetching reminders for the invoice
  //       const remindersResponse = await axiosInstance.get(`/customers/invoices/${id}/dynamic_next_reminders/`);
  //       setReminders(remindersResponse.data.reminders); // Store reminders in state
  //     } catch (err) {
  //       setError(err as Error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  
  //   fetchData();
  // }, [id]);
  
  useEffect(() => {
    async function fetchData() {
      if (!id) {
        setError(new Error('Invoice ID is missing'));
        setIsLoading(false);
        return;
      }
  
      setIsLoading(true);
      setError(null);
      try {
        // Fetching invoice details
        const response = await axiosInstance.get(`/invoices/invoice_details/${id}/`);
        setInvoiceData(response.data);
        setFileUrl(response.data.invoice.file_path);
        // Fetching reminders for the invoice
        const fetchReminders = async () => {
          try {
            // const remindersResponse = await axiosInstance.get(`/customers/invoices/${id}/dynamic_next_reminders/`);
            const remindersResponse = await axiosInstance.get(`/customers/invoices/${id}/all-reminders/`);
            setReminders(remindersResponse.data.reminders);
          } catch (error: any) {
            if (error.response && error.response.status === 404) {
              setReminderError("No future reminders scheduled for this invoice.");
            } else {
              setReminderError("An error occurred while fetching reminders.");
            }
          }
        };
    
        await fetchReminders();
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);



  const handleAddPayment = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/invoices/add_payment/', {
        invoice: id,
        amount: parseFloat(amount), // Convert to a number
        method,
        reference,
        account: 'account_id', // Replace with actual account ID
        user: 'user_id', // Replace with actual user ID
        payment_date: new Date().toISOString(),
      });

      console.log('Payment added successfully:', response.data);
      setModalState(false); // Close the modal on success
    } catch (error) {
      console.error('Failed to add payment:', error);
    }
  };

  const handleAmountChange = (event : any) => setAmount(event.target.value);
  const handleMethodChange = (option: any) => setMethod(option.value);
  // const handleReferenceChange = (even: any) => setReference(event.target.value);


  const handleReferenceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReference(event.target.value);
  };
  
  

  const memoizedFileViewer = useMemo(() => {
    return fileUrl ? <FileViewer url={fileUrl} /> : null;
  }, [fileUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!invoiceData) {
    return <div>No invoice data available</div>;
  }

  const { invoice, customer, payments } = invoiceData;



  return (
    <>
      {/* <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader> */}

      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-gray-800">
              Add Payment
            </h3>
            <button
              onClick={() => setModalState(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <RxCross2 className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <p>
              <span className="font-medium text-gray-700">Invoice Id:</span>{' '}
              #4444
            </p>
            <p>
              <span className="font-medium text-gray-700">Customer Name:</span>{' '}
              Alice Beth
            </p>
            <p>
              <span className="font-medium text-gray-700">Total Amount:</span>{' '}
              INR 5000.00
            </p>
            <p>
              <span className="font-medium text-gray-700">Paid Amount:</span>{' '}
              INR 0.00
            </p>
            <p className="md:col-span-2">
              <span className="font-medium text-gray-700">
                Balance Remaining:
              </span>{' '}
              INR 5000.00
            </p>
          </div>

          <form onSubmit={handleAddPayment}>
            <div className="mb-6 grid grid-cols-1 gap-8">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <Select options={options} onChange={handleMethodChange} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Reference
                </label>
                <TextArea
                  placeholder="Payment for Invoice"
                  value={reference}
                  onChange={handleReferenceChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
              >
                Save Payment
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button variant="outline" onClick={() => setDrawerState(true)}>
            <PiEnvelopeBold className="me-1.5 h-[17px] w-[17px]" />
            Email Invoice
          </Button>

          <Dropdown>
            <Drawer
              isOpen={drawerState}
              size="lg"
              onClose={() => setDrawerState(false)}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    padding: '24px',
                    flexGrow: 1,
                    overflowY: 'auto',
                    // backgroundColor: '#f9fafb', // Light gray background
                  }}
                >
                  <Title className="mb-6 text-2xl font-bold">
                    Send Manual Email to Customer
                  </Title>

                  <div
                    style={{
                      backgroundColor: '#ffffff', // White background
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '24px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
                    }}
                  >
                    <Title as="h3" className="mb-3 text-lg font-semibold">
                      Customer Details
                    </Title>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      <Text>
                        <strong>Name:</strong> {customerData.name}
                      </Text>
                      <Text>
                        <strong>Account Manager:</strong>{' '}
                        {customerData.accountManager}
                      </Text>
                      <Text>
                        <strong>Current Total Amount:</strong> $
                        {customerData.totalAmount.toLocaleString()}
                      </Text>
                      <Text>
                        <strong>Balance Remaining:</strong> $
                        {customerData.balanceRemaining.toLocaleString()}
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <Input
                      label="Subject"
                      placeholder="Enter email subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    <Input
                      label="Send Email to"
                      placeholder="Enter recipient email"
                      value={sendTo}
                      onChange={(e) => setSendTo(e.target.value)}
                      defaultValue={customerData.email}
                    />
                    <Input
                      label="Add CC "
                      placeholder="Enter recipient email"
                      value={addCC}
                      onChange={(e) => setAddCC(e.target.value)}
                      defaultValue={customerData.cc}
                    />
                    <Textarea
                      label="Email Description"
                      placeholder="Enter email content"
                      value={emailDescription}
                      onChange={(e) => setEmailDescription(e.target.value)}
                      style={{ height: '160px' }} // Fixed height for textarea
                    />

                    <Select
                      mode="tags"
                      style={{ width: '100%', borderColor: 'red' }}
                      placeholder="Tags Mode"
                      onChange={handleChange}
                      options={optionss}
                      size="large"
                    />
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px',
                    borderTop: '1px solid #e5e7eb', // Light gray border
                    backgroundColor: '#ffffff', // White background
                    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)', // Subtle shadow
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px',
                    }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setDrawerState(false)}
                      style={{ borderColor: '#ddd', color: '#333' }} // Outline style
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      onClick={() => {
                        // Implement send email logic here
                        console.log('Sending email:', {
                          subject,
                          sendTo,
                          emailDescription,
                        });
                        setDrawerState(false);
                      }}
                      // Solid style
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </Drawer>
            <Dropdown.Trigger>
              <Button as="span">
                Actions <PiDownloadSimpleBold className="ml-2 w-5" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Add Remark</Dropdown.Item>
              <Dropdown.Item onClick={() => setModalState(true)}>
                Add Payment Entry
              </Dropdown.Item>
              <Dropdown.Item>Send Email</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </PageHeader>

      {/* <PageHeader title="Invoice Details" breadcrumb={['Home', 'Invoices', invoice.customid]}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button variant="outline" onClick={() => setDrawerState(true)}>
            <PiEnvelopeBold className="me-1.5 h-[17px] w-[17px]" />
            Email Invoice
          </Button>
    




          <Dropdown>

          <Drawer
      isOpen={drawerState}
      size="lg"
      onClose={() => setDrawerState(false)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          style={{
            padding: '24px',
            flexGrow: 1,
            overflowY: 'auto',
            // backgroundColor: '#f9fafb', // Light gray background
          }}
        >
          <Title className="text-2xl font-bold mb-6">Send Manual Email to Customer</Title>

          <div
            style={{
              backgroundColor: '#ffffff', // White background
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
            }}
          >
            <Title as="h3" className="text-lg font-semibold mb-3">Customer Details</Title>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Text><strong>Name:</strong> {customerData.name}</Text>
              <Text><strong>Account Manager:</strong> {customerData.accountManager}</Text>
              <Text><strong>Current Total Amount:</strong> ${customerData.totalAmount.toLocaleString()}</Text>
              <Text><strong>Balance Remaining:</strong> ${customerData.balanceRemaining.toLocaleString()}</Text>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Subject"
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Input
              label="Send Email to"
              placeholder="Enter recipient email"
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              defaultValue={customerData.email}
            />
            <Input
              label="Add CC "
              placeholder="Enter recipient email"
              value={addCC}
              onChange={(e) => setAddCC(e.target.value)}
              defaultValue={customerData.cc}
            />
            <Textarea
              label="Email Description"
              placeholder="Enter email content"
              value={emailDescription}
              onChange={(e) => setEmailDescription(e.target.value)}
              style={{ height: '160px' }} // Fixed height for textarea
            />


<Select
    mode="tags"
    style={{ width: '100%' , borderColor: 'red' }}
    placeholder="Tags Mode"
    onChange={handleChange}
    options={optionss}
    size="large"


  />


          </div>
        </div>

        <div
          style={{
            padding: '12px',
            borderTop: '1px solid #e5e7eb', // Light gray border
            backgroundColor: '#ffffff', // White background
            boxShadow: '0 -2px 4px rgba(0,0,0,0.1)', // Subtle shadow
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button
              variant="outline"
              onClick={() => setDrawerState(false)}
              style={{ borderColor: '#ddd', color: '#333' }} // Outline style
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                // Implement send email logic here
                console.log('Sending email:', { subject, sendTo, emailDescription });
                setDrawerState(false);
              }}
             // Solid style
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
            <Dropdown.Trigger>
              <Button as="span">
                Actions <PiDownloadSimpleBold className="ml-2 w-5" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Add Remark</Dropdown.Item>
              <Dropdown.Item onClick={() => setModalState(true)}>Add Payment Entry</Dropdown.Item>
              <Dropdown.Item>Send Email</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </PageHeader> */}

      <div className="">
        <Tab>
          <Tab.List>
            <Tab.ListItem>Overview</Tab.ListItem>
            <Tab.ListItem>Payment</Tab.ListItem>
            <Tab.ListItem>Activity Logs</Tab.ListItem>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="flex h-[100vh] flex-col gap-8 lg:flex-row">
                <div className="h-full overflow-hidden rounded-lg bg-white shadow-lg lg:w-2/3">
                  {memoizedFileViewer}
                </div>
                <div className="rounded-lg bg-white p-6 shadow-lg lg:w-1/3">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="border-b border-gray-200 pb-2 text-2xl font-bold">
                      Invoice Details
                    </h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        invoice.status === 1
                          ? 'bg-green-100 text-green-600'
                          : invoice.status === 2
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {invoice.status === 1
                        ? 'Paid'
                        : invoice.status === 2
                          ? 'Partially Paid'
                          : 'Unpaid'}
                    </span>
                  </div>
                  <div className="mb-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">
                        Invoice ID:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {invoice.customid}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">
                        Customer Name:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {customer.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">
                        Total Amount:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {invoice.currency} {invoice.total_amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">
                        Paid Amount:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {invoice.currency} {invoice.paid_amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">
                        Issue Date:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {new Date(invoice.issuedate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-600">
                        Due Date:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {new Date(invoice.duedate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div
                style={{
                  position: 'relative',
                  left: '998px',
                  top: '-8px',
                }}
              >
                {/* Your content here */}

                <Button variant="outline">Add Payment</Button>
              </div>

              <div className="">
                {/* bg-white rounded-lg shadow-lg p-6 h-[75vh] */}
                {/* <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Payment Details</h2> */}
                {payments.length > 0 ? (
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.Head>Amount</Table.Head>
                        <Table.Head>Payment Date</Table.Head>
                        <Table.Head>Method</Table.Head>
                        <Table.Head>Reference</Table.Head>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {payments.map((payment, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>
                            {invoice.currency} {payment.amount}
                          </Table.Cell>
                          <Table.Cell>{payment.payment_date} </Table.Cell>
                          <Table.Cell>{payment.method}</Table.Cell>
                          <Table.Cell>{payment.reference}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                ) : (
                  <p>No payment details available.</p>
                )}
              </div>
            </Tab.Panel>


            {/* <Tab.Panel>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-6 border-b pb-4 text-2xl font-bold">
                  Activity Logs
                </h2>
                <p>Activity logs will be displayed here.</p>
              </div>
            </Tab.Panel> */}

<Tab.Panel>


<div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 border-b pb-4 text-2xl font-bold">Activity Logs</h2>

      <h3 className="mt-6 text-xl font-semibold">Invoice Reminders</h3>
      {reminderError ? (
        <p>{reminderError}</p>
      ) : reminders.length > 0 ? (
        <Timeline 
          data={reminders.map((reminder) => ({
            title: reminder.trigger_name,
            text: reminder.email_subject,
            date: reminder.reminder_date,
            hightlightedText: `(${reminder.days_until_reminder} days until reminder)`,
            status: reminder.days_until_reminder <= 0 ? 'success' : 'pending',
          }))}
          className="mt-8"
        />
      ) : (
        <p>No reminders available.</p>
      )}
    </div>


</Tab.Panel>



          </Tab.Panels>
        </Tab>
      </div>
    </>
  );
}
