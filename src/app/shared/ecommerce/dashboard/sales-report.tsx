

'use client';

import WidgetCard from '@components/cards/widget-card';
import {
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { Badge } from 'rizzui';
import cn from '@utils/class-names';
import { useMedia } from '@hooks/use-media';
import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import ButtonGroupAction from '@components/charts/button-group-action';
import SimpleBar from '@ui/simplebar';

const data = [
  {
    month: 'Jan',
    totalCreditSale: 5000,
    withinDue: 3000,
    overdue: 2000,
  },
  {
    month: 'Feb',
    totalCreditSale: 4600,
    withinDue: 2500,
    overdue: 2100,
  },
  {
    month: 'Mar',
    totalCreditSale: 5900,
    withinDue: 4000,
    overdue: 1900,
  },
  {
    month: 'Apr',
    totalCreditSale: 5780,
    withinDue: 3500,
    overdue: 2280,
  },
  {
    month: 'May',
    totalCreditSale: 4890,
    withinDue: 2700,
    overdue: 2190,
  },
  {
    month: 'Jun',
    totalCreditSale: 8000,
    withinDue: 5000,
    overdue: 3000,
  },
  {
    month: 'Jul',
    totalCreditSale: 4890,
    withinDue: 2800,
    overdue: 2090,
  },
  {
    month: 'Aug',
    totalCreditSale: 3780,
    withinDue: 2200,
    overdue: 1580,
  },
  {
    month: 'Sep',
    totalCreditSale: 7800,
    withinDue: 4900,
    overdue: 2900,
  },
  {
    month: 'Oct',
    totalCreditSale: 5780,
    withinDue: 3000,
    overdue: 2780,
  },
  {
    month: 'Nov',
    totalCreditSale: 2780,
    withinDue: 1500,
    overdue: 1280,
  },
  {
    month: 'Dec',
    totalCreditSale: 7500,
    withinDue: 4000,
    overdue: 3500,
  },
];

const filterOptions = ['Week', 'Month', 'Year'];

export default function CreditSalesChart({
  className,
}: {
  className?: string;
}) {
  const isMediumScreen = useMedia('(max-width: 1200px)', false);
  const isTablet = useMedia('(max-width: 800px)', false);

  function handleFilterBy(data: string) {
    console.log('Credit Sales Filter:', data);
  }

  return (
    <WidgetCard
      title={'Account Receivable'}
      description={
        <>
          <Badge
            renderAsDot
            className="me-0.5 bg-[#3b82f6]"
          />{' '}
          Total Credit Sales
          <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
          <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
        </>
      }
      descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
      action={
        <ButtonGroupAction
          options={filterOptions}
          onChange={(data) => handleFilterBy(data)}
          className="-ms-2 mb-3 @lg:mb-0 @lg:ms-0"
        />
      }
      headerClassName="flex-col @lg:flex-row"
      rounded="lg"
      className={className}
    >
      <SimpleBar>
        <div className={cn('h-[420px] w-full pt-9 @7xl:h-[480px]')}>
          <ResponsiveContainer
            width="100%"
            {...(isTablet && { minWidth: '700px' })}
            height="100%"
          >
            <ComposedChart
              data={data}
              barSize={isMediumScreen ? 20 : 28}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <defs>
                <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#10b981"
                    className=" [stop-opacity:0.2]"
                  />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="withinDue"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#creditSalesArea)"
              />
              <Bar
                dataKey="totalCreditSale"
                fill="#3b82f6"
                {...(isTablet
                  ? { stackId: 'salesMetrics' }
                  : { radius: [4, 4, 0, 0] })}
              />
              <Bar
                dataKey="overdue"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
                {...(isTablet && { stackId: 'salesMetrics' })}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}



// 'use client';

// import React, { useEffect, useState } from 'react';
// import axiosInstance from '@/axiosInstance'; // Ensure you have your axios instance imported
// import WidgetCard from '@components/cards/widget-card';
// import {
//   Area,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ComposedChart,
//   ResponsiveContainer,
// } from 'recharts';
// import { Badge } from 'rizzui';
// import cn from '@utils/class-names';
// import { useMedia } from '@hooks/use-media';
// import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import ButtonGroupAction from '@components/charts/button-group-action';
// import SimpleBar from '@ui/simplebar';

// export default function CreditSalesChart({
//   // className,
//   // invoiceId, // Assume you'll pass the invoice ID as a prop
// }: {
//   className?: string;
//   invoiceId: string; // Type for invoice ID
// }) {
//   const [data, setData] = useState([]); // State to hold chart data
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);
//   const isTablet = useMedia('(max-width: 800px)', false);
//   const filterOptions = ['Week', 'Month', 'Year'];

//   useEffect(() => {
//     const fetchData = async () => {

      
//       try {
//         // Fetching invoice details
//         const response = await axiosInstance.get(`/invoices/credit_sales_card_data/`);
//         // Assuming the response data is structured correctly for your chart
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching invoice details:', error);
//       }
//     };

//     fetchData();
//   }, [invoiceId]); // Re-fetch if invoiceId changes

//   function handleFilterBy(data: string) {
//     console.log('Credit Sales Filter:', data);
//   }

//   return (
//     <WidgetCard
//       title={'Account Receivable'}
//       description={
//         <>
//           <Badge
//             renderAsDot
//             className="me-0.5 bg-[#3b82f6]"
//           />{' '}
//           Total Credit Sales
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
//         </>
//       }
//       descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
//       action={
//         <ButtonGroupAction
//           options={filterOptions}
//           onChange={(data) => handleFilterBy(data)}
//           className="-ms-2 mb-3 @lg:mb-0 @lg:ms-0"
//         />
//       }
//       headerClassName="flex-col @lg:flex-row"
//       rounded="lg"
//       className={className}
//     >
//       <SimpleBar>
//         <div className={cn('h-[420px] w-full pt-9 @7xl:h-[480px]')}>
//           <ResponsiveContainer
//             width="100%"
//             {...(isTablet && { minWidth: '700px' })}
//             height="100%"
//           >
//             <ComposedChart
//               data={data}
//               barSize={isMediumScreen ? 20 : 28}
//               className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//             >
//               <defs>
//                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                   <stop
//                     offset="5%"
//                     stopColor="#10b981"
//                     className=" [stop-opacity:0.2]"
//                   />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="month" axisLine={false} tickLine={false} />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={<CustomYAxisTick />}
//               />
//               <Tooltip content={<CustomTooltip />} />
//               <Area
//                 type="monotone"
//                 dataKey="withinDue"
//                 stroke="#10b981"
//                 strokeWidth={2}
//                 fillOpacity={1}
//                 fill="url(#creditSalesArea)"
//               />
//               <Bar
//                 dataKey="totalCreditSale"
//                 fill="#3b82f6"
//                 {...(isTablet
//                   ? { stackId: 'salesMetrics' }
//                   : { radius: [4, 4, 0, 0] })}
//               />
//               <Bar
//                 dataKey="overdue"
//                 fill="#f97316"
//                 radius={[4, 4, 0, 0]}
//                 {...(isTablet && { stackId: 'salesMetrics' })}
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
//     </WidgetCard>
//   );
// }