'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/axiosInstance';
import { Collapse, Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import { PiCaretDownBold, PiUserFill } from 'react-icons/pi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdPayment } from 'react-icons/md';
import { format } from 'date-fns'; // Import the format function

interface Customer {
  externalid: string;
  name: string;
  companyname: string;
  email: string;
  phone: string;
  creditlimit: string | null; // Allow null
  paymentterms: string | null; // Allow null
}

interface Invoice {
  total_amount: string | null; // Allow null
  paid_amount: string | null; // Allow null
  issuedat: string | null; // Allow null
  duedate: string | null; // Allow null
}

interface CustomerData {
  customer: Customer;
  invoices: Invoice[];
}

export default function Details({ customerId, className }: { customerId: string; className?: string }) {
  const [data, setData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`invoices/get_customer_summary/${customerId}/`);
        setData(response.data);
      } catch (err: any) {
        setError('Failed to load customer data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  const { customer, invoices } = data;

  // Helper to safely extract and format dates
  const formatDate = (date: string | null | undefined) => {
    return date ? format(new Date(date), 'd MMM, yyyy') : 'N/A';
  };

  // Memoized calculations (calculated only when data is available)
  const totalOutstanding = invoices.reduce((acc, inv) => {
    const total = parseFloat(inv.total_amount ?? '0'); // Treat null as 0
    const paid = parseFloat(inv.paid_amount ?? '0'); // Treat null as 0
    return acc + (total - paid);
  }, 0);

  const creditLimit = parseFloat(customer.creditlimit ?? '0'); // Default to 0 if null
  const availableCredit = (creditLimit - totalOutstanding).toFixed(2);
  const outstandingBalance = totalOutstanding.toFixed(2);

  const customerInformation = [
    {
      title: 'Customer Overview',
      icon: <PiUserFill className="h-5 w-5 text-primary" />,
      data: [
        { name: 'Customer ID', value: customer.externalid },
        { name: 'Name', value: customer.name },
        { name: 'Company', value: customer.companyname },
        { name: 'Email', value: customer.email },
        { name: 'Phone', value: customer.phone },
      ],
    },
    {
      title: 'Account Summary',
      icon: <RiMoneyDollarCircleLine className="h-5 w-6 text-primary" />,
      data: [
        { name: 'Total Outstanding', value: `$${outstandingBalance}` },
        { name: 'Credit Limit', value: `$${customer.creditlimit ?? 'N/A'}` }, // Handle null
        { name: 'Available Credit', value: `$${availableCredit}` },
        { name: 'Payment Terms', value: customer.paymentterms ?? 'N/A' }, // Handle null
      ],
    },
    {
      title: 'Recent Transactions',
      icon: <MdPayment className="h-5 w-5 text-primary" />,
      data: [
        { name: 'Last Payment Date', value: formatDate(invoices[0]?.issuedat) },
        { name: 'Last Payment Amount', value: invoices[0] ? `$${invoices[0].paid_amount ?? 'N/A'}` : 'N/A' }, // Handle null
        { name: 'Last Invoice Date', value: formatDate(invoices[0]?.duedate) },
        { name: 'Last Invoice Amount', value: invoices[0] ? `$${invoices[0].total_amount ?? 'N/A'}` : 'N/A' }, // Handle null
        { name: 'Next Payment Due', value: formatDate(invoices.at(-1)?.duedate) },
      ],
    },
  ];

  return (
    <Collapse
      defaultOpen={true}
      className={cn('mx-0 py-5 md:py-7 lg:mx-8', className)}
      header={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex w-full cursor-pointer items-center justify-between text-left font-lexend text-xl font-semibold text-gray-700"
        >
          Customer Information
          <PiCaretDownBold
            className={cn(
              'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
              open && '-rotate-0 rtl:rotate-0'
            )}
          />
        </button>
      )}
    >
      {customerInformation.map((item, index) => (
        <div
          className={cn(
            'my-10 flex gap-4',
            index === customerInformation.length - 1 && 'mb-3'
          )}
          key={`customer-block-${index}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-lighter">
            {item.icon}
          </span>

          <div className="flex flex-col gap-y-3">
            <Title as="h3" className="text-base font-semibold">
              {item.title}
            </Title>
            {item.data.map((info, idx) => (
              <div
                className="flex flex-col sm:flex-row sm:items-center"
                key={`info-${idx}`}
              >
                <Title
                  as="h4"
                  className="text-sm font-normal capitalize text-gray-700 sm:min-w-[244px] md:min-w-[424px]"
                >
                  {info.name}:
                </Title>
                <Text className="gap-3 text-sm text-gray-500">{info.value}</Text>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Collapse>
  );
}
