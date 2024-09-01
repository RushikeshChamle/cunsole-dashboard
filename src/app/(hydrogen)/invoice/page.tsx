"use client"

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


import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button, Loader } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Badge, Table } from "rizzui";
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

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const token = getCookie('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        debugger; // Execution will pause here
        const response = await fetch('http://localhost:9000/customers/cutomerinvoices/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });


        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }


        const data: ApiResponse[] = await response.json();
        setCustomersData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Display loader while loading
  // if (loading) return <Loader  />;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader variant="pulse" />
      </div>
    );
  }


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data: {error}</p>;

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
          {customersData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={7} className="text-center">
                No invoices found for this account.
              </Table.Cell>
            </Table.Row>
          ) : (
            customersData.map((customerData) =>
              customerData.invoices.map((invoice) => (
                <Table.Row key={invoice.id}>
                  <Table.Cell>{invoice.customid}</Table.Cell>
                  <Table.Cell>{customerData.customer.name}</Table.Cell>
                  <Table.Cell>{customerData.customer.email}</Table.Cell>
                  <Table.Cell>{invoice.total_amount}</Table.Cell>
                  <Table.Cell>{invoice.paid_amount}</Table.Cell>
                  <Table.Cell>{invoice.created_at}</Table.Cell>
                  <Table.Cell>{invoice.duedate}</Table.Cell>

                  <Table.Cell>
                    <Link href={`/invoice/${invoice.id}`}>
                      <Button  variant="outline" size="sm">Details</Button> {/* Added Details Button */}
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