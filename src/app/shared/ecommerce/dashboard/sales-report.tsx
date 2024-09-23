// 'use client';

// import { useState } from 'react';
// import WidgetCard from '@components/cards/widget-card';
// import { DatePicker } from '@ui/datepicker';
// import {
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
//   ComposedChart,
// } from 'recharts';
// import { Badge } from 'rizzui';
// import { useMedia } from '@hooks/use-media';
// import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import SimpleBar from '@ui/simplebar';

// const data = [
//   {
//     month: 'Jan',
//     revenue: 5000,
//     expense: 1500,
//   },
//   {
//     month: 'Feb',
//     revenue: 4600,
//     expense: 3798,
//   },
//   {
//     month: 'Mar',
//     revenue: 5900,
//     expense: 1300,
//   },
//   {
//     month: 'Apr',
//     revenue: 5780,
//     expense: 3908,
//   },
//   {
//     month: 'May',
//     revenue: 4890,
//     expense: 2500,
//   },
//   {
//     month: 'Jun',
//     revenue: 8000,
//     expense: 3200,
//   },
//   {
//     month: 'Jul',
//     revenue: 4890,
//     expense: 2500,
//   },
//   {
//     month: 'Aug',
//     revenue: 3780,
//     expense: 3908,
//   },
//   {
//     month: 'Sep',
//     revenue: 7800,
//     expense: 2800,
//   },
//   {
//     month: 'Oct',
//     revenue: 5780,
//     expense: 1908,
//   },
//   {
//     month: 'Nov',
//     revenue: 2780,
//     expense: 3908,
//   },
//   {
//     month: 'Dec',
//     revenue: 7500,
//     expense: 3000,
//   },
// ];

// export default function SalesReport({ className }: { className?: string }) {
//   const isTablet = useMedia('(max-width: 820px)', false);
//   const [startDate, setStartDate] = useState<Date>(new Date());
//   return (
//     <WidgetCard
//       title={'Sales Report'}
//       description={
//         <>
//           <Badge renderAsDot className="me-0.5 bg-[#282ECA]" /> Revenue
//           <Badge
//             renderAsDot
//             className="me-0.5 ms-4 bg-[#B8C3E9] dark:bg-[#7c88b2]"
//           />{' '}
//           Expense
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
//         <div className="h-96 w-full pt-9">
//           <ResponsiveContainer
//             width="100%"
//             height="100%"
//             {...(isTablet && { minWidth: '700px' })}
//           >
//             <ComposedChart
//               data={data}
//               barSize={isTablet ? 20 : 24}
//               className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
//             >
//               <defs>
//                 <linearGradient id="salesReport" x1="0" y1="0" x2="0" y2="1">
//                   <stop
//                     offset="5%"
//                     stopColor="#F0F1FF"
//                     className=" [stop-opacity:0.1]"
//                   />
//                   <stop offset="95%" stopColor="#8200E9" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
//               <XAxis dataKey="month" axisLine={false} tickLine={false} />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={<CustomYAxisTick prefix={'$'} />}
//               />
//               <Tooltip
//                 content={
//                   <CustomTooltip className="[&_.chart-tooltip-item:last-child]:hidden" />
//                 }
//               />
//               <Bar
//                 dataKey="revenue"
//                 fill="#282ECA"
//                 stackId="a"
//                 radius={[0, 0, 4, 4]}
//               />
//               <Bar
//                 dataKey="expense"
//                 stackId="a"
//                 fill="#B8C3E9"
//                 fillOpacity={0.9}
//                 radius={[4, 4, 0, 0]}
//               />
//               <Area
//                 type="bump"
//                 dataKey="revenue"
//                 stroke="#8200E9"
//                 strokeWidth={2}
//                 fillOpacity={1}
//                 fill="url(#salesReport)"
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
//     </WidgetCard>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import WidgetCard from '@components/cards/widget-card';
// import { DatePicker } from '@ui/datepicker';
// import {
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
//   ComposedChart,
// } from 'recharts';
// import { Badge } from 'rizzui';
// import { useMedia } from '@hooks/use-media';
// import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import SimpleBar from '@ui/simplebar';

