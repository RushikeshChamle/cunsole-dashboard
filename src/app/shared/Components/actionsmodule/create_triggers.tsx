'use client';

// import { useState } from 'react';
// import { SubmitHandler, Controller } from 'react-hook-form';
// import { Form } from '@ui/form';
// import { Text, Input, Select, Textarea } from 'rizzui';
// import FormFooter from '@components/form-footer';
// import { toast } from 'react-hot-toast';
// import { EmailTriggerFormInput, emailTriggerFormSchema } from '@/validators/trigger_schema'

// const conditionOptions = [
//   { value: 0, label: 'Before Due Date' },
//   { value: 1, label: 'On Due Date' },
//   { value: 2, label: 'After Due Date' },
// ];

// export default function CreateEmailTrigger({
//   id,
//   record,
// }: {
//   id?: string;
//   record?: EmailTriggerFormInput;
// }) {
//   const [reset, setReset] = useState({});
//   const [isLoading, setLoading] = useState(false);

//   const onSubmit: SubmitHandler<EmailTriggerFormInput> = (data) => {
//     toast.success(
//       <Text as="b">Email trigger successfully {id ? 'updated' : 'created'}</Text>
//     );
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       console.log('createEmailTrigger data ->', data);
//       setReset({
//         name: '',
//         condition_type: 0,
//         email_subject: '',
//         email_body: '',
//         days_offset: 1,
//         isactive: true,
//       });
//     }, 600);
//   };

//   return (
//     <Form<EmailTriggerFormInput>
//       validationSchema={emailTriggerFormSchema}
//       resetValues={reset}
//       onSubmit={onSubmit}
//       useFormProps={{
//         defaultValues: {
//           ...record,
//           condition_type: record?.condition_type || 0,
//           days_offset: record?.days_offset || 1,
//           isactive: record?.isactive ?? true,
//         },
//       }}
//       className="flex flex-grow flex-col @container [&_label]:font-medium"
//     >
//       {({ register, control, formState: { errors } }) => (
//         <>
//           <div className="flex-grow pb-10">
//             <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   label="Name"
//                   placeholder="Enter trigger name"
//                   {...register('name')}
//                   error={errors.name?.message}
//                 />
//                 <Controller
//                   name="condition_type"
//                   control={control}
//                   render={({ field: { onChange, value } }) => (
//                     <Select
//                       label="Condition Type"
//                       options={conditionOptions}
//                       value={value}
//                       onChange={onChange}
//                       error={errors.condition_type?.message}
//                     />
//                   )}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4 pt-8">
//                 <Input
//                   label="Email Subject"
//                   placeholder="Enter email subject"
//                   {...register('email_subject')}
//                   error={errors.email_subject?.message}
//                 />
//                 <Input
//                   type="number"
//                   label="Days Offset"
//                   placeholder="Enter days offset"
//                   {...register('days_offset')}
//                   error={errors.days_offset?.message}
//                 />
//               </div>
//               <div className="pt-8">
//                 <Textarea
//                   label="Email Body"
//                   placeholder="Enter email body"
//                   {...register('email_body')}
//                   error={errors.email_body?.message}
//                   textareaClassName="h-32"
//                 />
//               </div>
//               <div className="flex items-center pt-8">
//                 <input
//                   type="checkbox"
//                   id="isactive"
//                   {...register('isactive')}
//                   className="mr-2"
//                 />
//                 <label htmlFor="isactive">Is Active</label>
//               </div>
//             </div>
//           </div>

//           <FormFooter
//             isLoading={isLoading}
//             submitBtnText={id ? 'Update Email Trigger' : 'Create Email Trigger'}
//           />
//         </>
//       )}
//     </Form>
//   );
// }


// ------
// import { useState } from 'react';
// import { SubmitHandler, Controller } from 'react-hook-form';
// import { Form } from '@ui/form';
// import { Text, Input, Select, Textarea } from 'rizzui';
// import FormFooter from '@components/form-footer';
// import { toast } from 'react-hot-toast';
// import { EmailTriggerFormInput, emailTriggerFormSchema } from '@/validators/trigger_schema';

// const conditionOptions = [
//   { value: 0, label: 'Before Due Date' },
//   { value: 1, label: 'On Due Date' },
//   { value: 2, label: 'After Due Date' },
// ];

// function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
// }

