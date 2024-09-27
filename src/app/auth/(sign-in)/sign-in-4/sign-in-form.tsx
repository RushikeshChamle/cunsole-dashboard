'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { useMedia } from '@hooks/use-media';
import { Form } from '@ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import axios from 'axios';
import { message } from 'antd';
import { toast } from 'react-hot-toast';

// const initialValues: LoginSchema = {
//   email: 'admin@admin.com',
//   password: 'admin',
//   rememberMe: true,
// };

export default function SignInForm() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:9000/users/signin/', data);

      
      // Handle the response from the backend
      if (response.data.access && response.data.refresh) {
        // Store the access and refresh tokens in cookies
        const accessExpiration = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 24 hours
        const refreshExpiration = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
        document.cookie = `access_token=${response.data.access}; expires=${accessExpiration.toUTCString()}; path=/; Secure; SameSite=None`;
        document.cookie = `refresh_token=${response.data.refresh}; expires=${refreshExpiration.toUTCString()}; path=/; Secure; SameSite=None`;
        // Redirect to the dashboard or any other protected route

       // Retrieve CSRF token from the response
      //  const csrfToken = response.data.csrf_token || response.headers['x-csrf-token'];
      //  if (csrfToken) {
      //    document.cookie = `csrf_token=${csrfToken}; path=/; Secure; SameSite=None`;
      //  }

      toast.success('Login successful!', {
        duration: 2000,
        position: 'top-center',
      });

        window.location.href = '/invoice';
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      let errorMessage = 'An error occurred. Please try again.';

      // Handle the error
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }

      toast.error(errorMessage, {
        duration: 1000,
        position: 'top-center',
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          // defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-1">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword4}
                className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              isLoading={loading}
            >
              Sign In
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp4}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
