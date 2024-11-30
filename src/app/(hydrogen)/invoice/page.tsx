'use client';

const pageHeader = {
  title: 'Invoice List',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'invoices',
    },
    {
      name: 'List',
    },
  ],
};

import { TbFilter } from "react-icons/tb";


import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button, Loader } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';

import { MultiSelect } from "rizzui";

import { format } from 'date-fns';


import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Badge, Table, Input  } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';


// Define TypeScript types for the API response
interface Invoice {
  id: number;
  customid: string;
  externalid: string;
  issuedat: string;
  duedate: string;
  name: string;
  currency: string;
  total_amount: string;
  paid_amount: string;
  customerid: string;
  created_at: string;
  updated_at: string;
  account: number;
  status:number;
}


interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_amount_to_pay: number;
  total_paid_amount: number;
}



// const options = [
//   { label: "Apple 🍎", value: "apple" },
//   { label: "Banana 🍌", value: "banana" },
//   { label: "Cherry 🍒", value: "cherry" },

// ];

const options = [
  { label: 'Last 7 Days', value: 'last_7_days' },
  { label: 'Last 30 Days', value: 'last_30_days' },
  { label: 'Last 60 Days', value: 'last_60_days' },
  { label: 'Last 90 Days', value: 'last_90_days' },
  { label: 'This Month', value: 'this_month' },
  { label: 'This Quarter', value: 'this_quarter' },
  { label: 'This Year', value: 'this_year' },
  { label: 'Custom', value: 'custom' },
];




import { 

  Drawer,
  Select
} from 'rizzui';

import axiosInstance from '@/axiosInstance';


import DatePicker from "src/app/shared/datepicker.tsx";

// Define interfaces (keep existing ones)
interface Invoice {
  id: number;
  customid: string;
  externalid: string;
  issuedat: string;
  duedate: string;
  name: string;
  currency: string;
  total_amount: string;
  paid_amount: string;
  customerid: string;
  created_at: string;
  updated_at: string;
  account: number;
  status: number;
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
  invoices: Invoice[];
}

interface FilterState {
  invoiceId?: string;
  customerName?: string;
  createdFrom?: Date | null;
  createdTo?: Date | null;
  dueFrom?: Date | null;
  dueTo?: Date | null;
  status?: string;
  minAmount?: string;
  maxAmount?: string;
}

export default function InvoiceListPage() {
  const [customersData, setCustomersData] = useState<ApiResponse[]>([]);
  const [customersList, setCustomersList] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterdrawerState, setFilterdrawerState] = useState(false);
  // const [value, setValue] = useState([]);
  const [multiSelectOptions, setMultiSelectOptions] = useState<{ label: string; value: string }[]>([]);
  // const [customerMultiSelectOptions, setCustomerMultiSelectOptions] = useState<{ label: string; value: string }[]>([]);
  // const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [customerMultiSelectOptions, setCustomerMultiSelectOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);
  const [value, setValue] = useState(options[0]); // default to "Last 7 Days"
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateRangeLabel, setDateRangeLabel] = useState('');
  const [isCustom, setIsCustom] = useState(false);


  const calculateDateRange = (selectedOption) => {
    let newStartDate = null;
    let newEndDate = null;
    const today = new Date();
    
    switch (selectedOption.value) {
      case 'last_7_days':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 7);
        newEndDate = new Date();
        break;
      case 'last_30_days':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 30);
        newEndDate = new Date();
        break;
      case 'last_60_days':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 60);
        newEndDate = new Date();
        break;
      case 'last_90_days':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 90);
        newEndDate = new Date();
        break;
      case 'this_month':
        newStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        newEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'this_quarter':
        const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
        newStartDate = new Date(today.getFullYear(), quarterStartMonth, 1);
        newEndDate = new Date(today.getFullYear(), quarterStartMonth + 3, 0);
        break;
      case 'this_year':
        newStartDate = new Date(today.getFullYear(), 0, 1);
        newEndDate = new Date(today.getFullYear(), 11, 31);
        break;
      case 'custom':
        newStartDate = null;
        newEndDate = null;
        break;
    }
  
    return { newStartDate, newEndDate };
  };
  
  const handlePresetChange = (selectedOption) => {
    setValue(selectedOption);
    
    // Check if custom is selected
    setIsCustom(selectedOption.value === 'custom');
    
      // If not custom, calculate and set date range
  if (selectedOption.value !== 'custom') {
    const { newStartDate, newEndDate } = calculateDateRange(selectedOption);
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Format dates for display
    if (newStartDate && newEndDate) {
      const formatOptions = { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      };
      const formattedStartDate = newStartDate.toLocaleDateString('en-US', formatOptions);
      const formattedEndDate = newEndDate.toLocaleDateString('en-US', formatOptions);
      
      setDateRangeLabel(`${formattedStartDate} - ${formattedEndDate}`);
    } else {
      setDateRangeLabel('');
    }
  } else {
    // Reset for custom
    setStartDate(null);
    setEndDate(null);
    setDateRangeLabel('');
  }
};

