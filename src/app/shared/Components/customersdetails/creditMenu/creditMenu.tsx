// 'use client';
// import { useState, useEffect } from 'react';
// import axiosInstance from '@/axiosInstance';
// import { Collapse, Title, Text } from 'rizzui';
// import cn from '@utils/class-names';
// import { PiCaretDownBold } from 'react-icons/pi';
// import { 
//   PiUserFill,  
//   PiCreditCardFill,  
//   PiChartBarFill,    
//   PiWalletFill       
// } from 'react-icons/pi';



// interface CreditReport {
//     credit_score: number;
//     credit_rating: string;
//     scoring_breakdown: {
//         payment_timeliness: number;
//         payment_consistency: number;
//         invoice_volume: number;
//         credit_utilization: number;
//     };
//     customer_id: string;
//     customer_name: string;
//     customer_email: string;
//     payment_performance: {
//         total_invoices: number;
//         on_time_payments: number;
//         late_payments: number;
//         on_time_payment_percentage: number;
//     };
//     financial_health: {
//         total_invoice_amount: number;
//         total_paid_amount: number;
//         total_outstanding_amount: number;
//         total_overdue_amount: number;
//         current_credit_utilization: number;
//         credit_limit: number;
//     };
//     analysis: {
//         payment_timeliness: string;
//         payment_consistency: string;
//         invoice_volume: string;
//         credit_utilization: string;
//     };
// }

// export default function CreditReportDetails({ customerId, className }: { customerId: string; className?: string }) {
//   const [creditReport, setCreditReport] = useState<CreditReport | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchCreditReport() {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await axiosInstance.get(`users/calculate_credit_score/${customerId}/`);
//         setCreditReport(response.data);
//       } catch (err: any) {
//         setError('Failed to load credit report. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCreditReport();
//   }, [customerId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!creditReport) return null;

//   const creditInformation = [
//     {
//       title: 'Customer Overview',
//       icon: <PiUserFill className="h-5 w-5 text-primary" />,
//       data: [
//         { name: 'Customer ID', value: creditReport.customer_id },
//         { name: 'Name', value: creditReport.customer_name },
//         { name: 'Email', value: creditReport.customer_email },
//       ],
//     },
//     {
//       title: 'Credit Score Summary',
//       icon: <PiCreditCardFill className="h-5 w-5 text-primary" />,
//       data: [
//         { name: 'Credit Score', value: `${creditReport.credit_score} / 850` },
//         { name: 'Credit Rating', value: creditReport.credit_rating },
//         { name: 'Total Invoices', value: creditReport.payment_performance.total_invoices.toString() },
//         { name: 'Credit Limit', value: `$${creditReport.financial_health.credit_limit.toFixed(2)}` },
//       ],
//     },
//     {
//       title: 'Payment Performance',
//       icon: <PiChartBarFill className="h-5 w-5 text-primary" />,
//       data: [
//         { name: 'On-Time Payments', value: creditReport.payment_performance.on_time_payments.toString() },
//         { name: 'Late Payments', value: creditReport.payment_performance.late_payments.toString() },
//         { name: 'On-Time Payment %', value: `${creditReport.payment_performance.on_time_payment_percentage.toFixed(2)}%` },
//         { name: 'Total Invoice Amount', value: `$${creditReport.financial_health.total_invoice_amount.toFixed(2)}` },
//       ],
//     },
//     {
//       title: 'Financial Health',
//       icon: <PiWalletFill className="h-5 w-5 text-primary" />,
//       data: [
//         { name: 'Total Paid Amount', value: `$${creditReport.financial_health.total_paid_amount.toFixed(2)}` },
//         { name: 'Outstanding Amount', value: `$${creditReport.financial_health.total_outstanding_amount.toFixed(2)}` },
//         { name: 'Current Credit Utilization', value: `${creditReport.financial_health.current_credit_utilization.toFixed(2)}%` },
//         { name: 'Overdue Amount', value: `$${creditReport.financial_health.total_overdue_amount.toFixed(2)}` },
//       ],
//     }
//   ];

