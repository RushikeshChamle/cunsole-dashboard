'use client';


// import dynamic from 'next/dynamic';
// import toast from 'react-hot-toast';
// import { SubmitHandler, Controller } from 'react-hook-form';
// import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
// import { Form } from '@ui/form';
// import { Loader, Text, Input } from 'rizzui';
// import FormGroup from '@/app/shared/form-group';
// import FormFooter from '@components/form-footer';
// import {
//   defaultValues,
//   personalInfoFormSchema,
//   PersonalInfoFormTypes,
// } from '@/validators/personal-info.schema';
// import UploadZone from '@ui/file-upload/upload-zone';
// import { countries, roles, timezones } from '@/data/forms/my-details';
// import AvatarUpload from '@ui/file-upload/avatar-upload';
// import { useEffect, useState } from 'react';
// import axiosInstance from '@/axiosInstance'; // Adjust your import for axiosInstance
// import { func } from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { Button} from "rizzui"




// interface Account {
//   id: number;
//   name: string;
//   created_date: string;
//   is_active: boolean;
// }


// interface User {
//   id: number;
//   name: string;
//   email: string;
//   contact: string;
//   is_active: boolean;
//   created_at: string;
//   account: number;
// }

// interface FormData {
//   users: User[];
// }







// const ProfileSettingsView = () => {
//   const [isEditable, setIsEditable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);
//   const [error, setError] = useState<string | null>(null);

//   const { control, handleSubmit, reset } = useForm({
//     mode: 'onChange',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get("http://localhost:9000/users/accounts_users/");
//         reset({
//           accounts: response.data.accounts,
//           users: response.data.users
//         });
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [reset]);

//   const handleEdit = () => {
//     setIsEditable(true);
//   };

//   const handleCancel = () => {
//     setIsEditable(false);
//     // Reset the form to its initial state
//     reset();
//   };

//   // const handleSave = (data :any) => {
//   //   console.log('Saving data:', data);
//   //   setIsEditable(false);
//   //   toast.success('Changes saved successfully');
//   // };

//    // Update the function signature
//    const handleSave: SubmitHandler<FormData> = (data) => {
//     console.log("Saving data:", data);
//     setIsEditable(false);
//     toast.success("Changes saved successfully");
//   };

//   if (loading) return <Loader string="Loading..." />;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     // <Form onSubmit={handleSubmit(handleSave)} className="@container">
//     <Form onSubmit={handleSubmit(handleSave)} className="@container">      
      
      
//       {({ formState: { errors } }) => (
//         <>
//           <FormGroup
//             title="Personal Info"
//             description="View and edit your account details"
//             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//           />

//           <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
      

//             <Controller
//               control={control}
//               name="users"
//               render={({ field }) => (
//                 <FormGroup
//                   title="Users"
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                 >


//                   {field.value?.map((user: any, index : number) => (
//                     <div key={user.id} className="mb-4">
//                       <Input
//                         label="Name"
//                         value={user.name}
//                         onChange={(e) => {
//                           const newUsers = [...field.value];
//                           newUsers[index].name = e.target.value;
//                           field.onChange(newUsers);
//                         }}
//                         disabled={!isEditable}
//                         // error={errors?.users?.[index]?.name?.message}
//                         error={(errors as any)?.users?.[index]?.name?.message}

//                         className="mb-2"
//                       />
//                       <Input
//                         label="Email"
//                         value={user.email}
//                         onChange={(e) => {
//                           const newUsers = [...field.value];
//                           newUsers[index].email = e.target.value;
//                           field.onChange(newUsers);
//                         }}
//                         disabled={!isEditable}
//                         // error={errors?.users?.[index]?.email?.message}
//                         error={(errors as any)?.users?.[index]?.email?.message}

//                         className="mb-2"
//                         prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
//                       />
//                     </div>
//                   ))}
//                 </FormGroup>
//               )}
//             />
//           </div>

//           <div className="flex justify-end space-x-4 pt-5" 
        
          
//           >
//             {!isEditable ? (
//               <Button onClick={handleEdit}>
//                 Edit
//               </Button>
//             ) : (
//               <>
//                 <Button onClick={handleCancel} variant="outline">
//                   Cancel
//                 </Button>
//                 <Button type="submit">
//                   Save
//                 </Button>
//               </>
//             )}
//           </div>
//         </>
//       )}
//     </Form>
//   );
// }



