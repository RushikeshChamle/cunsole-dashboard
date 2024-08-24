'use client';


import { useState, useEffect } from 'react';
import axios from 'axios';

import { Collapse, Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import { PiCaretDownBold, PiUserFill } from 'react-icons/pi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdPayment } from 'react-icons/md';

// const customerInformation = [
//   {
//     title: 'Customer Overview',
//     icon: <PiUserFill className="h-6 w-6 text-primary" />,
//     data: [
//       {
//         name: 'Customer ID',
//         value: 'CUST1001',
//       },
//       {
//         name: 'Name',
//         value: 'John Doe',
//       },
//       {
//         name: 'Company',
//         value: 'ABC Corporation',
//       },
//       {
//         name: 'Email',
//         value: 'john.doe@abccorp.com',
//       },
//       {
//         name: 'Phone',
//         value: '+1 (555) 123-4567',
//       },
//     ],
//   },


//   {
//     title: 'Account Summary',
//     icon: <RiMoneyDollarCircleLine className="h-5 w-6 text-primary" />,
//     data: [
//       {
//         name: 'Total Outstanding',
//         value: '$25,000.00',
//       },
//       {
//         name: 'Credit Limit',
//         value: '$50,000.00',
//       },
//       {
//         name: 'Available Credit',
//         value: '$25,000.00',
//       },
//       {
//         name: 'Payment Terms',
//         value: 'Net 30',
//       },
//     ],
//   },
//   {
//     title: 'Recent Transactions',
//     icon: <MdPayment className="h-5 w-5 text-primary" />,
//     data: [
//       {
//         name: 'Last Payment Date',
//         value: '2024-08-01',
//       },
//       {
//         name: 'Last Payment Amount',
//         value: '$5,000.00',
//       },
//       {
//         name: 'Last Invoice Date',
//         value: '2024-07-15',
//       },
//       {
//         name: 'Last Invoice Amount',
//         value: '$7,500.00',
//       },
//       {
//         name: 'Next Payment Due',
//         value: '2024-08-14',
//       },
//     ],
//   },
// ];

// export default function Details({ className }: { className?: string }) {
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

// Function to get cookie value by name
// function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
// }



// Define a function to get cookie value by name
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}


export default function Details({ customerId }: { customerId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:9000/invoices/get_customer_summary/${customerId}/`)
  //     .then(response => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // }, [customerId]);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const token = getCookie('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await axios.get(`http://127.0.0.1:9000/invoices/get_customer_summary/${customerId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const { customer, invoices } = data;

  const customerInformation = [
    {
      title: 'Customer Overview',
      icon: <PiUserFill />,
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
      icon: <RiMoneyDollarCircleLine />,
      data: [
        { name: 'Total Outstanding', value: `$${invoices.reduce((acc, inv) => acc + parseFloat(inv.total_amount) - parseFloat(inv.paid_amount), 0).toFixed(2)}` },
        { name: 'Credit Limit', value: `$${customer.creditlimit}` },
        { name: 'Available Credit', value: `$${(parseFloat(customer.creditlimit) - invoices.reduce((acc, inv) => acc + parseFloat(inv.total_amount) - parseFloat(inv.paid_amount), 0)).toFixed(2)}` },
        { name: 'Payment Terms', value: customer.paymentterms },
      ],
    },
    {
      title: 'Recent Transactions',
      icon: <MdPayment />,
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
    <>
      <Title>Customer Information</Title>
      {customerInformation.map((item, index) => (
        <Collapse key={index} title={item.title} icon={item.icon}>
          {item.data.map((info, index) => (
            <Text key={index}>
              <strong>{info.name}:</strong> {info.value}
            </Text>
          ))}
        </Collapse>
      ))}
    </>
  );
}
