'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/axiosInstance';
import Link from 'next/link';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { Button, Dropdown, Modal, Text, ActionIcon, Input, Table, Badge } from 'rizzui';
import { RxCross2, RxUpload } from 'react-icons/rx';
import { PiPlusBold } from 'react-icons/pi';
import { CalendarIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, ArrowRightIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface ErrorResponse {
  error: string;
}


interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_amount_to_pay: number;
  total_paid_amount: number;
}

interface ApiResponse {
  customer: Customer;
}



// const pageHeader = {
//   title: 'Customers List',
//   breadcrumb: [
//     {
//       href: routes.customers,
//       name: 'Home',
//     },
//     {
//       href: routes.customers.home,
//       name: 'Customers',
//     },
//     {
//       name: 'List',
//     },
//   ],
// };


const pageHeader = {
  title: 'Customers List',
  breadcrumb: [
    {
      href: routes.customers.home, // Assuming this is a string
      name: 'Home',
    },
    {
      href: routes.customers.home, // Ensure this is a valid string route
      name: 'Customers',
    },
    {
      name: 'List', // No href, which is fine since href is optional
    },
  ],
};


export default function CustomersListPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [createModalState, setCreateModalState] = useState({ isOpen: false, size: 'xl' });
  const [importModalState, setImportModalState] = useState({ isOpen: false, size: 'lg' });
  
  const [formDataC, setFormDataC] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '',
    postalcode: '', country: '', creditlimit: '', paymentterms: '',
  });

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/customers/customerinvoices/');
      const data = response.data as ApiResponse[];
      setCustomers(data.map((customerData) => customerData.customer));
    } catch (error: any) {
      setError(error.message || 'Failed to fetch customer data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataC((prevData) => ({ ...prevData, [name]: value }));
  };




const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log('File input changed'); // Check if the input change event is fired
  const selectedFile = e.target.files?.[0];

  if (selectedFile) {
      console.log('Selected file:', selectedFile); // Log the selected file
      if (selectedFile.size > 10 * 1024 * 1024) {
          toast.error('File size should not exceed 10MB');
          return;
      }
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension && ['csv', 'xlsx', 'xls'].includes(fileExtension)) {
          setFile(selectedFile);
          toast.success(`File ${selectedFile.name} selected.`);
      } else {
          toast.error('Please select a CSV or Excel file.');
      }
  } else {
      console.log('No file selected'); // Log if no file is detected
  }
};



  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a file to import.');
      return;
    }

    console.log('File to be uploaded:', file); // Log before sending


    const formData = new FormData();

    formData.append('file', file);

    try {
      const response = await axiosInstance.post('/customers/bulk_create_customers/', formData);
      toast.success('Import completed successfully!');
      await fetchData();
      setImportModalState((prevState) => ({ ...prevState, isOpen: false }));
    } catch (error: any) {
      console.error('Import error:', error.response?.data || error);
      toast.error(error.response?.data?.error || 'Failed to import customers. Please try again.');
    }
  };

  
  const handleDownloadTemplate = () => {
    const columns = [
      'externalid', 'name', 'email', 'phone', 'address', 'city', 'state', 'country', 
      'postalcode', 'taxid', 'companyname', 'industrytype', 'paymentterms', 'creditlimit', 
      'notes', 'isactive', 'website', 'currency', 'discount', 'account_balance', 
      'customer_category', 'risk_level', 'erp_system', 'crm_id', 'referral_source'
    ];
    
    const csvContent = columns.join(',');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'customer_import_template.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast.success('CSV template downloaded successfully!');
  };
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/customers/create_customer/', formDataC);
      if (response.status === 201) {
        toast.success('Customer created successfully');
        setCreateModalState((prevState) => ({ ...prevState, isOpen: false }));
        await fetchData();
      } else {
        throw new Error('Failed to create customer');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create customer');
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Dropdown>
            <Dropdown.Trigger>
              <Button as="span" variant="outline">
                Actions <ChevronDownIcon className="ml-2 w-5" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setImportModalState((prevState) => ({ ...prevState, isOpen: true }))}>
                Import Customer
              </Dropdown.Item>
              <Dropdown.Item>
                Export Data
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button
            onClick={() => setCreateModalState((prevState) => ({ ...prevState, isOpen: true }))}
            className="w-full @lg:w-auto"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Customer
          </Button>
        </div>
      </PageHeader>

      {/* Create Customer Modal */}
      <Modal
        isOpen={createModalState.isOpen}
        // size={createModalState.size}
        size={createModalState.size as any}
        onClose={() => setCreateModalState((prevState) => ({ ...prevState, isOpen: false }))}
      >
        <div className="m-auto px-7 pb-8 pt-6">
          <div className="mb-7 flex items-center justify-between">
            <Text as="strong">Create Customer</Text>
            <ActionIcon
              size="sm"
              variant="text"
              onClick={() => setCreateModalState((prevState) => ({ ...prevState, isOpen: false }))}
            >
              <RxCross2 className="h-auto w-6" strokeWidth={1.8} />
            </ActionIcon>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 [&_label>span]:font-medium">
            <Input name="name" value={formDataC.name} onChange={handleInputChange} label="Customer Name *" className="col-span-4" />
            <Input name="email" value={formDataC.email} onChange={handleInputChange} label="Email *" className="col-span-2" />
            <Input name="phone" value={formDataC.phone} onChange={handleInputChange} label="Contact no *" className="col-span-2" />
            <Input name="address" value={formDataC.address} onChange={handleInputChange} label="Address " className="col-span-4" />
            <Input name="city" value={formDataC.city} onChange={handleInputChange} label="City " className="col-span-2" />
            <Input name="state" value={formDataC.state} onChange={handleInputChange} label="State " className="col-span-2" />
            <Input name="postalcode" value={formDataC.postalcode} onChange={handleInputChange} label="Postal Code " className="col-span-2" />
            <Input name="country" value={formDataC.country} onChange={handleInputChange} label="Country " className="col-span-2" />
            <Input name="creditlimit" value={formDataC.creditlimit} onChange={handleInputChange} label="Credit Limit " className="col-span-2" />
            <Input name="paymentterms" value={formDataC.paymentterms} onChange={handleInputChange} label="Payment Terms " className="col-span-2" />
            <Button type="submit" className="col-span-4 mt-2">Create Customer</Button>
          </form>
        </div>
      </Modal>

      {/* Import Customer Modal */}
      <Modal
        isOpen={importModalState.isOpen}
        // size={importModalState.size}
        size={importModalState.size as any}
        onClose={() => setImportModalState((prevState) => ({ ...prevState, isOpen: false }))}
      >
        <div className="m-auto p-6">
          <div className="mb-7 flex items-center justify-between">
            <Text className="text-lg font-semibold">Import Customers</Text>
            <ActionIcon
              size="sm"
              variant="text"
              onClick={() => setImportModalState((prevState) => ({ ...prevState, isOpen: false }))}
            >
              <RxCross2 className="h-5 w-5" />
            </ActionIcon>
          </div>

          <div className="mb-6">
            <Text className="mb-2 text-sm font-medium">Step 1: Download Template</Text>
            <Button onClick={handleDownloadTemplate} className="w-full" variant="outline">
              Download CSV Template
            </Button>
            <Text className="mt-2 text-xs text-gray-500">
              Download the CSV template with predefined columns for customer data.
            </Text>
          </div>

          <div className="mb-6">
            <Text className="mb-2 text-sm font-medium">Step 2: Upload Filled Template</Text>
   

