
// 'use client';

// import { useState } from 'react';
// import WidgetCard from '@components/cards/widget-card';
// import { DatePicker } from '@ui/datepicker';
// import { Badge, Text } from 'rizzui';
// import {
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from 'recharts';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import { useMedia } from '@hooks/use-media';
// import SimpleBar from '@ui/simplebar';

// const data = [
//   {
//     month: 'Jan',
//     invoiceTotal: 2000,
//     collectedAmount: 1000,
//   },
//   {
//     month: 'Feb',
//     invoiceTotal: 4200,
//     collectedAmount: 2798,
//   },
//   {
//     month: 'Mar',
//     invoiceTotal: 5000,
//     collectedAmount: 4000,
//   },
//   {
//     month: 'Apr',
//     invoiceTotal: 5780,
//     collectedAmount: 3908,
//   },
//   {
//     month: 'May',
//     invoiceTotal: 4890,
//     collectedAmount: 2500,
//   },
//   {
//     month: 'Jun',
//     invoiceTotal: 8000,
//     collectedAmount: 5200,
//   },
//   {
//     month: 'Jul',
//     invoiceTotal: 4890,
//     collectedAmount: 6500,
//   },
//   {
//     month: 'Aug',
//     invoiceTotal: 3780,
//     collectedAmount: 4908,
//   },
//   {
//     month: 'Sep',
//     invoiceTotal: 7800,
//     collectedAmount: 2800,
//   },
//   {
//     month: 'Oct',
//     invoiceTotal: 5780,
//     collectedAmount: 1908,
//   },
//   {
//     month: 'Nov',
//     invoiceTotal: 2780,
//     collectedAmount: 3908,
//   },
//   {
//     month: 'Dec',
//     invoiceTotal: 7500,
//     collectedAmount: 3000,
//   },
// ];

// export default function SalesOverview({
//   className,
// }: {
//   className?: string;
// }) {
//   const isTablet = useMedia('(max-width: 820px)', false);
//   const [startDate, setStartDate] = useState<Date>(new Date());
//   return (
//     <WidgetCard
//       title={'Payment Details'}
//       description={
//         <>
//           <Badge renderAsDot className="ms-1 bg-[#10b981]" /> 
//           <Text as="span" className="hidden xs:inline-flex">
//             Total Invoice Amount
//           </Text>
//           <Badge renderAsDot className="me-1 ms-4 bg-[#0470f2]" /> Collected{' '}
//           <Text as="span" className="hidden xs:inline-flex">
//             Amount
//           </Text>
//         </>
//       }
//       descriptionClassName="text-gray-500 mt-1.5"
//       action={
//         <DatePicker
//           selected={startDate}
//           onChange={(date: Date) => setStartDate(date)}
//           dateFormat="yyyy"
//           placeholderText="Select Year"
//           showYearPicker
//           inputProps={{ variant: 'text', inputClassName: 'p-0 px-1 h-auto' }}
//           popperPlacement="bottom-end"
//           className="w-[100px]"
//         />
//       }
//       className={className}
//     >
//       <SimpleBar>
//         <div className="h-[400px] w-full pt-9">
//           <ResponsiveContainer
//             width="100%"
//             height="100%"
//             {...(isTablet && { minWidth: '700px' })}
//           >
//             <AreaChart
//               data={data}
//               margin={{
//                 left: -16,
//               }}
//               className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
//             >
//               <defs>
//                 <linearGradient id="invoiceTotal" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#ffdadf" stopOpacity={0.1} />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="collectedAmount" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.1} />
//                   <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
//               <XAxis
//                 dataKey="month"
//                 axisLine={false}
//                 tickLine={false}
//                 className=" "
//               />
//               <YAxis axisLine={false} tickLine={false} className=" " />
//               <Tooltip content={<CustomTooltip />} />
//               <Area
//                 type="natural"
//                 dataKey="invoiceTotal"
//                 stroke="#10b981"
//                 strokeWidth={2.3}
//                 fillOpacity={1}
//                 fill="url(#invoiceTotal)"
//               />
//               <Area
//                 type="natural"
//                 dataKey="collectedAmount"
//                 stroke="#3872FA"
//                 strokeWidth={2.3}
//                 fillOpacity={1}
//                 fill="url(#collectedAmount)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
//     </WidgetCard>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@components/cards/widget-card';
import { DatePicker } from '@ui/datepicker';
import { Badge, Text } from 'rizzui';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine,
} from 'recharts';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import { useMedia } from '@hooks/use-media';
import SimpleBar from '@ui/simplebar';
import axios from '@/axiosInstance'; // Custom Axios instance with token configuration

interface Invoice {
  id: number;
  issuedate: string;
  total_amount: number;
}

interface Payment {
  id: number;
  amount: number;
  payment_date: string;
}

interface ApiResponse {
  invoices: Invoice[];
  payments: Payment[];
}

export default function SalesOverview({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 820px)', false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchInvoicePaymentData();
  }, []);

  const fetchInvoicePaymentData = async () => {
    try {
      const response = await axios.get<ApiResponse>('/invoices/invoice_payment_card/');
      const { invoices, payments } = response.data;

      // Grouping invoices and payments by month
      const chartData = transformData(invoices, payments);
      setData(chartData);
    } catch (error) {
      console.error('Error fetching invoice/payment data:', error);
    }
  };

  const transformData = (invoices: Invoice[], payments: Payment[]) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const monthlyTotals: Record<string, { invoiceTotal: number; collectedAmount: number }> = {};

    // Initialize each month with 0 values
    monthNames.forEach((month) => {
      monthlyTotals[month] = { invoiceTotal: 0, collectedAmount: 0 };
    });

    // Aggregate invoices, ensuring no negative values
    invoices.forEach((invoice) => {
      const month = monthNames[new Date(invoice.issuedate).getMonth()];
      monthlyTotals[month].invoiceTotal += Math.max(invoice.total_amount, 0);
    });

    // Aggregate payments, ensuring no negative values
    payments.forEach((payment) => {
      const month = monthNames[new Date(payment.payment_date).getMonth()];
      monthlyTotals[month].collectedAmount += Math.max(payment.amount, 0);
    });

    // Convert to chart-compatible format
    return monthNames.map((month) => ({
      month,
      invoiceTotal: monthlyTotals[month].invoiceTotal,
      collectedAmount: monthlyTotals[month].collectedAmount,
    }));
  };

  return (
    <WidgetCard
      title="Payment Details"
      description={
        <>
          <Badge renderAsDot className="ms-1 bg-[#10b981]" />
          <Text as="span" className="hidden xs:inline-flex">Total Invoice Amount</Text>
          <Badge renderAsDot className="me-1 ms-4 bg-[#0470f2]" /> 
          <Text as="span" className="hidden xs:inline-flex">Collected Amount</Text>
        </>
      }
      descriptionClassName="text-gray-500 mt-1.5"
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="yyyy"
          placeholderText="Select Year"
          showYearPicker
          inputProps={{ variant: 'text', inputClassName: 'p-0 px-1 h-auto' }}
          popperPlacement="bottom-end"
          className="w-[100px]"
        />
      }
      className={className}
    >
      <SimpleBar>
        <div className="h-[400px] w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <AreaChart
              data={data}
              margin={{ left: -16 }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="invoiceTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffdadf" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="collectedAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="invoiceTotal"
                stroke="#10b981"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#invoiceTotal)"
              />
              <Area
                type="monotone"
                dataKey="collectedAmount"
                stroke="#3872FA"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#collectedAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
