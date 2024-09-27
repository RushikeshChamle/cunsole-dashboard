'use client';

const pageHeader = {
  title: 'Email Triggers List',
  breadcrumb: [
    {
      href: routes.actions.home,
      name: 'Home',
    },
    {
      href: routes.actions.home,
      name: 'Email Triggers',
    },
    {
      name: 'List',
    },
  ],
};



import { Drawer, Text, Input, Textarea } from 'rizzui';
import axiosInstance from '@/axiosInstance'; // Adjust your import for axiosInstance
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';
import { useEffect, useState } from 'react';
import { Badge, Table } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import Footer from '@/app/multi-step/footer';

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
 
  const [drawerState, setDrawerState] = useState({
    isOpen: false,
    triggerDetails: null as EmailTrigger | null, // Store trigger details here
  });


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          '/customers/get_email_triggers/'
        );
        setEmailTriggers(response.data.email_triggers); // Adjust to match your response
      } catch (error) {
        setError('Failed to fetch email triggers');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  
  const fetchEmailTriggerById = async (triggerId: string) => {
    try {
      const response = await axiosInstance.get(
        `/customers/email_trigger/${triggerId}`
      );
      setDrawerState({
        isOpen: true, // Set isOpen to true to open the drawer
        triggerDetails: response.data, // Store the fetched details
        isEditable: false, // Open in view-only mode initially
      });
    } catch (error) {
      console.error('Failed to fetch email trigger:', error);
    }
  };

  // Toggle edit mode for the drawer
  const handleEditToggle = () => {
    setDrawerState((prevState) => ({
      ...prevState,
      isEditable: !prevState.isEditable,
    }));
  };

  // Save the edited details (stubbed function for now)
  const handleSaveChanges = async () => {
    // Implement save logic for updating the email trigger
    console.log('Saving changes...');
    // Close the edit mode after saving
    setDrawerState((prevState) => ({
      ...prevState,
      isEditable: false,
    }));
  };

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

      <Drawer
        isOpen={drawerState.isOpen} // Ensure state is controlling drawer
        size="lg"
        onClose={() =>
          setDrawerState((prevState) => ({ ...prevState, isOpen: false }))
        } // Close drawer handler
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-2">
            <h3 className="mb-4 text-xl font-semibold">
              Email Trigger Details
            </h3>

            {drawerState.triggerDetails && (
              <div className="space-y-4">
                {/* Input fields for viewing/editing details */}
                <Input
                  label="Name"
                  value={drawerState.triggerDetails.name}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setDrawerState((prevState) => ({
                      ...prevState,
                      triggerDetails: {
                        ...prevState.triggerDetails!,
                        name: e.target.value,
                      },
                    }))
                  }
                />
                <Input
                  label="Condition Type"
                  value={getConditionTypeLabel(
                    drawerState.triggerDetails.condition_type
                  )}
                  disabled
                />
                <Textarea
                  label="Email Subject"
                  value={drawerState.triggerDetails.email_subject}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setDrawerState((prevState) => ({
                      ...prevState,
                      triggerDetails: {
                        ...prevState.triggerDetails!,
                        email_subject: e.target.value,
                      },
                    }))
                  }
                />
                <Textarea
                  label="Email Body"
                  value={drawerState.triggerDetails.email_body}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setDrawerState((prevState) => ({
                      ...prevState,
                      triggerDetails: {
                        ...prevState.triggerDetails!,
                        email_body: e.target.value,
                      },
                    }))
                  }
                />
                <Input
                  label="Days Offset"
                  value={drawerState.triggerDetails.days_offset.toString()}
                  disabled={!drawerState.isEditable}
                  onChange={(e) =>
                    setDrawerState((prevState) => ({
                      ...prevState,
                      triggerDetails: {
                        ...prevState.triggerDetails!,
                        days_offset: parseInt(e.target.value, 10),
                      },
                    }))
                  }
                />
              </div>
            )}
          </div>

          {/* Footer with Action buttons */}
          <div
            className="mt-2 px-5"
            style={{
              position: 'relative',
              // top: "-6px",
              top: 'calc(-14px + 2vh);' /* Adjusts the top position dynamically based on viewport height */,
            }}
          >
            {' '}
            {/* Optional: Adjust margin-top if needed */}
            <div className="flex justify-end space-x-1">
              {drawerState.isEditable ? (
                <>
                  <Button onClick={handleEditToggle} variant="outline">
                    Cancel
                  </Button>
                  <div className="w-2" />{' '}
                  {/* Gap between Cancel and Save buttons */}
                  <Button onClick={handleSaveChanges}>Save</Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setDrawerState({
                        isOpen: false,
                        triggerDetails: null as EmailTrigger | null, // Store trigger details here
                      })
                    }
                  >
                    Close
                  </Button>
                  <div className="w-2" />{' '}
                  {/* Gap between Close and Edit buttons */}
                  <Button onClick={handleEditToggle}>Edit</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Drawer>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Condition Type</Table.Head>
            <Table.Head>Days Offset</Table.Head>
            <Table.Head>Created At</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {emailTriggers.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center">
                No email triggers found.
              </Table.Cell>
            </Table.Row>
          ) : (
            emailTriggers.map((trigger) => (
              <Table.Row key={trigger.id} className="cursor-pointer">
                <Table.Cell>{trigger.name}</Table.Cell>
                <Table.Cell>
                  {getConditionTypeLabel(trigger.condition_type)}
                </Table.Cell>
                <Table.Cell>{trigger.days_offset}</Table.Cell>
                <Table.Cell>
                  {new Date(trigger.created_at).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {/* <Link href={`/actions/${trigger.id}`}> */}
                  {/* <Button variant="outline" size="sm">Details</Button> */}
                  {/* <Button
          variant="outline"
          onClick={() =>
            setDrawerState((prevState) => ({
              ...prevState,
              isOpen: true,
              size: "lg",
            }))
          }
        >
          lg
        </Button> */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchEmailTriggerById(trigger.id)} // Open drawer with details
                  >
                    Details
                  </Button>

                  {/* </Link> */}
                </Table.Cell>
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