// export default function CreateEmailTrigger({
//   id,
//   record,
// }: {
//   id?: string;
//   record?: EmailTriggerFormInput;
// }) {
//   const [reset, setReset] = useState({});
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const onSubmit: SubmitHandler<EmailTriggerFormInput> = async (data) => {

//     const formattedData = {
//       ...data,
//       days_offset: Number(data.days_offset),
//     };
    
  
//     setLoading(true);
//     setError(null);
//     try {
//       const token = getCookie('access_token');
//       if (!token) {
//         setError('No access token found');
//         return;
//       }

//       const response = await fetch('http://localhost:9000/custoers/create_email_trigger/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const result = await response.json();
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
//         const errorData = await response.json();
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

//   return (
//     <Form<EmailTriggerFormInput>
//       validationSchema={emailTriggerFormSchema}
//       resetValues={reset}
//       onSubmit={onSubmit}
//       useFormProps={{
//         defaultValues: {
//           ...record,
//           condition_type: record?.condition_type || 0,
//           days_offset: record?.days_offset || 1,
//           isactive: record?.isactive ?? true,
//         },
//       }}
//       className="flex flex-grow flex-col @container [&_label]:font-medium"
//     >
//       {({ register, control, formState: { errors } }) => (
//         <>
//           <div className="flex-grow pb-10">
//             <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   label="Name"
//                   placeholder="Enter trigger name"
//                   {...register('name')}
//                   error={errors.name?.message}
//                 />
//                 <Controller
//                   name="condition_type"
//                   control={control}
//                   render={({ field: { onChange, value } }) => (
//                     <Select
//                       label="Condition Type"
//                       options={conditionOptions}
//                       value={value}
//                       onChange={onChange}
//                       error={errors.condition_type?.message}
//                     />
//                   )}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4 pt-8">
//                 <Input
//                   label="Email Subject"
//                   placeholder="Enter email subject"
//                   {...register('email_subject')}
//                   error={errors.email_subject?.message}
//                 />
//                 {/* <Input
//                   type="number"
//                   label="Days Offset"
//                   placeholder="Enter days offset"
//                   {...register('days_offset')}
//                   error={errors.days_offset?.message}
//                 /> */}

//               <Input
//                 type="number"
//                 label="Days Offset"
//                 placeholder="Enter days offset"
//                 {...register('days_offset', { valueAsNumber: true })} // Ensures value is treated as number
//                 error={errors.days_offset?.message}
//               />
//               </div>
//               <div className="pt-8">
//                 <Textarea
//                   label="Email Body"
//                   placeholder="Enter email body"
//                   {...register('email_body')}
//                   error={errors.email_body?.message}
//                   textareaClassName="h-32"
//                 />
//               </div>
//               <div className="flex items-center pt-8">
//                 <input
//                   type="checkbox"
//                   id="isactive"
//                   {...register('isactive')}
//                   className="mr-2"
//                 />
//                 <label htmlFor="isactive">Is Active</label>
//               </div>
//             </div>
//           </div>

//           {error && <Text className="mb-4 text-red-500">{error}</Text>}

//           <FormFooter
//             isLoading={isLoading}
//             submitBtnText={id ? 'Update Email Trigger' : 'Create Email Trigger'}
//           />
//         </>
//       )}
//     </Form>
//   );
// }

import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { Text, Input, Select, Textarea, Button } from 'rizzui';
import FormFooter from '@components/form-footer';
import { toast } from 'react-hot-toast';
import { EmailTriggerFormInput, emailTriggerFormSchema } from '@/validators/trigger_schema';

const conditionOptions = [
  { value: 0, label: 'Before Due Date' },
  { value: 1, label: 'On Due Date' },
  { value: 2, label: 'After Due Date' },
];

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function CreateEmailTrigger({
  id,
  record,
}: {
  id?: string;
  record?: EmailTriggerFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit, register, control, formState: { errors } } = useForm<EmailTriggerFormInput>({
    validationSchema: emailTriggerFormSchema,
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
      days_offset: Number(data.days_offset),
    };
    
    setLoading(true);
    setError(null);
    try {
      const token = getCookie('access_token');
      // const csrfToken = getCookie('csrftoken'); 
      if (!token) {
        setError('No access token found');
        return;
      }

      const response = await fetch('http://localhost:9000/customers/create_email_trigger/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // 'X-CSRFToken': csrfToken || '',  // Add the CSRF token to the headers
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(
          <Text as="b">Email trigger successfully {id ? 'updated' : 'created'}</Text>
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
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create email trigger');
        toast.error(<Text as="b">{errorData.error || 'Failed to create email trigger'}</Text>);
      }
    } catch (error) {
      console.error('Error creating email trigger:', error);
      setError('An error occurred while creating the email trigger');
      toast.error(<Text as="b">An error occurred while creating the email trigger</Text>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-grow flex-col @container [&_label]:font-medium">
      <div className="flex-grow pb-10">
        <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Name"
              placeholder="Enter trigger name"
              {...register('name')}
              error={errors.name?.message}
            />
            <Controller
              name="condition_type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Condition Type"
                  options={conditionOptions}
                  value={value}
                  onChange={onChange}
                  error={errors.condition_type?.message}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-8">
            <Input
              label="Email Subject"
              placeholder="Enter email subject"
              {...register('email_subject')}
              error={errors.email_subject?.message}
            />
            <Input
              type="number"
              label="Days Offset"
              placeholder="Enter days offset"
              {...register('days_offset', { valueAsNumber: true })}
              error={errors.days_offset?.message}
            />
          </div>
          <div className="pt-8">
            <Textarea
              label="Email Body"
              placeholder="Enter email body"
              {...register('email_body')}
              error={errors.email_body?.message}
              textareaClassName="h-32"
            />
          </div>
          <div className="flex items-center pt-8">
            <input
              type="checkbox"
              id="isactive"
              {...register('isactive')}
              className="mr-2"
            />
            <label htmlFor="isactive">Is Active</label>
          </div>
        </div>
      </div>

      {error && <Text className="mb-4 text-red-500">{error}</Text>}

      <FormFooter
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
      </FormFooter>
    </form>
  );
}