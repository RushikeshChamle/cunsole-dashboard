'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@ui/form';
import { Loader, Text, Input } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/validators/personal-info.schema';
import UploadZone from '@ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@ui/file-upload/avatar-upload';
import { useEffect, useState } from 'react';
import axiosInstance from '@/axiosInstance'; // Adjust your import for axiosInstance
import { func } from 'prop-types';
import { useForm } from 'react-hook-form';
import { Button} from "rizzui"
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';


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



export default function PersonalInfoView() {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { control, handleSubmit, reset } = useForm({
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
    // Reset the form to its initial state
    reset();
  };

  const handleSave = (data) => {
    console.log('Saving data:', data);
    setIsEditable(false);
    toast.success('Changes saved successfully');
  };

  if (loading) return <Loader text="Loading..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Form onSubmit={handleSubmit(handleSave)} className="@container">
      {({ formState: { errors } }) => (
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
                        value={account.name}
                        onChange={(e) => {
                          const newAccounts = [...field.value];
                          newAccounts[index].name = e.target.value;
                          field.onChange(newAccounts);
                        }}
                        disabled={!isEditable}
                        error={errors?.accounts?.[index]?.name?.message}
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

            {/* <Controller
              control={control}
              name="users"
              render={({ field }) => (
                <FormGroup
                  title="Users"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  {field.value?.map((user, index) => (
                    <div key={user.id} className="mb-4">
                      <Input
                        label="Name"
                        value={user.name}
                        onChange={(e) => {
                          const newUsers = [...field.value];
                          newUsers[index].name = e.target.value;
                          field.onChange(newUsers);
                        }}
                        disabled={!isEditable}
                        error={errors?.users?.[index]?.name?.message}
                        className="mb-2"
                      />
                      <Input
                        label="Email"
                        value={user.email}
                        onChange={(e) => {
                          const newUsers = [...field.value];
                          newUsers[index].email = e.target.value;
                          field.onChange(newUsers);
                        }}
                        disabled={!isEditable}
                        error={errors?.users?.[index]?.email?.message}
                        className="mb-2"
                        prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
                      />
                    </div>
                  ))}
                </FormGroup>
              )}
            /> */}
          </div>

          <div className="flex justify-end space-x-4 pt-5" style={{
            // position: "relative",
            
            // top: "calc(-35rem - 10px)",


          }}
          
          >
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