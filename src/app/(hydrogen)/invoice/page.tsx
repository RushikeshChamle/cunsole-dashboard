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
import { subDays, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns';
import useSWR from 'swr';
import { useEffect, useState, useCallback } from 'react';



import { Badge, Table, Input } from 'rizzui';
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





// Interfaces
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
  customers?: string[];
  startDate?: string;
  endDate?: string;
  status?: string;
  minAmount?: string;
  maxAmount?: string;
}

// Predefined options
const dateRangeOptions = [
  { label: 'Last 7 Days', value: 'last_7_days' },
  { label: 'Last 30 Days', value: 'last_30_days' },
  { label: 'Last 60 Days', value: 'last_60_days' },
  { label: 'Last 90 Days', value: 'last_90_days' },
  { label: 'This Month', value: 'this_month' },
  { label: 'This Quarter', value: 'this_quarter' },
  { label: 'This Year', value: 'this_year' },
  { label: 'Custom', value: 'custom' },
];

// const statusOptions = [
//   { value: '', label: 'All Statuses' },
//   { value: '0', label: 'Due' },
//   { value: '1', label: 'Partial' },
//   { value: '2', label: 'Completed' },
//   { value: '3', label: 'Writeoff' }
// ];

const statusOptions = [
  { value: '0', label: 'Due' },
  { value: '1', label: 'Partial' },
  { value: '2', label: 'Completed' },
  { value: '3', label: 'Writeoff' }
];


