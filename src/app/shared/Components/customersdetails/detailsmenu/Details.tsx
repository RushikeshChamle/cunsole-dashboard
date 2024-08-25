// 'use client';


// // Import necessary libraries and components
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Collapse, Title, Text } from 'rizzui';
// import cn from '@utils/class-names';
// import { PiCaretDownBold, PiUserFill } from 'react-icons/pi';
// import { RiMoneyDollarCircleLine } from 'react-icons/ri';
// import { MdPayment } from 'react-icons/md';
// import { getCookie } from 'cookies-next';

// // Define TypeScript interfaces for customer and invoice data structures
// interface Customer {
//   externalid: string;
//   name: string;
//   companyname: string;
//   email: string;
//   phone: string;
//   creditlimit: string;
//   paymentterms: string;
// }

// interface Invoice {
//   total_amount: string;
//   paid_amount: string;
//   issuedat: string;
//   duedate: string;
// }

// interface CustomerData {
//   customer: Customer;
//   invoices: Invoice[];
// }

// // Define the Details component
// export default function Details({ customerId, className }: { customerId: string; className?: string }) {
//   // State variables for storing data, loading state, and error information
//   const [data, setData] = useState<CustomerData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<any>(null);

//   // Fetch customer and invoice data when the component mounts or customerId changes
//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       setError(null);
//       try {
//         // Retrieve the access token from cookies
//         const token = getCookie('access_token');
//         if (!token) {
//           throw new Error('No access token found');
//         }

//         // Fetch customer and invoice data from the API
//         const response = await axios.get(`http://127.0.0.1:9000/invoices/get_customer_summary/${customerId}/`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         // Update state with fetched data
//         setData(response.data);
//       } catch (err) {
//         // Handle errors during data fetching
//         setError(err);
//       } finally {
//         // Set loading state to false once data fetching is complete
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [customerId]);

//   // Render loading state, error state, or the customer details
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data</div>;

//   if (!data) return null;

//   // Destructure customer and invoice data from the response
//   const { customer, invoices } = data;

//   // Prepare customer information for display
//   const customerInformation = [
//     {
//       title: 'Customer Overview',
//       icon: <PiUserFill className="h-5 w-5 text-primary" />,
//       data: [
//         { name: 'Customer ID', value: customer.externalid },
//         { name: 'Name', value: customer.name },
//         { name: 'Company', value: customer.companyname },
//         { name: 'Email', value: customer.email },
//         { name: 'Phone', value: customer.phone },
//       ],
//     },
//     {
//       title: 'Account Summary',
//       icon: <RiMoneyDollarCircleLine className="h-5 w-6 text-primary" />,
//       data: [
//         { name: 'Total Outstanding', value: `$${invoices.reduce((acc, inv) => acc + parseFloat(inv.total_amount) - parseFloat(inv.paid_amount), 0).toFixed(2)}` },
//         { name: 'Credit Limit', value: `$${customer.creditlimit}` },
//         { name: 'Available Credit', value: `$${(parseFloat(customer.creditlimit) - invoices.reduce((acc, inv) => acc + parseFloat(inv.total_amount) - parseFloat(inv.paid_amount), 0)).toFixed(2)}` },
//         { name: 'Payment Terms', value: customer.paymentterms },
//       ],
//     },
//     {
//       title: 'Recent Transactions',
//       icon: <MdPayment className="h-5 w-5 text-primary" />,
//       data: [
//         { name: 'Last Payment Date', value: invoices.length > 0 ? invoices[0].issuedat.split('T')[0] : 'N/A' },
//         { name: 'Last Payment Amount', value: invoices.length > 0 ? `$${invoices[0].paid_amount}` : 'N/A' },
//         { name: 'Last Invoice Date', value: invoices.length > 0 ? invoices[0].duedate.split('T')[0] : 'N/A' },
//         { name: 'Last Invoice Amount', value: invoices.length > 0 ? `$${invoices[0].total_amount}` : 'N/A' },
//         { name: 'Next Payment Due', value: invoices.length > 0 ? invoices[invoices.length - 1].duedate.split('T')[0] : 'N/A' },
//       ],
//     },
//   ];

//   // Render the customer details in a collapsible component
//   return (
//     <>
//       <Collapse
//         defaultOpen={true}
//         className={cn('mx-0 py-5 md:py-7 lg:mx-8', className)}
//         header={({ open, toggle }) => (
//           <button
//             type="button"
//             onClick={toggle}
//             className="flex w-full cursor-pointer items-center justify-between text-left font-lexend text-xl font-semibold text-gray-700"
//           >
//             Customer Information
//             <PiCaretDownBold
//               className={cn(
//                 'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
//                 open && '-rotate-0 rtl:rotate-0'
//               )}
//             />
//           </button>
//         )}
//       >
//         {customerInformation.map((item, index) => (
//           <div
//             className={cn(
//               'my-10 flex gap-4',
//               index === customerInformation.length - 1 && 'mb-3'
//             )}
//             key={`customer-block-${index}`}
//           >
//             <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-lighter">
//               {item.icon}
//             </span>