// export default ProfileSettingsView;








'use client';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@ui/form';
import { Loader, Text, Input, Button } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import axiosInstance from '@/axiosInstance';
import toast from 'react-hot-toast';

interface Account {
  id: number;
  name: string;
  created_date: string;
  is_active: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  is_active: boolean;
  created_at: string;
  account: number;
}

interface FormData {
  accounts: Account[];
  users: User[];
}

export default function ProfileSettingsView() {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { control, reset } = useForm<FormData>({
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:9000/users/accounts_users/");
        reset({
          accounts: response.data.accounts,
          users: response.data.users
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [reset]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Saving data:', data);
    setIsEditable(false);
    toast.success('Changes saved successfully');
  };

  if (loading) return <Loader string="Loading..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Form<FormData>
      onSubmit={onSubmit}
      className="@container"
    >
      {({ register, formState: { errors } }) => (
        <>
          <FormGroup
            title="Account Info"
            description="View and edit your account details"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          />

          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <Controller
              control={control}
              name="accounts"
              render={({ field }) => (
                <FormGroup
                  title="Accounts"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  {field.value?.map((account, index) => (
                    <div key={account.id} className="mb-4">
                      <Input
                        label="Name"
                        {...register(`accounts.${index}.name` as const)}
                        disabled={!isEditable}
                        error={errors.accounts?.[index]?.name?.message}
                        className="mb-2"
                      />
                      <Input
                        label="Active"
                        value={account.is_active ? 'Yes' : 'No'}
                        disabled
                        className="mb-2"
                      />
                    </div>
                  ))}
                </FormGroup>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-5">
            {!isEditable ? (
              <Button onClick={handleEdit}>
                Edit
              </Button>
            ) : (
              <>
                <Button onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
                  Save
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </Form>
  );
}














// 'use client';

// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { SubmitHandler, Controller } from 'react-hook-form';
// import { PiEnvelopeSimple, PiSealCheckFill } from 'react-icons/pi';
// import { Form } from '@ui/form';
// import { Button, Title, Text, Input, Checkbox, Select } from 'rizzui';
// import cn from '@utils/class-names';
// import { routes } from '@/config/routes';
// import toast from 'react-hot-toast';
// import AvatarUpload from '@ui/file-upload/avatar-upload';
// import {
//   defaultValues,
//   profileFormSchema,
//   ProfileFormTypes,
// } from '@/validators/profile-settings.schema';
// import { roles } from '@/data/forms/my-details';
// import FormGroup from '@/app/shared/form-group';
// import Link from 'next/link';
// import FormFooter from '@components/form-footer';
// import UploadZone from '@ui/file-upload/upload-zone';
// import { useLayout } from '@/layouts/use-layout';
// import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';
// import { LAYOUT_OPTIONS } from '@/config/enums';
// const QuillEditor = dynamic(() => import('@ui/quill-editor'), {
//   ssr: false,
// });

// export default function ProfileSettingsView() {
//   const onSubmit: SubmitHandler<ProfileFormTypes> = (data) => {
//     toast.success(<Text as="b">Profile successfully updated!</Text>);
//     console.log('Profile settings data ->', data);
//   };

//   return (
//     <>
//       <Form<ProfileFormTypes>
//         validationSchema={profileFormSchema}
//         onSubmit={onSubmit}
//         className="@container"
//         useFormProps={{
//           mode: 'onChange',
//           defaultValues,
//         }}
//       >
//         {({
//           register,
//           control,
//           getValues,
//           setValue,
//           formState: { errors },
//         }) => {
//           return (
//             <>
//               <ProfileHeader
//                 title="Olivia Rhye"
//                 description="Update your photo and personal details."
//               >
//                 <div className="w-full sm:w-auto md:ms-auto">
//                   <Link href={routes.profile}>
//                     <Button as="span">View Profile</Button>
//                   </Link>
//                 </div>
//               </ProfileHeader>

//               <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
//                 <FormGroup
//                   title="Username"
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                 >
//                   <Input
//                     className="col-span-full"
//                     prefix="https://redq.io/"
//                     placeholder="First Name"
//                     prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
//                     {...register('username')}
//                     error={errors.username?.message}
//                   />
//                 </FormGroup>

//                 <FormGroup
//                   title="Website"
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                 >
//                   <Input
//                     type="url"
//                     className="col-span-full"
//                     prefix="https://"
//                     prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
//                     placeholder="Enter your website url"
//                     {...register('website')}
//                     error={errors.website?.message}
//                     disabled
//                   />
//                 </FormGroup>

//                 <FormGroup
//                   title="Your Photo"
//                   description="This will be displayed on your profile."
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                 >
//                   <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
//                     <AvatarUpload
//                       name="avatar"
//                       setValue={setValue}
//                       getValues={getValues}
//                       error={errors?.avatar?.message as string}
//                     />
//                   </div>
//                 </FormGroup>

//                 <FormGroup
//                   title="Your Bio"
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                 >
//                   <div className="@3xl:col-span-2">
//                     <Controller
//                       control={control}
//                       name="description"
//                       render={({ field: { onChange, value } }) => (
//                         <QuillEditor
//                           value={value}
//                           onChange={onChange}
//                           className="[&>.ql-container_.ql-editor]:min-h-[100px]"
//                         />
//                       )}
//                     />
//                   </div>
//                 </FormGroup>

//                 <FormGroup
//                   title="Job Title"
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                 >
//                   <div className="col-span-full">
//                     <Controller
//                       control={control}
//                       name="role"
//                       render={({ field: { value, onChange } }) => (
//                         <Select
//                           dropdownClassName="!z-10 h-auto"
//                           inPortal={false}
//                           placeholder="Select Role"
//                           options={roles}
//                           onChange={onChange}
//                           value={value}
//                           getOptionValue={(option) => option.value}
//                           displayValue={(selected) =>
//                             roles?.find((r) => r.value === selected)?.label ??
//                             ''
//                           }
//                           error={errors?.role?.message as string}
//                         />
//                       )}
//                     />
//                     <Checkbox
//                       label="Show my job title in my profile"
//                       className="mt-3"
//                     />
//                   </div>
//                 </FormGroup>

//                 <FormGroup
//                   title="Alternative contact email"
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                   description="Enter an alternative email if you’d like to be contacted via a different email."
//                 >
//                   <Input
//                     prefix={
//                       <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
//                     }
//                     type="email"
//                     className="col-span-full"
//                     placeholder="georgia.young@example.com"
//                     {...register('email')}
//                     error={errors.email?.message}
//                   />
//                 </FormGroup>

//                 <FormGroup
//                   title="Portfolio Projects"
//                   description="Share a few snippets of your work"
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                 >
//                   <div className="@3xl:col-span-2">
//                     <UploadZone
//                       name="portfolios"
//                       getValues={getValues}
//                       setValue={setValue}
//                       error={errors?.portfolios?.message as string}
//                     />
//                   </div>
//                 </FormGroup>
//               </div>
//               <FormFooter
//                 // isLoading={isLoading}
//                 altBtnText="Cancel"
//                 submitBtnText="Save"
//               />
//             </>
//           );
//         }}
//       </Form>
//     </>
//   );
// }

// export function ProfileHeader({
//   title,
//   description,
//   children,
// }: React.PropsWithChildren<{ title: string; description?: string }>) {
//   const { layout } = useLayout();
//   const { expandedLeft } = useBerylliumSidebars();

//   return (
//     <div
//       className={cn(
//         'relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10',
//         layout === LAYOUT_OPTIONS.BERYLLIUM && expandedLeft
//           ? 'before:start-5 3xl:before:start-[25px]'
//           : 'xl:before:w-[calc(100%_+_10px)]'
//       )}
//     >
//       <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-muted pb-10">
//         <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
//           <Image
//             src="https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.webp"
//             alt="profile-pic"
//             fill
//             sizes="(max-width: 768px) 100vw"
//             className="aspect-auto"
//           />
//         </div>
//         <div>
//           <Title
//             as="h2"
//             className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
//           >
//             {title}
//             <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
//           </Title>
//           {description ? (
//             <Text className="text-sm text-gray-500">{description}</Text>
//           ) : null}
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }
