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
//     newCustomer: 2000,
//     oldCustomer: 1000,
//   },
//   {
//     month: 'Feb',
//     newCustomer: 4200,
//     oldCustomer: 2798,
//   },
//   {
//     month: 'Mar',
//     newCustomer: 5000,
//     oldCustomer: 4000,
//   },
//   {
//     month: 'Apr',
//     newCustomer: 5780,
//     oldCustomer: 3908,
//   },
//   {
//     month: 'May',
//     newCustomer: 4890,
//     oldCustomer: 2500,
//   },
//   {
//     month: 'Jun',
//     newCustomer: 8000,
//     oldCustomer: 5200,
//   },
//   {
//     month: 'Jul',
//     newCustomer: 4890,
//     oldCustomer: 6500,
//   },
//   {
//     month: 'Aug',
//     newCustomer: 3780,
//     oldCustomer: 4908,
//   },
//   {
//     month: 'Sep',
//     newCustomer: 7800,
//     oldCustomer: 2800,
//   },
//   {
//     month: 'Oct',
//     newCustomer: 5780,
//     oldCustomer: 1908,
//   },
//   {
//     month: 'Nov',
//     newCustomer: 2780,
//     oldCustomer: 3908,
//   },
//   {
//     month: 'Dec',
//     newCustomer: 7500,
//     oldCustomer: 3000,
//   },
// ];

// export default function RepeatCustomerRate({
//   className,
// }: {
//   className?: string;
// }) {
//   const isTablet = useMedia('(max-width: 820px)', false);
//   const [startDate, setStartDate] = useState<Date>(new Date());
//   return (
//     <WidgetCard
//       title={'Repeat Customer Rate'}
//       description={
//         <>
//           <Badge renderAsDot className=" ms-1 bg-[#10b981]" /> New
//           <Text as="span" className="hidden xs:inline-flex">
//             Customer
//           </Text>
//           <Badge renderAsDot className="me-1 ms-4 bg-[#0470f2]" /> Old{' '}
//           <Text as="span" className="hidden xs:inline-flex">
//             Customer
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
//         <div className="h-[480px] w-full pt-9">
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
//                 <linearGradient id="newCustomer" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#ffdadf" stopOpacity={0.1} />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="oldCustomer" x1="0" y1="0" x2="0" y2="1">
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
//                 dataKey="newCustomer"
//                 stroke="#10b981"
//                 strokeWidth={2.3}
//                 fillOpacity={1}
//                 fill="url(#newCustomer)"
//               />
//               <Area
//                 type="natural"
//                 dataKey="oldCustomer"
//                 stroke="#3872FA"
//                 strokeWidth={2.3}
//                 fillOpacity={1}
//                 fill="url(#oldCustomer)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
//     </WidgetCard>
//   );
// }


'use client';

import { useState } from 'react';
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
} from 'recharts';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import { useMedia } from '@hooks/use-media';
import SimpleBar from '@ui/simplebar';

const data = [
  {
    month: 'Jan',
    salesTotal: 2000,
    collectedAmount: 1000,
  },
  {
    month: 'Feb',
    salesTotal: 4200,
    collectedAmount: 2798,
  },
  {
    month: 'Mar',
    salesTotal: 5000,
    collectedAmount: 4000,
  },
  {
    month: 'Apr',
    salesTotal: 5780,
    collectedAmount: 3908,
  },
  {
    month: 'May',
    salesTotal: 4890,
    collectedAmount: 2500,
  },
  {
    month: 'Jun',
    salesTotal: 8000,
    collectedAmount: 5200,
  },
  {
    month: 'Jul',
    salesTotal: 4890,
    collectedAmount: 6500,
  },
  {
    month: 'Aug',
    salesTotal: 3780,
    collectedAmount: 4908,
  },
  {
    month: 'Sep',
    salesTotal: 7800,
    collectedAmount: 2800,
  },
  {
    month: 'Oct',
    salesTotal: 5780,
    collectedAmount: 1908,
  },
  {
    month: 'Nov',
    salesTotal: 2780,
    collectedAmount: 3908,
  },
  {
    month: 'Dec',
    salesTotal: 7500,
    collectedAmount: 3000,
  },
];

export default function SalesOverview({
  className,
}: {
  className?: string;
}) {
  const isTablet = useMedia('(max-width: 820px)', false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <WidgetCard
      title={'Sales Overview'}
      description={
        <>
          <Badge renderAsDot className="ms-1 bg-[#10b981]" /> 
          <Text as="span" className="hidden xs:inline-flex">
            Total Sales
          </Text>
          <Badge renderAsDot className="me-1 ms-4 bg-[#0470f2]" /> Collected{' '}
          <Text as="span" className="hidden xs:inline-flex">
            Amount
          </Text>
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
        <div className="h-[480px] w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <AreaChart
              data={data}
              margin={{
                left: -16,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="salesTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffdadf" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="collectedAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className=" "
              />
              <YAxis axisLine={false} tickLine={false} className=" " />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="natural"
                dataKey="salesTotal"
                stroke="#10b981"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#salesTotal)"
              />
              <Area
                type="natural"
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

