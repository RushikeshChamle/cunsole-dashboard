'use client';

import { Drawer, Text, Input, Textarea, Badge, Table, Button, Loader, Checkbox } from 'rizzui';
import axiosInstance from '@/axiosInstance';
import Link from 'next/link';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { useEffect, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns'; // Import the format function




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

interface DrawerState {
  isOpen: boolean;
  triggerDetails: EmailTrigger | null;
  isEditable: boolean;
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
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [drawerState, setDrawerState] = useState<DrawerState>({
    isOpen: false,
    triggerDetails: null,
    isEditable: false,
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/customers/get_email_triggers/');
        setEmailTriggers(response.data.email_triggers);
      } catch (error: any) {
        if (error.response && error.response.data) {
          setError(error.response.data.error || 'Failed to fetch email triggers');
        } else {
          setError(error.message || 'An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const fetchEmailTriggerById = async (triggerId: string) => {
    try {
      const response = await axiosInstance.get(`/customers/email_trigger/${triggerId}`);
      setDrawerState({
        isOpen: true,
        triggerDetails: response.data,
        isEditable: false,
      });
    } catch (error) {
      console.error('Failed to fetch email trigger:', error);
    }
  };

  const handleEditToggle = () => {
    setDrawerState((prevState) => ({
      ...prevState,
      isEditable: !prevState.isEditable,
    }));
  };



  const handleSaveChanges = async () => {
    if (!drawerState.triggerDetails) return;

    const { id, name, email_subject, email_body, days_offset, isactive } = drawerState.triggerDetails;

    try {
      // Send a PUT request to the update API endpoint
      const response = await axiosInstance.put(`/customers/update_email_trigger/${id}/`, {
        name,
        email_subject,
        email_body,
        days_offset,
        isactive,
        // Add any other fields that need to be updated
      });

      // Optionally, you can update the emailTriggers state if needed
      setEmailTriggers((prevTriggers) => {
        return prevTriggers.map((trigger) =>
          trigger.id === id ? { ...trigger, ...response.data } : trigger
        );
      });

      // Close the drawer and reset the editable state
      setDrawerState({
        isOpen: false,
        triggerDetails: null,
        isEditable: false,
      });
    } catch (error) {
      console.error('Failed to save changes:', error);
      // You can set an error state here to display an error message if needed
    }
  };


  const handleDeactivateTrigger = async () => {
    if (!drawerState.triggerDetails) return;

    const { id } = drawerState.triggerDetails;

    try {
      await axiosInstance.put(`/customers/update_email_trigger/${id}/`, {
        ...drawerState.triggerDetails,
        isactive: false, // Set isactive to false
      });

      // Update the local state to reflect the change
      setEmailTriggers((prevTriggers) =>
        prevTriggers.map((trigger) =>
          trigger.id === id
            ? { ...trigger, isactive: false }
            : trigger
        )
      );

      // Optionally close the drawer or show a success message
      setDrawerState({
        ...drawerState,
        triggerDetails: {
          ...drawerState.triggerDetails,
          isactive: false, // Update triggerDetails in state
        },


      });
    } catch (error) {
      console.error('Failed to deactivate trigger:', error);
    }
  };



  const filteredTriggers = emailTriggers.filter((trigger) =>
    trigger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getConditionTypeLabel(trigger.condition_type).toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div style={{ position: 'relative', width: '17rem' }}>
        <Input
          className="mb-2"
          prefix={<MagnifyingGlassIcon className="w-4" />}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


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
                    onClick={handleDeactivateTrigger}

                  // disabled={!drawerState.isEditable || !drawerState.triggerDetails?.isactive}
                  >
                    Deactivate Trigger
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setDrawerState({
                        isOpen: false,
                        triggerDetails: null,
                        isEditable: false, // Include the isEditable property
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
          {error ? (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center text-red-500">
                {error}
              </Table.Cell>
            </Table.Row>
          ) : filteredTriggers.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center">
                No email triggers found.
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredTriggers.map((trigger) => (
              <Table.Row key={trigger.id} className="cursor-pointer">
                <Table.Cell>{trigger.name}</Table.Cell>
                <Table.Cell>
                  {getConditionTypeLabel(trigger.condition_type)}
                </Table.Cell>
                <Table.Cell>{trigger.days_offset}</Table.Cell>
                <Table.Cell>
                  {/* {new Date(trigger.created_at).toLocaleString()} */}
                  {format(new Date(trigger.created_at), 'd MMM, yyyy')}

                </Table.Cell>
                <Table.Cell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchEmailTriggerById(trigger.id)}
                  >
                    Details
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </>
  );
}