"use client";

import { useState, useEffect, useMemo } from 'react';
import { PiDownloadSimpleBold, PiEnvelopeBold } from 'react-icons/pi';
import { Button, Tab, Dropdown , Drawer, MultiSelect } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import axiosInstance from '@/axiosInstance';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';  // Updated import
import { useParams } from 'next/navigation';
import { Table, Badge } from "rizzui";
import { Textarea } from "rizzui";
import { Select } from 'antd';
import type { SelectProps } from 'antd';


import { RxCross2 } from "react-icons/rx";

import {

  Title,
  // Select,

  NumberInput,
  AdvancedRadio,
  type SelectOption,
} from "rizzui";



import {
  Modal,
  
  Text,
  ActionIcon,
  Input,
  Password,
  Checkbox,
} from "rizzui";
import TextArea from 'antd/es/input/TextArea';

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
  payment_date:string;
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
  const extension = url.split('.').pop().toLowerCase();
  if (['pdf'].includes(extension)) return 'pdf';
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) return 'image';
  return 'unknown';
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
          className="max-w-full h-auto rounded-lg"
        />
      );
    default:
      return (
        <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
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
  { label: "Apple 🍎", value: "apple" },
  { label: "Banana 🍌", value: "banana" },
  { label: "Cherry 🍒", value: "cherry" },

];


export default function InvoiceDetailsPage() {
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the dynamic route parameter
  const [modalState, setModalState] = useState(false);
  const [drawerState, setDrawerState] = useState(false );
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [subject, setSubject] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [addCC, setAddCC] = useState('');
  const [emailDescription, setEmailDescription] = useState('');
  // const [value, setValue] = useState(null);
  const [value, setValue] = useState([]);

 


 
  

 
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
    cc:'rushikesh.doe@example.com'
  };

  const companyOptions = [
    {
      label: "Google Inc",
      value: "google",
    },
    {
      label: "RizzUI Inc",
      value: "rizzui",
    },

  ];


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
        const response = await axiosInstance.get(`/invoices/invoice_details/${id}/`);
        setInvoiceData(response.data);
        setFileUrl(response.data.invoice.file_path);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);


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


     <Modal isOpen={modalState} onClose={() => setModalState(false)}>
     


{/* <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Add Payment</h3>
        <button
          onClick={() => setModalState(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <RxCross2 className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <p><span className="font-medium">Invoice Id:</span> #4444</p>
        <p><span className="font-medium">Customer name:</span> Alice Beth</p>
        <p><span className="font-medium">Total Amount:</span> INR 5000.00</p>
        <p><span className="font-medium">Paid Amount:</span> INR 0.00</p>
        <p className="col-span-2"><span className="font-medium">Balance Remaining:</span> INR 5000.00</p>
      </div>

      <form className="grid grid-cols-2 gap-6">
        <Input label="Payment Amount" />
        <Input label="Payment Date" type="date" />
        <Select
          label="Payment Mode"
          options={options}
          value={value}
          onChange={setValue}
        />
        <div className="col-span-2">
          <label htmlFor="remark" className="block mb-2 font-medium">Add Remark</label>
          <textarea
            id="remark"
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Enter your remark"
          />
        </div>
        <Button
          type="submit"
          className="col-span-2 w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => setModalState(false)}
        >
          Submit Payment
        </Button>
      </form>
    </div> */}
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
  <div className="flex items-center justify-between mb-8">
    <h3 className="text-2xl font-semibold text-gray-800">Add Payment</h3>
    <button
      onClick={() => setModalState(false)}
      className="text-gray-500 hover:text-gray-700"
    >
      <RxCross2 className="w-6 h-6" />
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <p><span className="font-medium text-gray-700">Invoice Id:</span> #4444</p>
    <p><span className="font-medium text-gray-700">Customer Name:</span> Alice Beth</p>
    <p><span className="font-medium text-gray-700">Total Amount:</span> INR 5000.00</p>
    <p><span className="font-medium text-gray-700">Paid Amount:</span> INR 0.00</p>
    <p className="md:col-span-2"><span className="font-medium text-gray-700">Balance Remaining:</span> INR 5000.00</p>
  </div>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Input label="Payment Amount" className="w-full" />
    <Input label="Payment Date" type="date" className="w-full" />
    <Select
      label="Payment Mode"
      options={options}
      value={value}
      onChange={setValue}
      className="w-full"
    />
    <div className="md:col-span-2">
      <label htmlFor="remark" className="block mb-2 text-gray-700 font-medium">Add Remark</label>
      <textarea
        id="remark"
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        rows="4"
        placeholder="Enter your remark"
      />
    </div>
    <Button
      type="submit"
      className="col-span-1 md:col-span-2 w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      onClick={() => setModalState(false)}
    >
      Submit Payment
    </Button>
  </form>