// const data = [
//   {
//     month: 'Jan',
//     totalCreditSale: 5000,
//     withinDue: 3000,
//     overdue: 2000,
//   },
//   {
//     month: 'Feb',
//     totalCreditSale: 4600,
//     withinDue: 2500,
//     overdue: 2100,
//   },
//   {
//     month: 'Mar',
//     totalCreditSale: 5900,
//     withinDue: 4000,
//     overdue: 1900,
//   },
//   {
//     month: 'Apr',
//     totalCreditSale: 5780,
//     withinDue: 3500,
//     overdue: 2280,
//   },
//   {
//     month: 'May',
//     totalCreditSale: 4890,
//     withinDue: 2700,
//     overdue: 2190,
//   },
//   {
//     month: 'Jun',
//     totalCreditSale: 8000,
//     withinDue: 5000,
//     overdue: 3000,
//   },
//   {
//     month: 'Jul',
//     totalCreditSale: 4890,
//     withinDue: 2800,
//     overdue: 2090,
//   },
//   {
//     month: 'Aug',
//     totalCreditSale: 3780,
//     withinDue: 2200,
//     overdue: 1580,
//   },
//   {
//     month: 'Sep',
//     totalCreditSale: 7800,
//     withinDue: 4900,
//     overdue: 2900,
//   },
//   {
//     month: 'Oct',
//     totalCreditSale: 5780,
//     withinDue: 3000,
//     overdue: 2780,
//   },
//   {
//     month: 'Nov',
//     totalCreditSale: 2780,
//     withinDue: 1500,
//     overdue: 1280,
//   },
//   {
//     month: 'Dec',
//     totalCreditSale: 7500,
//     withinDue: 4000,
//     overdue: 3500,
//   },
// ];

// export default function CreditSalesReport({
//   className,
// }: {
//   className?: string;
// }) {
//   const isTablet = useMedia('(max-width: 820px)', false);
//   const [startDate, setStartDate] = useState<Date>(new Date());
  