const getSelectLabel = () => {
  // If there's a specific date range label, use it
  if (dateRangeLabel) {
    return dateRangeLabel;
  }
  
  // If custom and dates are set, format them
  if (isCustom && startDate && endDate) {
    const formatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    const formattedStartDate = startDate.toLocaleDateString('en-US', formatOptions);
    const formattedEndDate = endDate.toLocaleDateString('en-US', formatOptions);
    
    return `${formattedStartDate} - ${formattedEndDate}`;
  }
  
  // Fallback to the original label
  return value.label;
};


  const [filters, setFilters] = useState<FilterState>({
    invoiceId: '',
    customerName: '',
    createdFrom: null,
    createdTo: null,
    dueFrom: null,
    dueTo: null,
    status: '',
    minAmount: '',
    maxAmount: ''
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: '0', label: 'Due' },
    { value: '1', label: 'Partial' },
    { value: '2', label: 'Completed' },
    { value: '3', label: 'Writeoff' }
  ];



  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/customers/customerinvoices/');
        const data = response.data as ApiResponse[];
        setCustomersData(data);
      } catch (error: any) {
        if (error.response && error.response.data) {
          setError(error.response.data.error || 'Failed to fetch customer data');
        } else {
          setError(error.message || 'An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);




  useEffect(() => {
    async function fetchFilterData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/customers/customers/');
        
        // Log the entire response to see its structure
        // console.log('Full API Response:', response);
        // console.log('Response Data:', response.data);
  
        // Directly use the customers array from the API response
        const customers = response.data.customers || response.data;
        
        // Transform the customer data into MultiSelect options
        const options = customers.map((customer) => ({
          label: customer.name, 
          value: customer.id,   
        }));
  
        // console.log('Processed MultiSelect Options:', options);
        
        setCustomerMultiSelectOptions(options);
        setCustomersList(customers);
      } catch (error: any) {
        console.error('Error fetching customers:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.error || 'Failed to fetch customer data');
        } else {
          setError(error.message || 'An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
  
    fetchFilterData();
  }, []);

 

  const handleInputChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDateChange = (key: keyof FilterState, date: Date | null) => {
    setFilters(prev => ({
      ...prev,
      [key]: date
    }));
  };

  const handleApplyFilters = () => {
    const searchTermParts = [];
    
    if (filters.invoiceId) searchTermParts.push(filters.invoiceId);
    if (filters.customerName) searchTermParts.push(filters.customerName);
    
    const combinedSearchTerm = searchTermParts.join(' ');
    setSearchTerm(combinedSearchTerm);
    
    setFilterdrawerState(false);
  };

  const handleResetFilters = () => {
    setFilters({
      invoiceId: '',
      customerName: '',
      createdFrom: null,
      createdTo: null,
      dueFrom: null,
      dueTo: null,
      status: '',
      minAmount: '',
      maxAmount: ''
    });
    
    setSearchTerm('');
    setFilterdrawerState(false);
  };

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
};

  const filteredData = customersData
    .map((customerData) => ({
      ...customerData,
      invoices: customerData.invoices.filter((invoice) => {
        const searchTermLower = searchTerm.toLowerCase();
        const customIdMatch = invoice.customid && invoice.customid.toLowerCase().includes(searchTermLower);
        const customerNameMatch = customerData.customer.name && customerData.customer.name.toLowerCase().includes(searchTermLower);
        const customerEmailMatch = customerData.customer.email && customerData.customer.email.toLowerCase().includes(searchTermLower);

        return (
          searchTerm === '' || (customIdMatch || customerNameMatch || customerEmailMatch)
        );
      }),
    }))
    .filter((customerData) => customerData.invoices.length > 0);

  // Add the resetDateFilter function
  const resetDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setValue(options[0]); // Reset to default option
    setDateRangeLabel('');
    setIsCustom(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader variant="threeDot" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={customersData.map((customerData) => customerData.customer)}
            fileName="customer_data"
            header="ID,Name,Email,Phone,Total Amount to Pay,Total Paid Amount"
          />
          <Link href={routes.invoice.create} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Invoice
            </Button>
          </Link>
        </div>
      </PageHeader>


      <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          flex: 1,
          maxWidth: '17rem',
        }}
      >
        <Input
          className="mb-2"
          prefix={<MagnifyingGlassIcon className="w-4" />}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Wrapper for DatePicker, Select, and Button */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!isCustom && (
          <div style={{ position: 'relative', flex: 1, maxWidth: '17rem', marginRight: '1rem' }}>
            <Select
              options={options}
              value={getSelectLabel()}
              onChange={handlePresetChange}
              clearable={true}
              onClear={resetDateFilter}
            />
          </div>
        )}

        {isCustom && (
          <div id="custom-date-picker" style={{ marginRight: '1rem' }}>
   <DatePicker
  selected={startDate}
  onChange={handleRangeChange}
  startDate={startDate}
  endDate={endDate}
  monthsShown={2}
  placeholderText="Select Date Range"
  selectsRange
  inputProps={{
    clearable: true,
    onClear: resetDateFilter,
  }}
/>
          </div>
        )}

        {/* Button */}
        <Button variant="outline" onClick={() => setFilterdrawerState(true)}>
          <TbFilter className="h-[15px] w-[15px]" />
        </Button>
      </div>
    </div>



      <Drawer
        isOpen={filterdrawerState}
        onClose={() => setFilterdrawerState(false)}
      >
        <div className="py-4 px-5 space-y-4">
          <h2 className="text-lg font-semibold">Filter Invoices</h2>
          
    

<MultiSelect
  value={selectedCustomers}
  clearable={true}
  searchable={true}
  options={customerMultiSelectOptions}
  onChange={setSelectedCustomers}
  onClear={() => setSelectedCustomers([])}
  label="Select Customers"
  
  // Add these props to help with debugging and display
  placeholder="Select customers"
  getOptionLabel={(option) => option.label}
  getOptionValue={(option) => option.value}
/>



          
          <div className="grid grid-cols-2 gap-2">
            <DatePicker
              placeholderText="Select From Date"
              selected={filters.createdFrom}
              onChange={(date) => handleDateChange('createdFrom', date)}
            />
            
            <DatePicker
              placeholderText="Select To Date"
              selected={filters.createdTo}
              onChange={(date) => handleDateChange('createdTo', date)}
            />
          </div>

          
          
          <div className="grid grid-cols-2 gap-2">
            <DatePicker
              placeholderText="Select Due From Date"
              selected={filters.dueFrom}
              onChange={(date) => handleDateChange('dueFrom', date)}
            />
            
            <DatePicker
              placeholderText="Select Due To Date"
              selected={filters.dueTo}
              onChange={(date) => handleDateChange('dueTo', date)}
            />
          </div>
          
          <Select
            label="Invoice Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleInputChange('status', value)}
          />
          
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Min Amount"
              type="number"
              placeholder="Minimum Amount"
              value={filters.minAmount}
              onChange={(e) => handleInputChange('minAmount', e.target.value)}
            />
            <Input
              label="Max Amount"
              type="number"
              placeholder="Maximum Amount"
              value={filters.maxAmount}
              onChange={(e) => handleInputChange('maxAmount', e.target.value)}
            />
          </div>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={handleResetFilters}
            >
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice ID</Table.Head>
            <Table.Head>Customer Name</Table.Head>
            <Table.Head>Created At</Table.Head>
            <Table.Head>Due Date</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Total Amount</Table.Head>
            <Table.Head>Paid Amount</Table.Head>
            <Table.Head>Details</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={8} className="text-center">
                No invoices found for this account.
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredData.map((customerData) =>
              customerData.invoices.map((invoice) => (
                <Table.Row key={invoice.id}>
                  <Table.Cell>{invoice.customid}</Table.Cell>
                  <Table.Cell>{customerData.customer.name}</Table.Cell>
                  <Table.Cell>{format(new Date(invoice.created_at), 'd MMM, yyyy')}</Table.Cell>
                  <Table.Cell>{format(new Date(invoice.duedate), 'd MMM, yyyy')}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant="solid"
                      size="sm"
                      className={
                        invoice.status === 0
                          ? 'bg-red-200 text-red-700'
                          : invoice.status === 1
                          ? 'bg-yellow-200 text-yellow-700'
                          : invoice.status === 2
                          ? 'bg-green-200 text-green-700'
                          : 'bg-gray-200 text-gray-700'
                      }
                    >
                      {invoice.status === 0
                        ? 'Due'
                        : invoice.status === 1
                        ? 'Partial'
                        : invoice.status === 2
                        ? 'Completed'
                        : 'Writeoff'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{invoice.total_amount}</Table.Cell>
                  <Table.Cell>{invoice.paid_amount}</Table.Cell>
                  <Table.Cell>
                    <Link href={`/invoice/${invoice.id}`}>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            )
          )}
        </Table.Body>
      </Table>
    </>
  );
}