//   return (
//     <Collapse
//       defaultOpen={true}
//       className={cn('mx-0 py-5 md:py-7 lg:mx-8', className)}
//       header={({ open, toggle }) => (
//         <button
//           type="button"
//           onClick={toggle}
//           className="flex w-full cursor-pointer items-center justify-between text-left font-lexend text-xl font-semibold text-gray-700"
//         >
//           Credit Report
//           <PiCaretDownBold
//             className={cn(
//               'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
//               open && '-rotate-0 rtl:rotate-0'
//             )}
//           />
//         </button>
//       )}
//     >
//       {creditInformation.map((item, index) => (
//         <div
//           className={cn(
//             'my-10 flex gap-4',
//             index === creditInformation.length - 1 && 'mb-3'
//           )}
//           key={`credit-block-${index}`}
//         >
//           <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-lighter">
//             {item.icon}
//           </span>

//           <div className="flex flex-col gap-y-3">
//             <Title as="h3" className="text-base font-semibold">
//               {item.title}
//             </Title>
//             {item.data.map((info, idx) => (
//               <div
//                 className="flex flex-col sm:flex-row sm:items-center"
//                 key={`info-${idx}`}
//               >
//                 <Title
//                   as="h4"
//                   className="text-sm font-normal capitalize text-gray-700 sm:min-w-[244px] md:min-w-[424px]"
//                 >
//                   {info.name}:
//                 </Title>
//                 <Text className="gap-3 text-sm text-gray-500">{info.value}</Text>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </Collapse>
//   );
// }



// 'use client';
// import { useState, useEffect } from 'react';
// import axiosInstance from '@/axiosInstance';
// import { 
//   Title, 
//   Text 
// } from 'rizzui';
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid,
//   Tooltip, 
//   ResponsiveContainer,
//   ComposedChart,
//   Line
// } from 'recharts';
// import CreditScorePieChart from '@/app/shared/Components/customersdetails/creditMenu/creditchart'; // Import the new component


// interface CreditReport {
//     credit_score: number;
//     credit_rating: string;
//     scoring_breakdown: {
//         payment_timeliness: number;
//         payment_consistency: number;
//         invoice_volume: number;
//         credit_utilization: number;
//     };
//     customer_id: string;
//     customer_name: string;
//     customer_email: string;
//     payment_performance: {
//         total_invoices: number;
//         on_time_payments: number;
//         late_payments: number;
//         on_time_payment_percentage: number;
//     };
//     financial_health: {
//         total_invoice_amount: number;
//         total_paid_amount: number;
//         total_outstanding_amount: number;
//         total_overdue_amount: number;
//         current_credit_utilization: number;
//         credit_limit: number;
//     };
//     analysis: {
//         payment_timeliness: string;
//         payment_consistency: string;
//         invoice_volume: string;
//         credit_utilization: string;
//     };
// }
// export default function CreditReportDetails({ customerId }: { customerId: string }) {
//   const [creditReport, setCreditReport] = useState<CreditReport | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchCreditReport() {
//       try {
//         setLoading(true);
//         const response = await axiosInstance.get(`users/calculate_credit_score/${customerId}/`);
//         setCreditReport(response.data);
//       } catch (err) {
//         setError('Unable to load credit report');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCreditReport();
//   }, [customerId]);

//   if (loading) return <div className="text-center py-4 text-gray-500">Loading...</div>;
//   if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
//   if (!creditReport) return null;

//   const paymentPerformanceData = [
//     { 
//       name: 'Total Invoices', 
//       value: creditReport.payment_performance.total_invoices,
//       onTime: creditReport.payment_performance.on_time_payments,
//       late: creditReport.payment_performance.late_payments,
//       onTimePercentage: creditReport.payment_performance.on_time_payment_percentage
//     }
//   ];

//   return (
//     <div className="mx-auto p-4 space-y-6">
//       {/* Credit Score Section with New Visualization */}
//       <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
//         <div className="col-span-1">
//           <Text className="text-gray-600">Credit Score</Text>
//           <Title as="h3" className="text-xl font-bold">
//             {creditReport.credit_score}
//             <span className="text-sm text-gray-500 ml-2">
//               ({creditReport.credit_rating})
//             </span>
//           </Title>
//         </div>
//         <div className="col-span-2">
//           <CreditScorePieChart creditScore={creditReport.credit_score} />
//         </div>
//       </div>

