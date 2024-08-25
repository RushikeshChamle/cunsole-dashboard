'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/axiosInstance'; // Import your custom Axios instance
import { Table, Badge } from 'rizzui';

interface Payment {
  invoice: number;
  amount: string;
  method: string;
  reference: string;
  account: number;
  user: number;
}

export default function Transactions({ customerId }: { customerId: string }) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPayments() {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`invoices/get_customer_payments/${customerId}/`);
        setPayments(response.data);
      } catch (err) {
        setError('Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice ID</Table.Head>
            <Table.Head>Amount</Table.Head>
            <Table.Head>Payment Method</Table.Head>
            <Table.Head>Reference</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {payments.map((payment, index) => (
            <Table.Row key={index}>
              <Table.Cell>{payment.invoice}</Table.Cell>
              <Table.Cell>${payment.amount}</Table.Cell>
              <Table.Cell>{payment.method}</Table.Cell>
              <Table.Cell>{payment.reference}</Table.Cell>
              <Table.Cell>
                <Badge>Completed</Badge> {/* Assuming all payments are completed */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
