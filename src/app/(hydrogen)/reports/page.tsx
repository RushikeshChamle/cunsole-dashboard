'use client';

import React from 'react';
import { Table, Badge, Button } from 'rizzui';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'Reports Center',
  breadcrumb: [
    {
      href: routes.reports.reports,
      name: 'Home',
    },
    {
      name: 'Reports',
    },
  ],
};

// Mock data generators (you'll replace these with actual data fetching)
const generateARReports = () => [
  {
    name: 'Customer Balances',
    type: 'Customer Balances',
    createdBy: 'System Generated',
  },
  {
    name: 'AR Aging Summary',
    type: 'AR Aging Summary',
    createdBy: 'System Generated',
  },
  {
    name: 'AR Aging Details',
    type: 'AR Aging Details',
    createdBy: 'System Generated',
  },
  {
    name: 'Invoice Details',
    type: 'Invoice Details',
    createdBy: 'System Generated',
  },

  {
    name: 'Payments Received',
    type: 'Payments Received',
    createdBy: 'System Generated',
  },


];

export default function ReportsCenter() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      
      <div className="w-full ">
        <Table variant = "minimal">
          <Table.Header>
            <Table.Row>
              <Table.Head>Report Name</Table.Head>
              <Table.Head>Type</Table.Head>

              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {generateARReports().map((report, index) => (
              <Table.Row key={index}>
                <Table.Cell>{report.name}</Table.Cell>
                <Table.Cell>{report.type}</Table.Cell>
                <Table.Cell>
                  <Button size="sm">View</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}