//       {/* Rest of the component remains the same */}
//       <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
//         <div>
//           <Text className="text-gray-600">Credit Limit</Text>
//           <Title as="h3" className="text-xl font-bold">
//             ${creditReport.financial_health.credit_limit.toLocaleString()}
//           </Title>
//         </div>
//         <div>
//           <Text className="text-gray-600">Credit Utilization</Text>
//           <Title as="h3" className="text-xl font-bold">
//             {creditReport.financial_health.current_credit_utilization}%
//           </Title>
//         </div>
//       </div>

//       {/* Payment Performance Chart */}
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <Title as="h3" className="text-lg mb-4 text-center">
//           Payment Performance
//         </Title>
//         <ResponsiveContainer width="100%" height={300}>
//           <ComposedChart data={paymentPerformanceData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" fontSize={12} />
//             <YAxis fontSize={12} label={{ value: 'Invoices', angle: -90, position: 'insideLeft' }} />
//             <Tooltip 
//               formatter={(value, name) => {
//                 switch(name) {
//                   case 'onTime': return [`${value} On-Time Invoices`, 'On-Time'];
//                   case 'late': return [`${value} Late Invoices`, 'Late'];
//                   case 'onTimePercentage': return [`${value}% On-Time Rate`, 'On-Time Rate'];
//                   default: return [value, name];
//                 }
//               }}
//             />
//             <Bar dataKey="onTime" barSize={20} fill="#4CAF50" stackId="a" />
//             <Bar dataKey="late" barSize={20} fill="#F44336" stackId="a" />
//             <Line 
//               type="monotone" 
//               dataKey="onTimePercentage" 
//               stroke="#2196F3" 
//               strokeWidth={2} 
//               name="On-Time Percentage"
//             />
//           </ComposedChart>

//         </ResponsiveContainer>



//       </div>

//       {/* Financial Health Summary */}
//       <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
//         <div>
//           <Text className="text-gray-600">Total Invoice Amount</Text>
//           <Text className="font-semibold text-blue-600">
//             ${creditReport.financial_health.total_invoice_amount.toLocaleString()}
//           </Text>
//         </div>
//         <div>
//           <Text className="text-gray-600">Total Paid Amount</Text>
//           <Text className="font-semibold text-green-600">
//             ${creditReport.financial_health.total_paid_amount.toLocaleString()}
//           </Text>
//         </div>
//         <div>
//           <Text className="text-gray-600">Total Outstanding</Text>
//           <Text className="font-semibold text-red-600">
//             ${creditReport.financial_health.total_outstanding_amount.toLocaleString()}
//           </Text>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/axiosInstance';
import { 
  Title, 
  Text 
} from 'rizzui';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Line
} from 'recharts';
import CreditScorePieChart from '@/app/shared/Components/customersdetails/creditMenu/creditchart'; // Import the new component

interface CreditReport {
    credit_score: number;
    credit_rating: string;
    scoring_breakdown: {
        payment_timeliness: number;
        payment_consistency: number;
        invoice_volume: number;
        credit_utilization: number;
    };
    customer_id: string;
    customer_name: string;
    customer_email: string;
    payment_performance: {
        total_invoices: number;
        on_time_payments: number;
        late_payments: number;
        on_time_payment_percentage: number;
    };
    financial_health: {
        total_invoice_amount: number;
        total_paid_amount: number;
        total_outstanding_amount: number;
        total_overdue_amount: number;
        current_credit_utilization: number;
        credit_limit: number;
    };
    analysis: {
        payment_timeliness: string;
        payment_consistency: string;
        invoice_volume: string;
        credit_utilization: string;
    };
}

