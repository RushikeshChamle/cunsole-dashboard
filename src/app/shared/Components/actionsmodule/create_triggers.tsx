'use client';

import React, { useState , useCallback} from 'react';
import { 
  Modal,
  ActionIcon,
  Button,
  Select,
  Text,
  Textarea,
  Input,
  Checkbox
} from 'rizzui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Sparkles, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/axiosInstance';




// Form validation schema
const emailTriggerFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  condition_type: z.number().int(),
  email_subject: z.string().nonempty('Subject is required'),
  email_body: z.string().nonempty('Email body is required'),
  days_offset: z.number().int(),
  isactive: z.boolean(),
});

// AI generation options
const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'casual', label: 'Casual' }
];

const styleOptions = [
  { value: 'formal', label: 'Formal' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'direct', label: 'Direct' }
];

const lengthOptions = [
  { value: 'concise', label: 'Concise (50-100 words)' },
  { value: 'standard', label: 'Standard (100-150 words)' },
  { value: 'detailed', label: 'Detailed (150-200 words)' }
];

const conditionTypeOptions = [
  { value: '0', label: 'Before Due Date' },
  { value: '1', label: 'On Due Date' },
  { value: '2', label: 'After Due Date' },
];

const CreateEmailTrigger = ({ id, record }: { id: string; record: any }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generationStep, setGenerationStep] = useState('options');
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize form with default values
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   setValue,
  //   formState: { errors }
  // } = useForm({
  //   resolver: zodResolver(emailTriggerFormSchema),
  //   defaultValues: {
  //     ...record,
  //     condition_type: record?.condition_type || 0,
  //     days_offset: record?.days_offset || 1,
  //     isactive: record?.isactive ?? true,
  //   },
  // });


  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(emailTriggerFormSchema),
    defaultValues: {
      ...record,
      condition_type: record?.condition_type || 0,
      days_offset: record?.days_offset || 1,
      isactive: record?.isactive ?? true,
    },
  });



  // AI generation state
  const [generatedContent, setGeneratedContent] = useState({
    subject: '',
    body: ''
  });

  const [aiOptions, setAiOptions] = useState({
    tone: 'professional',
    style: 'formal',
    length: 'detailed',
    includeGreeting: true,
    includeSalutation: true
  });

  // Form submission handler
  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const formattedData = {
  //       ...data,
  //       condition_type: String(data.condition_type),
  //       days_offset: Number(data.days_offset),
  //     };

   


  //     const response = await fetch('/api/your-endpoint', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formattedData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create email trigger');
  //     }

  //     toast.success(
  //       <strong>
  //         Email trigger successfully {id ? 'updated' : 'created'}
  //       </strong>
  //     );
  //     router.push('/actions');
      
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setError(error.message || 'An error occurred');
  //     toast.error(error.message || 'An error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const formattedData = {
        ...data,
        condition_type: String(data.condition_type),
        days_offset: Number(data.days_offset),
      };

      const response = await axiosInstance.post(
        '/customers/create_email_trigger/',
        formattedData
      );

      if (response.data) {
        toast.success(
          <strong>
            Email trigger successfully {id ? 'updated' : 'created'}
          </strong>
        );

        // Reset form
        reset({
          name: '',
          condition_type: 0,
          email_subject: '',
          email_body: '',
          days_offset: 1,
          isactive: true,
        });

        router.push('/actions');
      } else {
        setError('Failed to create email trigger');
        toast.error('Failed to create email trigger');
      }
    } catch (error: any) {
      console.error('Error creating email trigger:', error);
      const errorMessage = error.response?.data?.error || 'An error occurred while creating the email trigger';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id, reset, router]);

  // AI content generation handler
  // const handleAIGenerate = async () => {
  //   setIsGenerating(true);
  //   try {
  //     // Simulate API call - replace with your actual AI generation endpoint
  //     await new Promise(resolve => setTimeout(resolve, 1500));
      
  //     // Mock generated content - replace with actual AI response
  //     const mockContent = {
  //       subject: `${aiOptions.tone} reminder about your upcoming payment`,
  //       body: `Dear valued customer,\n\nThis is a ${aiOptions.tone} reminder about your upcoming payment. We wanted to ensure you're aware of the deadline.\n\nBest regards,\nYour Company`
  //     };
      
  //     setGeneratedContent(mockContent);
  //     setGenerationStep('preview');
  //   } catch (error) {
  //     console.error('Error generating content:', error);
  //     toast.error('Failed to generate content');
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const handleCancelButtonClick = useCallback(() => {
    router.push('/actions');
  }, [router]);

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
    } catch (error: any) {
      console.error('Error generating content:', error);
      toast.error(error.message || 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  // Apply generated content to form
  const handleApplyContent = () => {
    setValue('email_subject', generatedContent.subject);
    setValue('email_body', generatedContent.body);
    setIsModalOpen(false);
    setGenerationStep('options');
  };

  // Reset modal state
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setGenerationStep('options');
  };

  // AI Options Form
  const AIOptionsForm = () => (
    <div className="space-y-6">
      {/* Tone Selection */}
      <div>
        <Text className="text-sm font-medium mb-2">Tone</Text>
        <Select
          options={toneOptions}
          value={aiOptions.tone}
          onChange={(option: { value: string } | null) => setAiOptions(prev => ({ 
            ...prev, 
            tone: option?.value || prev.tone
          }))}
          className="w-full"
        />
      </div>

      {/* Style Selection */}
      <div>
        <Text className="text-sm font-medium mb-2">Style</Text>
        <Select
          options={styleOptions}
          value={aiOptions.style}
          onChange={(option: { value: string } | null) => setAiOptions(prev => ({ 
            ...prev, 
            style: option?.value || prev.style
          }))}
          className="w-full"
        />
      </div>

      {/* Length Selection */}
      <div>
        <Text className="text-sm font-medium mb-2">Length</Text>
        <Select
          options={lengthOptions}
          value={aiOptions.length}
          onChange={(option: { value: string } | null) => setAiOptions(prev => ({ 
            ...prev, 
            length: option?.value || prev.length
          }))}
          className="w-full"
        />
      </div>

      {/* Checkboxes */}
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

      {/* Generate Button */}
      <Button
        onClick={handleAIGenerate}
        disabled={isGenerating}
        className="w-full"
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

  // Content Preview Form
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
          onClick={() => setGenerationStep('options')}
          className="flex-1"
        >
          Back to Options
        </Button>
        <Button
          onClick={handleApplyContent}
          className="flex-1"
        >
          Use This Content
        </Button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Trigger Configuration */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <Text className="font-medium mb-4">Trigger Configuration</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Trigger Name"
            placeholder="Enter a descriptive name"
            {...register('name')}
            error={errors.name?.message?.toString()}
            className="w-full"
          />
          <div className="flex gap-4">

            <div className="flex-grow">
              <Controller
                name="condition_type"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    label="Condition Type"
                    options={conditionTypeOptions}
                    value={value}
                    onChange={(selectedOption: { value: string } | null) =>
                      onChange(selectedOption ? Number(selectedOption.value) : 0)
                    }
                    error={errors.condition_type?.message as string}
                  />
                )}
              />
            </div>

            
            <div className="w-1/3">
              <Input
                type="number"
                label="Days"
                placeholder="Days"
                {...register('days_offset', { valueAsNumber: true })}
                error={errors.days_offset?.message?.toString()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email Content Section */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <Text className="font-medium">Email Content</Text>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
        </div>

        {/* AI Generation Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          customSize="600px"
        >
          <div className="m-auto px-7 pt-6 pb-8">
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

        {/* Email Form Fields */}
        <div className="space-y-6">
          <Input
            label="Subject Line"
            placeholder="Enter email subject"
            {...register('email_subject')}
            error={errors.email_subject?.message?.toString() || undefined}
            className="w-full"
          />
          
          <div>
            <Text className="text-sm mb-2">Email Body</Text>
            <Textarea
              placeholder="Compose your email message here..."
              {...register('email_body')}
              error={errors.email_body?.message?.toString()}
              textareaClassName="min-h-[300px] p-4"
            />
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <Text className="text-red-600">{error}</Text>
        </div>
      )}

      {/* Action Buttons */}
      {/* <div className="flex justify-end gap-4 pt-4">
        <Link href="/actions">
          <Button
            variant="outline"
            className="w-full @sm:w-auto"
          >
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full @sm:w-auto"
        >
          {isLoading ? 'Saving...' : id ? 'Update Trigger' : 'Create Trigger'}
        </Button>
      </div> */}

<div className="flex justify-end gap-4 pt-4">
        <Button
          variant="outline"
          className="w-full @sm:w-auto"
          onClick={handleCancelButtonClick}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full @sm:w-auto"
        >
          {isLoading ? 'Saving...' : id ? 'Update Trigger' : 'Create Trigger'}
        </Button>
      </div>
    </form>
  );
};

export default CreateEmailTrigger;