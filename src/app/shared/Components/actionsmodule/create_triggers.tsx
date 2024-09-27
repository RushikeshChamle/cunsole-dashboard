'use client';

import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { Text, Input, Select, Textarea, Button } from 'rizzui';
import FormFooter from '@components/form-footer';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

interface EmailTriggerFormInput {
  name: string;
  condition_type: number;
  email_subject: string;
  email_body: string;
  days_offset: number;
  isactive: boolean;
}


interface FormFooterProps {
  isLoading: boolean;
  submitBtnText: string;
  children?: React.ReactNode; // Add children to the props definition
}


const conditionOptions = [
  { value: '0', label: 'Before Due Date' },
  { value: '1', label: 'On Due Date' },
  { value: '2', label: 'After Due Date' },
];

interface ExtendedEmailTriggerFormInput extends EmailTriggerFormInput {
  user?: string | null; // Adjust type based on your needs
  account?: string | null; // Adjust type based on your needs
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

const emailTriggerFormSchema = z.object({
  name: z.string().nonempty(),
  condition_type: z.number().int(),
  email_subject: z.string().nonempty(),
  email_body: z.string().nonempty(),
  days_offset: z.number().int(),
  isactive: z.boolean(),
});

// export default function CreateEmailTrigger({ id, record }: { id?: string; record?: any }) { // Change record type to any
//   const [reset, setReset] = useState({});
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const { handleSubmit, register, control, formState: { errors } } = useForm<any>({
//     resolver: zodResolver(emailTriggerFormSchema), // Use resolver for validation
//     defaultValues: {
//       ...record,
//       condition_type: record?.condition_type || 0,
//       days_offset: record?.days_offset || 1,
//       isactive: record?.isactive ?? true,
//     },
//   });

//   // const onSubmit: SubmitHandler<EmailTriggerFormInput> = async (data ) => {
//   //   const formattedData = {
//   //     ...data,
//   //     condition_type: data.condition_type !== null ? parseInt(data.condition_type, 10) : null,
//   //     days_offset: Number(data.days_offset),
//   //   };

//   const onSubmit: SubmitHandler<EmailTriggerFormInput> = async (data) => {
//     const formattedData = {
//       ...data,
//       condition_type: data.condition_type !== null ? String(data.condition_type) : null, // Convert to string
//       days_offset: Number(data.days_offset), // Ensure this is a number
//     };
//     console.log(formattedData);
//   };

//     setLoading(true);
//     setError(null);

//     try {
//       const token = getCookie('access_token');
//       const csrfToken = getCookie('csrftoken');
//       if (!token) {
//         setError('No access token found');
//         return;
//       }

//         const response = await axios.post('http://localhost:9000/customers/create_email_trigger/', formattedData, {

//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'x-csrftoken': csrfToken || '',
//         },
//         withCredentials: true
//       });

//       if (response.data) {
//         const result = response.data
//         toast.success(
//           <Text as="b">Email trigger successfully {id ? 'updated' : 'created'}</Text>
//         );
//         setReset({
//           name: '',
//           condition_type: 0,
//           email_subject: '',
//           email_body: '',
//           days_offset: 1,
//           isactive: true,

//         });
//       } else {
//         const errorData = response.data
//         setError(errorData.error || 'Failed to create email trigger');
//         toast.error(<Text as="b">{errorData.error || 'Failed to create email trigger'}</Text>);
//       }

//     } catch (error) {
//       console.error('Error creating email trigger:', error);
//       setError('An error occurred while creating the email trigger');
//       toast.error(<Text as="b">An error occurred while creating the email trigger</Text>);
//     } finally {
//       setLoading(false);
//     }
//   };

export default function CreateEmailTrigger({
  id,
  record,
}: {
  id?: string;
  record?: any;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(emailTriggerFormSchema),
    defaultValues: {
      ...record,
      condition_type: record?.condition_type || 0,
      days_offset: record?.days_offset || 1,
      isactive: record?.isactive ?? true,
    },
  });

  const onSubmit: SubmitHandler<EmailTriggerFormInput> = async (data) => {
    const formattedData = {
      ...data,
      condition_type:
        data.condition_type !== null ? String(data.condition_type) : null,
      days_offset: Number(data.days_offset),
    };
    console.log(formattedData);

    setLoading(true);
    setError(null);

    try {
      const token = getCookie('access_token');
      const csrfToken = getCookie('csrftoken');
      if (!token) {
        setError('No access token found');
        return;
      }

      const response = await axios.post(
        'http://localhost:9000/customers/create_email_trigger/',
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-csrftoken': csrfToken || '',
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        const result = response.data;
        toast.success(
          <Text as="b">
            Email trigger successfully {id ? 'updated' : 'created'}
          </Text>
        );
        setReset({
          name: '',
          condition_type: 0,
          email_subject: '',
          email_body: '',
          days_offset: 1,
          isactive: true,
        });
      } else {
        const errorData = response.data;
        setError(errorData.error || 'Failed to create email trigger');
        toast.error(
          <Text as="b">
            {errorData.error || 'Failed to create email trigger'}
          </Text>
        );
      }
    } catch (error) {
      console.error('Error creating email trigger:', error);
      setError('An error occurred while creating the email trigger');
      toast.error(
        <Text as="b">An error occurred while creating the email trigger</Text>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      <div className="flex-grow pb-10">
        <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Name"
              placeholder="Enter trigger name"
              {...register('name')}
              // error={errors.name?.message}
              error={
                typeof errors.name?.message === 'string'
                  ? errors.name.message
                  : undefined
              }
            />
            {/* <Controller
          name="condition_type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Condition Type"
              options={conditionOptions}
              value={conditionOptions.find(option => option.value === value) || null}
              onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : null)}
              // error={errors.condition_type?.message}
              error={typeof errors.condition_type?.message === 'string' ? errors.condition_type.message : undefined}

            />
          )}
        /> */}

            <Controller
              name="condition_type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Condition Type"
                  options={conditionOptions}
                  value={
                    conditionOptions.find((option) => option.value === value) ||
                    null
                  }
                  onChange={(
                    selectedOption: {
                      label: string;
                      value: number | string;
                    } | null
                  ) => onChange(selectedOption ? selectedOption.value : null)}
                  error={
                    typeof errors.condition_type?.message === 'string'
                      ? errors.condition_type.message
                      : undefined
                  }
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-8">
            <Input
              label="Email Subject"
              placeholder="Enter email subject"
              {...register('email_subject')}
              // error={errors.email_subject?.message}
              error={
                typeof errors.email_subject?.message === 'string'
                  ? errors.email_subject.message
                  : undefined
              }
            />
            <Input
              type="number"
              label="Days Offset"
              placeholder="Enter days offset"
              {...register('days_offset', { valueAsNumber: true })}
              // error={errors.days_offset?.message}
              error={
                typeof errors.days_offset?.message === 'string'
                  ? errors.days_offset.message
                  : undefined
              }
            />
          </div>
          <div className="pt-8">
            <Textarea
              label="Email Body"
              placeholder="Enter email body"
              {...register('email_body')}
              // error={errors.email_body?.message}
              error={
                typeof errors.email_body?.message === 'string'
                  ? errors.email_body.message
                  : undefined
              }
              textareaClassName="h-32"
            />
          </div>
          {/* <div className="flex items-center pt-8">
            <input
              type="checkbox"
              id="isactive"
              {...register('isactive')}
              className="mr-2"
            />
            <label htmlFor="isactive">Is Active</label>
          </div> */}
        </div>
      </div>

      {error && <Text className="mb-4 text-red-500">{error}</Text>}

      {/* <FormFooter
        isLoading={isLoading}
        submitBtnText={id ? 'Update Email Trigger' : 'Create Email Trigger'}
      >
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full @xl:w-auto"
        >
          {id ? 'Update Email Trigger' : 'Create Email Trigger'}
        </Button>
      </FormFooter> */}

<FormFooter
  isLoading={isLoading}
  submitBtnText={id ? 'Update Email Trigger' : 'Create Email Trigger'}
/>

    </form>
  );
}