export default function CreditReportDetails({ customerId }: { customerId: string }) {
  const [creditReport, setCreditReport] = useState<CreditReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCreditReport() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`users/calculate_credit_score/${customerId}/`);
        setCreditReport(response.data);
      } catch (err) {
        setError('Unable to load credit report');
      } finally {
        setLoading(false);
      }
    }

    fetchCreditReport();
  }, [customerId]);

  if (loading) return <div className="text-center py-4 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!creditReport) return null;

  const paymentPerformanceData = [
    { 
      name: 'Total Invoices', 
      value: creditReport.payment_performance.total_invoices,
      onTime: creditReport.payment_performance.on_time_payments,
      late: creditReport.payment_performance.late_payments,
      onTimePercentage: creditReport.payment_performance.on_time_payment_percentage
    }
  ];

  return (
    <div className="mx-auto p-4 space-y-6">
      {/* Customer Information Section */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
        <div>
          <Text className="text-gray-600">Total A/R</Text>
          <Title as="h3" className="text-xl font-bold">
            ${creditReport.financial_health.total_invoice_amount.toLocaleString()}
          </Title>
        </div>
        <div>
          <Text className="text-gray-600">Total Due Amount</Text>
          <Title as="h3" className="text-xl font-bold">
            ${creditReport.financial_health.total_outstanding_amount.toLocaleString()}
          </Title>
        </div>
        <div>
          <Text className="text-gray-600">Total Overdue Amount</Text>
          <Title as="h3" className="text-xl font-bold">
            ${creditReport.financial_health.total_overdue_amount.toLocaleString()}
          </Title>
        </div>
      </div>

      {/* Credit Score Section */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
        <div className="col-span-1">
          <Text className="text-gray-600">Credit Score</Text>
          <Title as="h3" className="text-xl font-bold">
            {creditReport.credit_score}
            <span className="text-sm text-gray-500 ml-2">
              ({creditReport.credit_rating})
            </span>
          </Title>
        </div>
        <div className="col-span-2">
          <CreditScorePieChart creditScore={creditReport.credit_score} />
        </div>
      </div>

      {/* Financial Health Summary */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
        <div>
          <Text className="text-gray-600">Credit Limit</Text>
          <Title as="h3" className="text-xl font-bold">
            ${creditReport.financial_health.credit_limit.toLocaleString()}
          </Title>
        </div>
        <div>
          <Text className="text-gray-600">Credit Utilization</Text>
          <Title as="h3" className="text-xl font-bold">
            {creditReport.financial_health.current_credit_utilization}%
          </Title>
        </div>
      </div>

      {/* Payment Performance Chart */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <Title as="h3" className="text-lg mb-4 text-center">
          Payment Performance
        </Title>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={paymentPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} label={{ value: 'Invoices', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value, name) => {
                switch(name) {
                  case 'onTime': return [`${value} On-Time Invoices`, 'On-Time'];
                  case 'late': return [`${value} Late Invoices`, 'Late'];
                  case 'onTimePercentage': return [`${value}% On-Time Rate`, 'On-Time Rate'];
                  default: return [value, name];
                }
              }}
            />
            <Bar dataKey="onTime" barSize={20} fill="#4CAF50" stackId="a" />
            <Bar dataKey="late" barSize={20} fill="#F44336" stackId="a" />
            <Line 
              type="monotone" 
              dataKey="onTimePercentage" 
              stroke="#2196F3" 
              strokeWidth={2} 
              name="On-Time Percentage"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Financial Health Summary */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
        <div>
          <Text className="text-gray-600">Total Invoice Amount</Text>
          <Text className="font-semibold text-blue-600">
            ${creditReport.financial_health.total_invoice_amount.toLocaleString()}
          </Text>
        </div>
        <div>
          <Text className="text-gray-600">Total Paid Amount</Text>
          <Text className="font-semibold text-green-600">
            ${creditReport.financial_health.total_paid_amount.toLocaleString()}
          </Text>
        </div>
        <div>
          <Text className="text-gray-600">Total Outstanding</Text>
          <Text className="font-semibold text-red-600">
            ${creditReport.financial_health.total_outstanding_amount.toLocaleString()}
          </Text>
        </div>
      </div>
    </div>
  );
}