//             <div className="flex flex-col gap-y-3">
//               <Title as="h3" className="text-base font-semibold">
//                 {item.title}
//               </Title>
//               {item.data.map((info, index) => (
//                 <div
//                   className="flex flex-col sm:flex-row sm:items-center"
//                   key={`info-${index}`}
//                 >
//                   <Title
//                     as="h4"
//                     className="text-sm font-normal capitalize text-gray-700 sm:min-w-[244px] md:min-w-[424px]"
//                   >
//                     {info.name}:
//                   </Title>
//                   <Text className="gap-3 text-sm text-gray-500">
//                     {info.value}
//                   </Text>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </Collapse>
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/axiosInstance'; // Import your custom Axios instance
import { Collapse, Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import { PiCaretDownBold, PiUserFill } from 'react-icons/pi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdPayment } from 'react-icons/md';

interface Customer {
  externalid: string;
  name: string;
  companyname: string;
  email: string;
  phone: string;
  creditlimit: string;
  paymentterms: string;
}

interface Invoice {
  total_amount: string;
  paid_amount: string;
  issuedat: string;
  duedate: string;
}

interface CustomerData {
  customer: Customer;
  invoices: Invoice[];
}

export default function Details({ customerId, className }: { customerId: string; className?: string }) {
  const [data, setData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch customer and invoice data using the custom Axios instance
        const response = await axiosInstance.get(`invoices/get_customer_summary/${customerId}/`);

        // Update state with fetched data
        setData(response.data);
      } catch (err) {
        // Handle errors during data fetching
        setError(err);
      } finally {
        // Set loading state to false once data fetching is complete
        setLoading(false);
      }
    }

    fetchData();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return null;

  const { customer, invoices } = data;

  const customerInformation = [
    {
      title: 'Customer Overview',
      icon: <PiUserFill className="h-5 w-5 text-primary" />,
      data: [
        { name: 'Customer ID', value: customer.externalid },
        { name: 'Name', value: customer.name },
        { name: 'Company', value: customer.companyname },
        { name: 'Email', value: customer.email },
        { name: 'Phone', value: customer.phone },
      ],
    },
    {
      title: 'Account Summary',
      icon: <RiMoneyDollarCircleLine className="h-5 w-6 text-primary" />,
      data: [
        { name: 'Total Outstanding', value: `$${invoices.reduce((acc, inv) => acc + parseFloat(inv.total_amount) - parseFloat(inv.paid_amount), 0).toFixed(2)}` },
        { name: 'Credit Limit', value: `$${customer.creditlimit}` },
        { name: 'Available Credit', value: `$${(parseFloat(customer.creditlimit) - invoices.reduce((acc, inv) => acc + parseFloat(inv.total_amount) - parseFloat(inv.paid_amount), 0)).toFixed(2)}` },
        { name: 'Payment Terms', value: customer.paymentterms },
      ],
    },
    {
      title: 'Recent Transactions',
      icon: <MdPayment className="h-5 w-5 text-primary" />,
      data: [
        { name: 'Last Payment Date', value: invoices.length > 0 ? invoices[0].issuedat.split('T')[0] : 'N/A' },
        { name: 'Last Payment Amount', value: invoices.length > 0 ? `$${invoices[0].paid_amount}` : 'N/A' },
        { name: 'Last Invoice Date', value: invoices.length > 0 ? invoices[0].duedate.split('T')[0] : 'N/A' },
        { name: 'Last Invoice Amount', value: invoices.length > 0 ? `$${invoices[0].total_amount}` : 'N/A' },
        { name: 'Next Payment Due', value: invoices.length > 0 ? invoices[invoices.length - 1].duedate.split('T')[0] : 'N/A' },
      ],
    },
  ];

  return (
    <Collapse
      defaultOpen={true}
      className={cn('mx-0 py-5 md:py-7 lg:mx-8', className)}
      header={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex w-full cursor-pointer items-center justify-between text-left font-lexend text-xl font-semibold text-gray-700"
        >
          Customer Information
          <PiCaretDownBold
            className={cn(
              'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
              open && '-rotate-0 rtl:rotate-0'
            )}
          />
        </button>
      )}
    >
      {customerInformation.map((item, index) => (
        <div
          className={cn(
            'my-10 flex gap-4',
            index === customerInformation.length - 1 && 'mb-3'
          )}
          key={`customer-block-${index}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-lighter">
            {item.icon}
          </span>

          <div className="flex flex-col gap-y-3">
            <Title as="h3" className="text-base font-semibold">
              {item.title}
            </Title>
            {item.data.map((info, index) => (
              <div
                className="flex flex-col sm:flex-row sm:items-center"
                key={`info-${index}`}
              >
                <Title
                  as="h4"
                  className="text-sm font-normal capitalize text-gray-700 sm:min-w-[244px] md:min-w-[424px]"
                >
                  {info.name}:
                </Title>
                <Text className="gap-3 text-sm text-gray-500">
                  {info.value}
                </Text>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Collapse>
  );
}