//   // Custom Tooltip Function
//   const renderTooltipContent = (props: any) => {
//     if (props.active && props.payload && props.payload.length) {
//       const { payload } = props;
//       return (
//         <div className="custom-tooltip">
//           <p className="label">{`Month: ${payload[0].payload.month}`}</p>
//           <p className="intro">{`Total Credit Sale: $${payload[0].payload.totalCreditSale}`}</p>
//           <p className="intro">{`Within Due: $${payload[0].payload.withinDue}`}</p>
//           <p className="intro">{`Overdue: $${payload[0].payload.overdue}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <WidgetCard
//       title={'Credit Sales Report'}
//       description={
//         <>
//           <Badge renderAsDot className="me-0.5 bg-[#282ECA]" /> Total Credit Sale
//           <Badge
//             renderAsDot
//             className="me-0.5 ms-4 bg-[#7C9B6D]"
//           />{' '}
//           Within Due
//           <Badge
//             renderAsDot
//             className="me-0.5 ms-4 bg-[#F56476]"
//           />{' '}
//           Overdue
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
//         <div className="h-96 w-full pt-9">
//           <ResponsiveContainer
//             width="100%"
//             height="100%"
//             {...(isTablet && { minWidth: '700px' })}
//           >
//             <ComposedChart
//               data={data}
//               barSize={isTablet ? 20 : 24}
//               className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
//             >
//               <defs>
//                 <linearGradient id="totalCreditSale" x1="0" y1="0" x2="0" y2="1">
//                   <stop
//                     offset="5%"
//                     stopColor="#F0F1FF"
//                     className=" [stop-opacity:0.1]"
//                   />
//                   <stop offset="95%" stopColor="#282ECA" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="withinDue" x1="0" y1="0" x2="0" y2="1">
//                   <stop
//                     offset="5%"
//                     stopColor="#C6F6D5"
//                     className=" [stop-opacity:0.1]"
//                   />
//                   <stop offset="95%" stopColor="#7C9B6D" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="overdue" x1="0" y1="0" x2="0" y2="1">
//                   <stop
//                     offset="5%"
//                     stopColor="#FEE2E2"
//                     className=" [stop-opacity:0.1]"
//                   />
//                   <stop offset="95%" stopColor="#F56476" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
//               <XAxis dataKey="month" axisLine={false} tickLine={false} />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={<CustomYAxisTick prefix={'$'} />}
//               />
//               <Tooltip
//                 content={<CustomTooltip className="[&_.chart-tooltip-item:last-child]:hidden" />}
//                 formatter={(value: any, name: string) => [value, name]}
//               />
//               <Bar
//                 dataKey="totalCreditSale"
//                 fill="#282ECA"
//                 stackId="a"
//                 radius={[0, 0, 4, 4]}
//               />
//               <Bar
//                 dataKey="withinDue"
//                 stackId="a"
//                 fill="#7C9B6D"
//                 fillOpacity={0.9}
//                 radius={[4, 4, 0, 0]}
//               />
//               <Bar
//                 dataKey="overdue"
//                 stackId="a"
//                 fill="#F56476"
//                 fillOpacity={0.9}
//                 radius={[4, 4, 0, 0]}
//               />
//               <Area
//                 type="bump"
//                 dataKey="totalCreditSale"
//                 stroke="#282ECA"
//                 strokeWidth={2}
//                 fillOpacity={1}
//                 fill="url(#totalCreditSale)"
//               />
//               <Area
//                 type="bump"
//                 dataKey="withinDue"
//                 stroke="#7C9B6D"
//                 strokeWidth={2}
//                 fillOpacity={1}
//                 fill="url(#withinDue)"
//               />
//               <Area
//                 type="bump"
//                 dataKey="overdue"
//                 stroke="#F56476"
//                 strokeWidth={2}
//                 fillOpacity={1}
//                 fill="url(#overdue)"
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
//     </WidgetCard>
//   );
// }


// 'use client';

// import WidgetCard from '@components/cards/widget-card';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import { useMedia } from '@hooks/use-media';

// const data = [
//   {
//     month: 'Jan',
//     totalCreditSale: 5000,
//     withinDue: 3000,
//     overdue: 2000,
//   },
//   {
//     month: 'Feb',
//     totalCreditSale: 4600,
//     withinDue: 2500,
//     overdue: 2100,
//   },
//   {
//     month: 'Mar',
//     totalCreditSale: 5900,
//     withinDue: 4000,
//     overdue: 1900,
//   },
//   {
//     month: 'Apr',
//     totalCreditSale: 5780,
//     withinDue: 3500,
//     overdue: 2280,
//   },
//   {
//     month: 'May',
//     totalCreditSale: 4890,
//     withinDue: 2700,
//     overdue: 2190,
//   },
//   {
//     month: 'Jun',
//     totalCreditSale: 8000,
//     withinDue: 5000,
//     overdue: 3000,
//   },
//   {
//     month: 'Jul',
//     totalCreditSale: 4890,
//     withinDue: 2800,
//     overdue: 2090,
//   },
//   {
//     month: 'Aug',
//     totalCreditSale: 3780,
//     withinDue: 2200,
//     overdue: 1580,
//   },
//   {
//     month: 'Sep',
//     totalCreditSale: 7800,
//     withinDue: 4900,
//     overdue: 2900,
//   },
//   {
//     month: 'Oct',
//     totalCreditSale: 5780,
//     withinDue: 3000,
//     overdue: 2780,
//   },
//   {
//     month: 'Nov',
//     totalCreditSale: 2780,
//     withinDue: 1500,
//     overdue: 1280,
//   },
//   {
//     month: 'Dec',
//     totalCreditSale: 7500,
//     withinDue: 4000,
//     overdue: 3500,
//   },
// ];

// export default function CreditSalesReport({ className }: { className?: string }) {
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);

