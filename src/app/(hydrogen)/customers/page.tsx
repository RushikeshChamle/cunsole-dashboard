
'use client';

interface ErrorResponse {
  error: string;
}

const pageHeader = {
  title: 'Customers List',
  breadcrumb: [
    {
      href: routes.customers,
      name: 'Home',
    },
    {
      href: routes.customers.home,
      name: 'Customers',
    },
    {
      name: 'List',
    },
  ],
};
import { Alert } from 'rizzui'; // Adjust the import based on your project structure
import { RxCross2 } from 'react-icons/rx';
import { Textarea } from 'rizzui';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/axiosInstance';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Badge, Table } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import { Modal, Text, ActionIcon, Input, Checkbox } from 'rizzui';

import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

// Define TypeScript types for the API response
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_amount_to_pay: number;
  total_paid_amount: number;
}

interface ApiResponse {
  customer: Customer;
}

// Function to get cookie value by name
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function CustomersListPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // For search input

  const [errorMessage, setErrorMessage] = useState('');

  const [modalState, setModalState] = useState({
    isOpen: false,
    size: 'md',
  });

  // Modal form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalcode: '',
    country: '',
    creditlimit: '',
    paymentterms: '',
  });

  // Define fetchData function
  // async function fetchData() {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const token = getCookie('access_token');
  //     if (!token) {
  //       setError('No access token found');
  //       return;
  //     }

  //     const response = await fetch(
  //       'http://localhost:9000/customers/cutomerinvoices/',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData: any = await response.json();
  //       throw new Error(errorData.error || 'Network response was not ok');
  //     }

  //     // const data: ApiResponse[] = await response.json();
  //     const data = (await response.json()) as ApiResponse[]; // Assert the type
  //     // Extract customer data from the API response
  //     const customerData = data.map((customerData) => customerData.customer);
  //     setCustomers(customerData);
  //   } catch (error) {
  //     setError((error as Error).message); // Safely casting error to Error
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);


  // Define fetchData function
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/customers/customerinvoices/');
      const data = response.data as ApiResponse[]; // Type assertion

      // Extract customer data from the API response
      const customerData = data.map((customerData) => customerData.customer);
      setCustomers(customerData);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch customer data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const token = getCookie('access_token');
  //   if (!token) {
  //     toast.error('No access token found');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       'http://localhost:9000/customers/create_customer/',
  //       {
  //         method: 'POST',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (!response.ok) {
  //       // const { error } = await response.json();
  //       // throw new Error(error || 'Failed to create customer');
  //       const errorData: any = await response.json(); // Use 'any' temporarily
  //       throw new Error(errorData.error || 'Failed to create customer');
  //     }

  //     toast.success('Customer created successfully');
  //     setModalState((prevState) => ({ ...prevState, isOpen: false }));
  //     await fetchData(); // Refresh customer data after form submission
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/customers/create_customer/', formData);

      if (response.status === 201) {
        toast.success('Customer created successfully');
        setModalState((prevState) => ({ ...prevState, isOpen: false }));
        await fetchData(); // Refresh customer data after form submission
      } else {
        throw new Error('Failed to create customer');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create customer');
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb as any}
      >
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={customers}
            fileName="customer_data"
            header="ID,Name,Email,Phone,Total Amount to Pay,Total Paid Amount"
          />
          <Button
            onClick={() =>
              setModalState((prevState) => ({
                ...prevState,
                isOpen: true,
                size: 'xl',
              }))
            }
            className="w-full @lg:w-auto"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Customer
          </Button>
        </div>
      </PageHeader>

      <Modal
        isOpen={modalState.isOpen}
        size={modalState.size as any}
        onClose={() =>
          setModalState((prevState) => ({ ...prevState, isOpen: false }))
        }
      >
        <div className="m-auto px-7 pb-8 pt-6">
          <div className="mb-7 flex items-center justify-between">
            <Text as="strong">Create Customer</Text>
            <ActionIcon
              size="sm"
              variant="text"
              onClick={() =>
                setModalState((prevState) => ({ ...prevState, isOpen: false }))
              }
            >
              <RxCross2 className="h-auto w-6" strokeWidth={1.8} />
            </ActionIcon>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-4 gap-4 [&_label>span]:font-medium"
          >
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              label="Customer Name *"
              // size="lg"
              className="col-span-4"
            />
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              label="Email *"
              // size="lg"
              className="col-span-2"
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              label="Contact no *"
              // size="lg"
              className="col-span-2"
            />
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              label="Address "
              // size="lg"
              className="col-span-4"
            />
            <Input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              label="City "
              // size="lg"
              className="col-span-2"
            />
            <Input
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              label="State "
              // size="lg"
              className="col-span-2"
            />
            <Input
              name="postalcode"
              value={formData.postalcode}
              onChange={handleInputChange}
              label="Postal Code "
              // size="lg"
              className="col-span-2"
            />
            <Input
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              label="Country "
              // size="lg"
              className="col-span-2"
            />
            <Input
              name="creditlimit"
              value={formData.creditlimit}
              onChange={handleInputChange}
              label="Credit Limit "
              // size="lg"
              className="col-span-2"
            />
            <Input
              name="paymentterms"
              value={formData.paymentterms}
              onChange={handleInputChange}
              label="Payment Terms "
              // size="lg"
              className="col-span-2"
            />

            {/* <Input 
    name="id"
    label="ID *"  
    // size="lg"
    className="col-span-4"
  /> */}
            <Button
              type="submit"
              // size="lg"
              className="col-span-4 mt-2"
            >
              Create Customer
            </Button>
          </form>
        </div>
      </Modal>

      {/* Search Bar */}
      <div
      
        style={{
          position: 'relative',
          width: '17rem',
        }}
      >
        <Input
          className="mb-2"
          prefix={<MagnifyingGlassIcon className="w-4" />}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Customer Name</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Phone</Table.Head>
            <Table.Head>Total Amount to Pay</Table.Head>
            <Table.Head>Total Paid Amount</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
      
        <Table.Body>
          {filteredCustomers.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={6} className="text-center">
                No customers found
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredCustomers.map((customer) => (
              <Table.Row key={customer.id}>
                <Table.Cell>{customer.id}</Table.Cell>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{customer.email}</Table.Cell>
                <Table.Cell>{customer.phone}</Table.Cell>
                <Table.Cell>{customer.total_amount_to_pay}</Table.Cell>
                <Table.Cell>{customer.total_paid_amount}</Table.Cell>
                <Table.Cell>
                  <Link href={`/customers/${customer.id}`}>
                    <Button size='sm' variant="outline">Details</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </>
  );
}


