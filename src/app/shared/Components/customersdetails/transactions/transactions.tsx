'use client'
import React from 'react';
import { Badge, Table } from "rizzui";

export default function Transactions() {
    // Sample data - replace with actual data as needed
    const transactions = [
        {
            id: '#INV12345',
            customer: 'Acme Corp',
            amount: '$1,200.00',
            paymentDate: '2024-08-01',
            paymentMethod: 'Credit Card',
            transactionStatus: 'Completed'
        },
        {
            id: '#INV12346',
            customer: 'Acme Corp',
            amount: '$800.00',
            paymentDate: '2024-08-05',
            paymentMethod: 'Bank Transfer',
            transactionStatus: 'Pending'
        },
        {
            id: '#INV12347',
            customer: 'Acme Corp',
            amount: '$500.00',
            paymentDate: '2024-08-10',
            paymentMethod: 'PayPal',
            transactionStatus: 'Failed'
        }
    ];

    return (
        <div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Invoice ID</Table.Head>
                        <Table.Head>Customer</Table.Head>
                        <Table.Head>Amount</Table.Head>
                        <Table.Head>Payment Date</Table.Head>
                        <Table.Head>Payment Method</Table.Head>
                        <Table.Head>Status</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {transactions.map((transaction, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{transaction.id}</Table.Cell>
                            <Table.Cell>{transaction.customer}</Table.Cell>
                            <Table.Cell>{transaction.amount}</Table.Cell>
                            <Table.Cell>{transaction.paymentDate}</Table.Cell>
                            <Table.Cell>{transaction.paymentMethod}</Table.Cell>
                            <Table.Cell>
                                <Badge>{transaction.transactionStatus}</Badge>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
