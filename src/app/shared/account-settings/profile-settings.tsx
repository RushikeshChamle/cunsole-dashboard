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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get("http://localhost:9000/users/accounts_users/");
  //       reset({
  //         accounts: response.data.accounts,
  //         users: response.data.users
  //       });
  //       setLoading(false);
  //     } catch (error) {
  //       setError('Failed to fetch data');
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [reset]);

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Set loading state before making the request
      setError(null);    // Clear any previous errors
  
      try {
        const response = await axiosInstance.get("/users/accounts_users/");
        
        // Reset form values with fetched data (accounts, users)
        reset({
          accounts: response.data.accounts,
          users: response.data.users,
        });
        
      } catch (error: any) {
        // Enhanced error handling
        setError(error.response?.data?.error || 'Failed to fetch data');
        
      } finally {
        setLoading(false); // Ensure loading state is updated after the request completes
      }
    };
  
    fetchData();
  }, [reset]); // Keep reset in the dependency array to reset form data properly
  
 
  
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
            title="User Info"
            description="View and edit your details"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          />
         

          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">


<Controller
  control={control}
  name="users"
  render={({ field }) => (
    <FormGroup
      title="User"
      className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    >
      {field.value?.map((User, index) => (
        <div key={User.id} className="mb-4">
          <Input
            label="Name"
            value={field.value[index]?.name || ''}
            {...register(`users.${index}.name` as const)}
            disabled={!isEditable}
            error={errors.accounts?.[index]?.name?.message}
            className="mb-2"
          />
          <Input
            label="Email"
            value={User.email}
            disabled
            className="mb-2"
          />  <Input
            label="Contact"
            value={User.contact}
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