//   return (
//     <WidgetCard title={'Credit Sales Report'} className={className}>
//       <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             barSize={isMediumScreen ? 18 : 24}
//             margin={{ left: -10 }}
//             className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis tickLine={false} dataKey="month" />
//             <YAxis tickLine={false} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar
//               dataKey="totalCreditSale"
//               stackId="a"
//               fill="#282ECA"
//               radius={[0, 0, 4, 4]}
//             />
//             <Bar
//               dataKey="withinDue"
//               stackId="a"
//               fill="#7C9B6D"
//               radius={[4, 4, 0, 0]}
//             />
//             <Bar
//               dataKey="overdue"
//               stackId="a"
//               fill="#F56476"
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </WidgetCard>
//   );
// }




// 'use client';

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

// const data = [
//   {
//     month: 'Jan',
//     totalCreditSale: 5000,
//     withinDue: 3000,
//     overdue: 2000,
//   },
//   {
//     month: 'Feb',
//     totalCreditSale: 4600,
//     withinDue: 2500,
//     overdue: 2100,
//   },
//   {
//     month: 'Mar',
//     totalCreditSale: 5900,
//     withinDue: 4000,
//     overdue: 1900,
//   },
//   {
//     month: 'Apr',
//     totalCreditSale: 5780,
//     withinDue: 3500,
//     overdue: 2280,
//   },
//   {
//     month: 'May',
//     totalCreditSale: 4890,
//     withinDue: 2700,
//     overdue: 2190,
//   },
//   {
//     month: 'Jun',
//     totalCreditSale: 8000,
//     withinDue: 5000,
//     overdue: 3000,
//   },
//   {
//     month: 'Jul',
//     totalCreditSale: 4890,
//     withinDue: 2800,
//     overdue: 2090,
//   },
//   {
//     month: 'Aug',
//     totalCreditSale: 3780,
//     withinDue: 2200,
//     overdue: 1580,
//   },
//   {
//     month: 'Sep',
//     totalCreditSale: 7800,
//     withinDue: 4900,
//     overdue: 2900,
//   },
//   {
//     month: 'Oct',
//     totalCreditSale: 5780,
//     withinDue: 3000,
//     overdue: 2780,
//   },
//   {
//     month: 'Nov',
//     totalCreditSale: 2780,
//     withinDue: 1500,
//     overdue: 1280,
//   },
//   {
//     month: 'Dec',
//     totalCreditSale: 7500,
//     withinDue: 4000,
//     overdue: 3500,
//   },
// ];

// const filterOptions = ['Week', 'Month', 'Year'];

// export default function CreditSalesChart({
//   className,
// }: {
//   className?: string;
// }) {
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);
//   const isTablet = useMedia('(max-width: 800px)', false);

//   function handleFilterBy(data: string) {
//     console.log('Credit Sales Filter:', data);
//   }

//   return (
//     <WidgetCard
//       title={'Credit Sales Report'}
//       description={
//         <>
//           <Badge
//             renderAsDot
//             className="me-0.5 bg-[#282ECA]"
//           />{' '}
//           Total Credit Sales
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#7C9B6D]" /> Within Due
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#F56476]" /> Overdue
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
//               className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500  [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//             >
//               <defs>
//                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                   <stop
//                     offset="5%"
//                     stopColor="#F0F1FF"
//                     className=" [stop-opacity:0.2]"
//                   />
//                   <stop offset="95%" stopColor="#F56476" stopOpacity={0} />
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
//                 type="step"
//                 dataKey="withinDue"
//                 stroke="#7C9B6D"
//                 strokeWidth={2}
//                 fillOpacity={1}
//                 fill="url(#creditSalesArea)"
//               />
//               <Bar
//                 dataKey="totalCreditSale"
//                 fill="#282ECA"
//                 {...(isTablet
//                   ? { stackId: 'salesMetrics' }
//                   : { radius: [4, 4, 0, 0] })}
//               />
//               <Bar
//                 dataKey="overdue"
//                 fill="#F56476"
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