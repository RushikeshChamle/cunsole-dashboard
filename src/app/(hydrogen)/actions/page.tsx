"use client";

const pageHeader = {
  title: 'Email Triggers List',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Email Triggers',
    },
    {
      name: 'List',
    },
  ],
};

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';
import { useEffect, useState } from 'react';
import { Badge, Table } from "rizzui";
import { PiPlusBold } from 'react-icons/pi';

// Define TypeScript types for the API response
interface EmailTrigger {
  id: string;
  condition_type_display: string;
  name: string;
  condition_type: number;
  email_subject: string;
  email_body: string;
  days_offset: number;
  created_at: string;
  updated_at: string;
  isactive: boolean;
  user: number;
  account: number;
}

function getConditionTypeLabel(type: number): string {
  switch (type) {
    case 0:
      return 'Before Due Date';
    case 1:
      return 'On Due Date';
    case 2:
      return 'After Due Date';
    default:
      return 'Unknown';
  }
}



export default function EmailTriggersListPage() {
  const [emailTriggers, setEmailTriggers] = useState<EmailTrigger[]>([]);
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

        const response = await fetch('http://localhost:9000/customers/get_email_triggers/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }

        const data: EmailTrigger[] = await response.json();
        setEmailTriggers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={emailTriggers}
            fileName="email_trigger_data"
            header="ID,Condition Type,Name,Email Subject,Email Body,Days Offset,Created At,Updated At,Is Active,User,Account"
          />
          <Link href={routes.actions.create} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Trigger
            </Button>
          </Link>
        </div>
      </PageHeader>

      <Table>
        <Table.Header>
          <Table.Row>
            {/* <Table.Head>ID</Table.Head> */}
            <Table.Head>Name</Table.Head>
            <Table.Head>Condition Type</Table.Head>
            <Table.Head>Email Subject</Table.Head>
            <Table.Head>Email Body</Table.Head>
            <Table.Head>Days Offset</Table.Head>
            <Table.Head>Created At</Table.Head>
            {/* <Table.Head>Updated At</Table.Head> */}
            <Table.Head>Is Active</Table.Head>
            <Table.Head>User</Table.Head>
            {/* <Table.Head>Account</Table.Head> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {emailTriggers.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={11} className="text-center">
                No email triggers found.
              </Table.Cell>
            </Table.Row>
          ) : (
            emailTriggers.map((trigger) => (
              <Table.Row key={trigger.id}
                style={{
                  cursor: "pointer"
                }}>
                {/* <Table.Cell>{trigger.id}</Table.Cell> */}
                {/* <Table.Cell>{trigger.condition_type}</Table.Cell> */}
                <Table.Cell>{trigger.name}</Table.Cell>
                <Table.Cell>{getConditionTypeLabel(trigger.condition_type)}</Table.Cell>
                <Table.Cell>{trigger.email_subject}</Table.Cell>
                <Table.Cell>{trigger.email_body}</Table.Cell>
                <Table.Cell>{trigger.days_offset}</Table.Cell>
                <Table.Cell>{new Date(trigger.created_at).toLocaleString()}</Table.Cell>
                {/* <Table.Cell>{new Date(trigger.updated_at).toLocaleString()}</Table.Cell> */}
                <Table.Cell>{trigger.isactive ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell>{trigger.user}</Table.Cell>
                {/* <Table.Cell>{trigger.account}</Table.Cell> */}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </>
  );
}

// Function to get cookie value by name
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
