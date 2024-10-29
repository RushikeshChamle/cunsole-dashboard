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
import { Sparkles, Loader2 } from 'lucide-react';
import {  ActionIcon, Select } from 'rizzui';
import { XMarkIcon } from '@heroicons/react/24/outline';



import { Modal } from "rizzui";


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


const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
];

const styleOptions = [
  { value: 'direct', label: 'Direct' },
  { value: 'descriptive', label: 'Descriptive' },
  { value: 'persuasive', label: 'Persuasive' },
];

const lengthOptions = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
];


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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generationStep, setGenerationStep] = useState('options');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOptions, setAiOptions] = useState({
    tone: 'professional',
    style: 'direct',
    length: 'medium',
    includeGreeting: true,
    includeSalutation: true,
  });
  const [generatedContent, setGeneratedContent] = useState({
    subject: '',
    body: '',
  });

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
        <Loader variant="threeDot" />
      </div>
    );
  }




  const handleAIGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post('/users/generate_triggr_by_ai/', {
        tone: aiOptions.tone,
        style: aiOptions.style,
        length: aiOptions.length,
        include_greeting: aiOptions.includeGreeting,
        include_salutation: aiOptions.includeSalutation,
        placeholders: [
          "{Invoice.Name}",
          "{Customer.name}",
          "{Invoice.Amount}",
          "{Invoice.date}"
        ]
      });

      if (response.data.status === 'success') {
        setGeneratedContent({
          subject: response.data.subject,
          body: response.data.body
        });
        setGenerationStep('preview');
      } else {
        throw new Error(response.data.message || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
      // Ensure drawer stays open after generation completes
      setDrawerState(prevState => ({
        ...prevState,
        isOpen: true
      }));
    }
  };





  // const handleAIGenerate = async () => {
  //   setIsGenerating(true);
  //   try {
  //     const response = await axiosInstance.post('/users/generate_triggr_by_ai/', {
  //       tone: aiOptions.tone,
  //       style: aiOptions.style,
  //       length: aiOptions.length,
  //       include_greeting: aiOptions.includeGreeting,
  //       include_salutation: aiOptions.includeSalutation,
  //       placeholders: [
  //         "{Invoice.Name}",
  //         "{Customer.name}",
  //         "{Invoice.Amount}",
  //         "{Invoice.date}"
  //       ]
  //     });

  //     if (response.data.status === 'success') {
  //       setGeneratedContent({
  //         subject: response.data.subject,
  //         body: response.data.body
  //       });
  //       setGenerationStep('preview');
  //     } else {
  //       throw new Error(response.data.message || 'Failed to generate content');
  //     }
  //   } catch (error) {
  //     console.error('Error generating content:', error);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  // const handleApplyContent = () => {
  //   if (drawerState.triggerDetails && drawerState.isEditable) {
  //     setDrawerState(prevState => ({
  //       ...prevState,
  //       isOpen: true, // Ensure drawer stays open
  //       triggerDetails: {
  //         ...prevState.triggerDetails!,
  //         email_subject: generatedContent.subject,
  //         email_body: generatedContent.body,
  //       }
  //     }));
  //   }
  //   setIsModalOpen(false);
  //   setGenerationStep('options');
  // };



  const handleApplyContent = () => {
    if (drawerState.triggerDetails && drawerState.isEditable) {
      setDrawerState(prevState => ({
        ...prevState,
        isOpen: true, // Ensure drawer stays open
        triggerDetails: {
          ...prevState.triggerDetails!,
          email_subject: generatedContent.subject,
          email_body: generatedContent.body,
        }
      }));
    }
    setIsModalOpen(false);
    setGenerationStep('options');
  };




  const handleCloseModal = () => {
    setIsModalOpen(false);
    setGenerationStep('options');
    // Ensure drawer stays open when closing modal
    setDrawerState(prevState => ({
      ...prevState,
      isOpen: true
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Ensure drawer stays open
    setDrawerState(prevState => ({
      ...prevState,
      isOpen: true
    }));
  };

 




  // Define a type for the Select option
  interface SelectOption {
    value: string;
    label: string;
  }

  const AIOptionsForm = () => (
    <div className="space-y-6">
      <div>
        <Text className="text-sm font-medium mb-2">Tone</Text>
        <Select
          options={toneOptions}
          value={aiOptions.tone}
          onChange={(option: SelectOption | null) => setAiOptions(prev => ({ ...prev, tone: option?.value || prev.tone }))}
          className="w-full"
        />
      </div>

      <div>
        <Text className="text-sm font-medium mb-2">Style</Text>
        <Select
          options={styleOptions}
          value={aiOptions.style}
          onChange={(option: SelectOption | null) => setAiOptions(prev => ({ ...prev, style: option?.value || prev.style }))}
          className="w-full"
        />
      </div>

      <div>
        <Text className="text-sm font-medium mb-2">Length</Text>
        <Select
          options={lengthOptions}
          value={aiOptions.length}
          onChange={(option: SelectOption | null) => setAiOptions(prev => ({ ...prev, length: option?.value || prev.length }))}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <Checkbox 
          label="Include Greeting"
          checked={aiOptions.includeGreeting}
          onChange={e => setAiOptions(prev => ({ 
            ...prev, 
            includeGreeting: e.target.checked 
          }))}
        />
        
        <Checkbox 
          label="Include Salutation"
          checked={aiOptions.includeSalutation}
          onChange={e => setAiOptions(prev => ({ 
            ...prev, 
            includeSalutation: e.target.checked 
          }))}
        />
      </div>

      <Button
        onClick={() => {
          handleAIGenerate();
          setIsModalOpen(true);
          // Ensure drawer stays open when generating
          setDrawerState(prevState => ({
            ...prevState,
            isOpen: true
          }));
        }}
        disabled={isGenerating}
        className="w-full relative z-[10001]"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Content
          </>
        )}
      </Button>
    </div>
  );

  const ContentPreviewForm = () => (
    <div className="space-y-6">
      <div>
        <Text className="text-sm font-medium mb-2">Preview & Edit Subject</Text>
        <Textarea
          value={generatedContent.subject}
          onChange={(e) => setGeneratedContent(prev => ({
            ...prev,
            subject: e.target.value
          }))}
          className="w-full"
          rows={2}
        />
      </div>

      <div>
        <Text className="text-sm font-medium mb-2">Preview & Edit Body</Text>
        <Textarea
          value={generatedContent.body}
          onChange={(e) => setGeneratedContent(prev => ({
            ...prev,
            body: e.target.value
          }))}
          className="w-full"
          rows={8}
        />
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={() => {
            setGenerationStep('options');
            // Ensure drawer stays open when going back to options
            setDrawerState(prevState => ({
              ...prevState,
              isOpen: true
            }));
          }}
          className="flex-1"
        >
          Back to Options
        </Button>
        <Button
          onClick={() => {
            handleApplyContent();
            // Ensure drawer stays open when applying content
            setDrawerState(prevState => ({
              ...prevState,
              isOpen: true
            }));
          }}
          className="flex-1"
        >
          Use This Content
        </Button>
      </div>
    </div>
  );



  const DrawerContent = () => (
    <div className="flex h-full flex-col">
    <div className="flex-1  px-5 py-2">
      <h3 className="mb-4 text-xl font-semibold">
        Email Trigger Details
      </h3>

      {drawerState.triggerDetails && (
        <div className="space-y-4">
          {/* Input fields for viewing/editing details */}

          {/* <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="w-full"
            > */}

<Button
              variant="outline"
              onClick={handleOpenModal} // Use the new handler
              className="w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate with AI
            </Button>
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
  )






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
        isOpen={drawerState.isOpen}
        size="lg"
        onClose={() => setDrawerState(prev => ({ ...prev, isOpen: false }))}

        className="z-[1000]"
      >


         
<Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        customSize="600px"
        className="z-[1100]"

    


      >
        <div className="m-auto px-7 pt-6 pb-8" style={{zIndex: 100}}>
          <div className="mb-7 flex items-center justify-between">
            <Text as="span" className="flex items-center text-lg font-semibold">
              <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
              {generationStep === 'options' ? 'AI Content Generator' : 'Preview & Edit Content'}
            </Text>
            <ActionIcon
              size="sm"
              variant="text"
              onClick={handleCloseModal}
            >
              <XMarkIcon className="h-6 w-6" strokeWidth={1.8} />
            </ActionIcon>
          </div>

          {generationStep === 'options' ? <AIOptionsForm /> : <ContentPreviewForm />}
        </div>
      </Modal>
        <DrawerContent />
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