'use client';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@ui/form'; // Assuming this is your custom Form component
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

// Explicitly define the form data structure
interface FormData {
  accounts: Account[];
  users: User[];
}

export default function PersonalInfoView() {
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

  // Ensure that onSubmit matches the expected type
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Saving data:', data);
    setIsEditable(false);
    toast.success('Changes saved successfully');
  };
  

  if (loading) return <Loader string="Loading..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    // Use the Form component with the correct types
    <Form<FormData>
      onSubmit={onSubmit} // Directly pass the onSubmit function
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
            value={field.value[index]?.name || ''}
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
