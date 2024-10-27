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


import { format } from 'date-fns';


import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Badge, Table, Input } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import axiosInstance from '@/axiosInstance';
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

import { metaObject } from '@/config/site.config';

// export const metadata = {
//   ...metaObject('E-Commerce'),
// };


// Function to get cookie value by name
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function CustomersListPage() {
  const [customersData, setCustomersData] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // New state for search term

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const token = getCookie('access_token');
  //       if (!token) {
  //         setError('No access token found');
  //         return;
  //       }

  //       const response = await fetch(
  //         'http://localhost:9000/customers/cutomerinvoices/',
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         const errorData: any = await response.json();
  //         throw new Error(errorData.error || 'Network response was not ok');
  //       }

  //       const data = (await response.json()) as ApiResponse[]; // Assert the type
  //       setCustomersData(data); // Ensure you are setting the correct state here
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         setError(error.message);
  //       } else {
  //         setError('An unknown error occurred');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);


  // new with updated axio prod routing
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/customers/customerinvoices/'); // Using axiosInstance

        const data = response.data as ApiResponse[]; // Type assertion
        setCustomersData(data); // Set customer data in state
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

  // Filter invoices based on the search term
  // const filteredData = customersData
  //   .map((customerData) => ({
  //     ...customerData,
  //     invoices: customerData.invoices.filter((invoice) => {
  //       return (
  //         invoice.customid.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         customerData.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         customerData.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //     }),
  //   }))
  //   .filter((customerData) => customerData.invoices.length > 0);

  const filteredData = customersData
  .map((customerData) => ({
    ...customerData,
    invoices: customerData.invoices.filter((invoice) => {
      const customIdMatch = invoice.customid && invoice.customid.toLowerCase().includes(searchTerm.toLowerCase());
      const customerNameMatch = customerData.customer.name && customerData.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const customerEmailMatch = customerData.customer.email && customerData.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      return customIdMatch || customerNameMatch || customerEmailMatch;
    }),
  }))
  .filter((customerData) => customerData.invoices.length > 0);


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader variant="pulse" />
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
          position: 'relative',
          width: '17rem',
        }}
      >
        <Input
          className="mb-2"
          prefix={<MagnifyingGlassIcon className="w-4" />}
          placeholder="Search"
          value={searchTerm} // Bind search term to input
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
        />
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice ID</Table.Head>
            <Table.Head>Customer Name</Table.Head>
            <Table.Head>Customer Email</Table.Head>
            <Table.Head>Total Amount</Table.Head>
            <Table.Head>Paid Amount</Table.Head>
            <Table.Head>Created At</Table.Head>
            <Table.Head>Due Date</Table.Head>
            <Table.Head>Details</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={7} className="text-center">
                No invoices found for this account.
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredData.map((customerData) =>
              customerData.invoices.map((invoice) => (
                <Table.Row key={invoice.id}>
                  <Table.Cell>{invoice.customid}</Table.Cell>
                  <Table.Cell>{customerData.customer.name}</Table.Cell>
                  <Table.Cell>{customerData.customer.email}</Table.Cell>
                  <Table.Cell>{invoice.total_amount}</Table.Cell>
                  <Table.Cell>{invoice.paid_amount}</Table.Cell>
                  <Table.Cell>
                    
                    
                    {/* {invoice.created_at} */}
                    {format(new Date(invoice.created_at), ' d MMM, yyyy')}

                    
                    
                    </Table.Cell>
                  <Table.Cell>
                    
                    {/* {invoice.duedate} */}
                    {format(new Date(invoice.duedate), 'd MMM, yyyy')}

                    
                    </Table.Cell>
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