export default function InvoiceListPage() {
  const [customersData, setCustomersData] = useState<ApiResponse[]>([]);
  const [customerMultiSelectOptions, setCustomerMultiSelectOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filtering states
  const [filters, setFilters] = useState<FilterState>({});
  const [filterdrawerState, setFilterdrawerState] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Date range states
  const [dateRangePreset, setDateRangePreset] = useState(dateRangeOptions[0]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [value, setValue] = useState(options[0]); // default to "Last 7 Days"
  const [dateRangeLabel, setDateRangeLabel] = useState('');
  const [isCustom, setIsCustom] = useState(false);






  // Fetch data function
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch customers
      const customersResponse = await axiosInstance.get('/customers/customers/');
      const customerOptions = customersResponse.data.customers.map((customer: Customer) => ({
        label: customer.name,
        value: customer.id,
      }));
      setCustomerMultiSelectOptions(customerOptions);

      // Prepare invoice filter params
      const params = new URLSearchParams();

      // Add filters to params
      if (filters.customers) {
        filters.customers.forEach(customerId => params.append('customers', customerId));
      }

      // Handle date filtering
      if (startDate) params.append('start_date', startDate.toISOString().split('T')[0]);
      if (endDate) params.append('end_date', endDate.toISOString().split('T')[0]);

      if (filters.status) params.append('status', filters.status);
      // if (filters.status && filters.status !== "") {
      //   params.append("status", filters.status);
      // }
      if (filters.minAmount) params.append('min_amount', filters.minAmount);
      if (filters.maxAmount) params.append('max_amount', filters.maxAmount);

      // Fetch invoices
      const invoicesResponse = await axiosInstance.get(`/customers/customerinvoices/?${params.toString()}`);
      setCustomersData(invoicesResponse.data);
    } catch (err) {
      // console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [filters, startDate, endDate]);

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleDateRangePresetChange = (selectedOption: { label: string; value: string }) => {
    setValue(selectedOption); // Update the selected value
    setIsCustomDateRange(selectedOption.value === 'custom'); // Set custom flag only for "Custom"

    if (selectedOption.value !== 'custom') {
      const { newStartDate, newEndDate } = calculateDateRange(selectedOption);

      setStartDate(newStartDate);
      setEndDate(newEndDate);

      // Format date range for display
      if (newStartDate && newEndDate) {
        const formattedStartDate = format(newStartDate, 'MMM d, yyyy');
        const formattedEndDate = format(newEndDate, 'MMM d, yyyy');
        setDateRangeLabel(`${formattedStartDate} - ${formattedEndDate}`);
      } else {
        setDateRangeLabel('');
      }

      // Update filters
      setFilters((prev) => ({
        ...prev,
        startDate: newStartDate?.toISOString().split('T')[0],
        endDate: newEndDate?.toISOString().split('T')[0],
      }));
    } else {
      // Reset dates for custom range
      setStartDate(null);
      setEndDate(null);
      setDateRangeLabel('');
      setFilters((prev) => ({
        ...prev,
        startDate: undefined,
        endDate: undefined,
      }));
    }
  };



  const calculateDateRange = useCallback((selectedOption: { value: string }) => {
    const today = new Date();
    let newStartDate: Date | null = null;
    let newEndDate: Date | null = new Date();

    switch (selectedOption.value) {
      case 'last_7_days':
        newStartDate = subDays(today, 7);
        break;
      case 'last_30_days':
        newStartDate = subDays(today, 30);
        break;
      case 'last_60_days':
        newStartDate = subDays(today, 60);
        break;
      case 'last_90_days':
        newStartDate = subDays(today, 90);
        break;
      case 'this_month':
        newStartDate = startOfMonth(today);
        newEndDate = endOfMonth(today);
        break;
      case 'this_quarter':
        newStartDate = startOfQuarter(today);
        newEndDate = endOfQuarter(today);
        break;
      case 'this_year':
        newStartDate = startOfYear(today);
        newEndDate = endOfYear(today);
        break;
      default:
        newStartDate = null;
        newEndDate = null;
    }

    return { newStartDate, newEndDate };
  }, []);


  const getSelectLabel = () => {
    if (value.value !== 'custom') {
      const { newStartDate, newEndDate } = calculateDateRange(value);
      if (newStartDate && newEndDate) {
        const formattedStartDate = format(newStartDate, 'MMM d, yyyy');
        const formattedEndDate = format(newEndDate, 'MMM d, yyyy');
        return `${formattedStartDate} - ${formattedEndDate}`;
      }
    }

    // If custom or no valid range
    return value.label;
  };




  const resetDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRangePreset(dateRangeOptions[0]);
    setIsCustomDateRange(false);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };


  const handleApplyFilters = () => {

    fetchData(); // Trigger the API call with the latest filters
  };


  const handlePresetChange = (selectedOption: { label: string; value: string }) => {
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
        } as const;

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




  // const filteredData = customersData
  //   .map((customerData) => ({
  //     ...customerData,
  //     invoices: customerData.invoices.filter((invoice) => {
  //       const searchTermLower = searchTerm.toLowerCase();


  //       // Map numeric status to label
  //       const statusLabel = 
  //         invoice.status === 0 ? 'due' :
  //         invoice.status === 1 ? 'partial' :
  //         invoice.status === 2 ? 'completed' :
  //         'writeoff';
  //       const customIdMatch = invoice.customid && invoice.customid.toLowerCase().includes(searchTermLower);
  //       const customerNameMatch = customerData.customer.name && customerData.customer.name.toLowerCase().includes(searchTermLower);
  //       const customerEmailMatch = customerData.customer.email && customerData.customer.email.toLowerCase().includes(searchTermLower);
  //       const statusLabelMatch = statusLabel.toLowerCase().includes(searchTermLower); // Check for status label match


  //       return (
  //         searchTerm === '' || customIdMatch || customerNameMatch || customerEmailMatch || statusLabelMatch
  //       );
  //     }),
  //   }))
  //   .filter((customerData) => customerData.invoices.length > 0);

  const filteredData = customersData
    .map((customerData) => ({
      ...customerData,
      invoices: customerData.invoices.filter((invoice) => {
        const searchTermLower = searchTerm.toLowerCase();

        // Map numeric status to label
        const statusLabel =
          invoice.status === 0 ? 'due' :
            invoice.status === 1 ? 'partial' :
              invoice.status === 2 ? 'completed' :
                'writeoff';

        const customIdMatch = invoice.customid && invoice.customid.toLowerCase().includes(searchTermLower);
        const customerNameMatch = customerData.customer.name && customerData.customer.name.toLowerCase().includes(searchTermLower);
        const customerEmailMatch = customerData.customer.email && customerData.customer.email.toLowerCase().includes(searchTermLower);
        const statusLabelMatch = statusLabel.toLowerCase().includes(searchTermLower); // Check for status label match

        return (
          searchTerm === '' || customIdMatch || customerNameMatch || customerEmailMatch || statusLabelMatch
        );
      }),
    }))
    .filter((customerData) => customerData.invoices.length > 0);


  // console.log("Filtered Data:", filteredData);


  // Add the resetDateFilter function
  // const resetDateFilter = () => {
  //   setStartDate(null);
  //   setEndDate(null);
  //   setValue(options[0]); // Reset to default option
  //   setDateRangeLabel('');
  //   setIsCustom(false);
  // };



  const handleResetFilters = () => {
    setFilters({});
    setSearchTerm('');
    setFilterdrawerState(false);
    resetDateFilter();
  };

  const handleDateChange = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;

      // Update state without triggering fetch
      setStartDate(start);
      setEndDate(end);

      // Fetch data only when both start and end dates are selected
      if (start && end) {
        setFilters((prev) => ({
          ...prev,
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0],
        }));
      }
    },
    []
  );

  const handleRangeChange = (range: [Date | null, Date | null]) => {
    setStartDate(range[0]);
    setEndDate(range[1]);
  };



  // Loading and error states
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader variant="threeDot" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
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

      <div className="flex items-center justify-between w-full">


        <Input
          className="mb-2 max-w-[17rem]"
          prefix={<MagnifyingGlassIcon className="w-4" />}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


        <div className="flex items-center">
          {!isCustomDateRange ? (

            <Select
              options={dateRangeOptions}
              value={getSelectLabel()}
              // onChange={handlePresetChange}
              onChange={handleDateRangePresetChange}
              clearable={true}
              onClear={resetDateFilter}
            />


          ) : (


            <DatePicker
              selected={startDate}
              onChange={handleDateChange}

              startDate={startDate}
              endDate={endDate}
              monthsShown={2}
              placeholderText="Select Date Range"
              selectsRange
              className="mr-4"
              inputProps={{
                clearable: true,
                onClear: resetDateFilter,
              }}
            />
          )}

          {/* Button for advance search */}

          {/* <Button variant="outline" onClick={() => setFilterdrawerState(true)}>
            <TbFilter className="h-[15px] w-[15px]" />
          </Button> */}
        </div>
      </div>

      <Drawer
        isOpen={filterdrawerState}
        onClose={() => setFilterdrawerState(false)}
      >
        <div className="py-4 px-5 space-y-4">
          <h2 className="text-lg font-semibold">Filter Invoices</h2>

          <MultiSelect
            value={filters.customers || []}
            clearable
            searchable
            options={customerMultiSelectOptions}
            onChange={(selected) => handleFilterChange('customers', selected)}
            onClear={() => handleFilterChange('customers', [])}
            label="Select Customers"
            placeholder="Select customers"
          />

          <Select
            label="Invoice Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
          />


          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Min Amount"
              type="number"
              placeholder="Minimum Amount"
              value={filters.minAmount || ''}
              onChange={(e) => handleFilterChange('minAmount', e.target.value)}
            />
            <Input
              label="Max Amount"
              type="number"
              placeholder="Maximum Amount"
              value={filters.maxAmount || ''}
              onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={handleResetFilters}>
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
        {/* <Table.Body>
          {customersData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={8} className="text-center">
                No invoices found for this account.
              </Table.Cell>
            </Table.Row>
          ) : (
            customersData.map((customerData) =>
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
        </Table.Body> */}

        <Table.Body>
          {filteredData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={8} className="text-center">
                No invoices found
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


