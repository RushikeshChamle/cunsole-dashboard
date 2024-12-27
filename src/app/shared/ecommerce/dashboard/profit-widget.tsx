

'use client';

import { useEffect, useState } from 'react';
import { Button, Table } from 'rizzui';
import cn from '@utils/class-names';
import WidgetCard from '@components/cards/widget-card';
import axiosInstance from '@/axiosInstance'; // Custom Axios instance import

interface Customer {
  name: string;
  due: string;
  dueIn: string;
}

const filterOptions = ['5 D', '2 W', '1 M', '6 M', '1 Y'];

export default function ProfitWidget({ className }: { className?: string }) {
  const [topDueCustomers, setTopDueCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch top due customers from the API
  useEffect(() => {
    const fetchTopDueCustomers = async () => {
      try {
        const response = await axiosInstance.get('/invoices/get_top_due_customers/');
        setTopDueCustomers(response.data);
      } catch (error) {
        console.error('Error fetching top due customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDueCustomers();
  }, []);

  function handleFilterBy(data: string) {
    console.log('Profit Filter:', data);
  }

  return (
    <WidgetCard
      title={'Top 10 Due Customers'}
      descriptionClassName="text-lg font-semibold sm:text-xl text-gray-900 font-lexend mt-1"
      action={
        <Button
          variant="outline"
          size="sm"
          className="text-sm hover:bg-gray-200 transition-colors duration-200"
        >
          Details
        </Button>
      }
      headerClassName="mb-6"
      className={cn('flex flex-col', className)}
    >
      <div className="grid flex-grow grid-cols-1 gap-3">
        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Customer</Table.Head>
                  <Table.Head>Due Amount</Table.Head>
                  <Table.Head>Overdue</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {topDueCustomers.map((customer, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{customer.name}</Table.Cell>
                    <Table.Cell>${customer.due}</Table.Cell>
                    <Table.Cell>{customer.dueIn}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    </WidgetCard>
  );
}