</div>


      
      </Modal>
      
      <PageHeader title="Invoice Details" breadcrumb={['Home', 'Invoices', invoice.customid]}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button variant="outline" onClick={() => setDrawerState(true)}>
            <PiEnvelopeBold className="me-1.5 h-[17px] w-[17px]" />
            Email Invoice
          </Button>
      {/* <Drawer
        isOpen={drawerState}
        size = "lg"
        onClose={() => setDrawerState(false) }
      >
        
        <div className="flex flex-col h-full">
        <div className="p-6 flex-grow overflow-y-auto">
          <Title className="text-2xl font-bold mb-6">Send Manual Email to Customer</Title>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Title as="h3" className="text-lg font-semibold mb-3">Customer Details</Title>
            <div className="grid grid-cols-2 gap-3">
              <Text><strong>Name:</strong> {customerData.name}</Text>
              <Text><strong>Account Manager:</strong> {customerData.accountManager}</Text>
              <Text><strong>Current Total Amount:</strong> ${customerData.totalAmount.toLocaleString()}</Text>
              <Text><strong>Balance Remaining:</strong> ${customerData.balanceRemaining.toLocaleString()}</Text>
            </div>
          </div>

          <div className="space-y-4">
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
            <Textarea
              label="Email Description"
              placeholder="Enter email content"
              value={emailDescription}
              onChange={(e) => setEmailDescription(e.target.value)}
              className="h-40"
            />
          </div>
        </div>

        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setDrawerState(false)}>
              Cancel
            </Button>
            <Button variant="solid" onClick={() => {
              // Implement send email logic here
              console.log('Sending email:', { subject, sendTo, emailDescription });
              setDrawerState(false);
            }}>
              Send Email
            </Button>
          </div>
        </div>
      </div>








      </Drawer> */}

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


            {/* <MultiSelect
      value={value}
      clearable={true}
      searchable={true}
      options={multiselectoptions}
      onChange={setValue}
      label="Multi Select"
    /> */}







      

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


          <Dropdown>
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
      </PageHeader>

      <div className="">
        <Tab>
          <Tab.List>
            <Tab.ListItem>Overview</Tab.ListItem>
            <Tab.ListItem>Payment</Tab.ListItem>
            <Tab.ListItem>Activity Logs</Tab.ListItem>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="flex flex-col lg:flex-row gap-8  h-[100vh]">
                <div className="lg:w-2/3 bg-white rounded-lg overflow-hidden shadow-lg h-full">
                  {memoizedFileViewer}
                </div>
                <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 pb-2">Invoice Details</h2>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      invoice.status === 1 ? 'bg-green-100 text-green-600' :
                      invoice.status === 2 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {invoice.status === 1 ? 'Paid' : invoice.status === 2 ? 'Partially Paid' : 'Unpaid'}
                    </span>
                  </div>
                  <div className="space-y-4 mb-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 font-medium">Invoice ID:</span>
                      <span className="text-gray-800 font-semibold">{invoice.customid}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 font-medium">Customer Name:</span>
                      <span className="text-gray-800 font-semibold">{customer.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 font-medium">Total Amount:</span>
                      <span className="text-gray-800 font-semibold">{invoice.currency} {invoice.total_amount}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 font-medium">Paid Amount:</span>
                      <span className="text-gray-800 font-semibold">{invoice.currency} {invoice.paid_amount}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 font-medium">Issue Date:</span>
                      <span className="text-gray-800 font-semibold">{new Date(invoice.issuedate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 font-medium">Due Date:</span>
                      <span className="text-gray-800 font-semibold">{new Date(invoice.duedate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {/* <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Payment Details</h2>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <div key={index} className="mb-4 p-4 border rounded">
                      <p><strong>Amount:</strong> {invoice.currency} {payment.amount}</p>
                      <p><strong>Method:</strong> {payment.method}</p>
                      <p><strong>Reference:</strong> {payment.reference}</p>
                    </div>
                  ))
                ) : (
                  <p>No payment details available.</p>
                )}
              // </div> */}
<div
  style={{
    position: "relative",
    left: "998px",
    top: "-8px"
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
                <Table.Cell>{invoice.currency} {payment.amount}</Table.Cell>
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
            <Tab.Panel>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Activity Logs</h2>
                <p>Activity logs will be displayed here.</p>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab>
      </div>
    </>
  );
}
