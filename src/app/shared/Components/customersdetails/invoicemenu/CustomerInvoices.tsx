
'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/axiosInstance'; // Import your custom Axios instance
import { Table, Badge } from 'rizzui';
import { format } from 'date-fns'; // Import format function

interface Invoice {
  id: number;
  issuedate: string | null;
  duedate: string | null;
  name: string | null;
  currency: string | null;
  total_amount: string;
  paid_amount: string;
}

export default function CustomerInvoices({ customerId }: { customerId: string }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvoices() {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`invoices/get_customer_summary/${customerId}/`);
        setInvoices(response.data.invoices);
      } catch (err) {
        setError('Failed to fetch invoices');
      } finally {
        setLoading(false);
      }
    }

    fetchInvoices();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Issued Date</Table.Head>
            <Table.Head>Due Date</Table.Head>
            <Table.Head>Total Amount</Table.Head>
            <Table.Head>Paid Amount</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map((invoice) => (
            <Table.Row key={invoice.id}>
              <Table.Cell>{invoice.id}</Table.Cell>
              <Table.Cell>
                
                {/* {invoice.name} */}
                {invoice.name || "-"}
                
                </Table.Cell>
              <Table.Cell>
                {/* {invoice.issuedat ? new Date(invoice.issuedat).toLocaleDateString() : 'N/A'} */}
                {invoice.issuedate ? format(new Date(invoice.issuedate), ' d MMM, yyyy') : 'N/A'}

                
              </Table.Cell>
              <Table.Cell>
                {/* {invoice.duedate ? new Date(invoice.duedate).toLocaleDateString() : 'N/A'} */}
                {invoice.duedate ? format(new Date(invoice.duedate), 'd MMM, yyyy') : 'N/A'}

              </Table.Cell>
              <Table.Cell>${invoice.total_amount}</Table.Cell>
              <Table.Cell>${invoice.paid_amount}</Table.Cell>
              <Table.Cell>
                {parseFloat(invoice.paid_amount) >= parseFloat(invoice.total_amount) ? (
                  <Badge>Paid</Badge>
                ) : (
                  <Badge>Unpaid</Badge>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}