<div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="file-upload-container">
  <input
    type="file"
    accept=".csv,.xlsx,.xls"
    id="file-upload"
    className="hidden"
    // onChange={handleFileChange}
    onChange={(e) => {
      console.log("target files", e.target.files); // Debug to see if the file is detected
      handleFileChange(e);
    }}
  />
  <label htmlFor="file-upload" className="cursor-pointer block text-center">
    <RxUpload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
    <Text className="text-sm font-medium">
      {file ? file.name : 'Click to upload or drag and drop'}
    </Text>
    <Text className="mt-1 text-xs text-gray-500">
      CSV or Excel files only, up to 10MB
    </Text>
  </label>
</div>
</div>

          </div>

          <Button onClick={handleImport} className="w-full" disabled={!file}>
            Import Customers
          </Button>
        </div>
      </Modal>

      {/* Search Bar */}
      <div style={{ position: 'relative', width: '17rem' }}>
        <Input
          className="mb-2"
          prefix={<MagnifyingGlassIcon className="w-4" />}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
      


        />
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Customer Name</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Phone</Table.Head>
            <Table.Head>Total Amount</Table.Head>
            <Table.Head>Paid Amount</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
      
        <Table.Body>
          {filteredCustomers.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={6} className="text-center">
                No customers found
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredCustomers.map((customer) => (
              <Table.Row key={customer.id}>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{customer.email}</Table.Cell>
                <Table.Cell>{customer.phone}</Table.Cell>
                <Table.Cell>{customer.total_amount_to_pay}</Table.Cell>
                <Table.Cell>{customer.total_paid_amount}</Table.Cell>
                <Table.Cell>
                  <Link href={`/customers/${customer.id}`}>
                    <Button size='sm' variant="outline">Details</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </>
  );
}