

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
// import { useEffect, useState } from 'react';
// import axios from '@/axiosInstance'; // Ensure this matches your Axios instance setup

// const filterOptions = ['Week', 'Month', 'Year'];

// export default function CreditSalesChart({
//   className,
// }: {
//   className?: string;
// }) {
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);
//   const isTablet = useMedia('(max-width: 800px)', false);

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch data from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/invoices/credit_sales_card_data/');
//         const transformedData = transformData(response.data.data);
//         setChartData(transformedData);
//       } catch (err) {
//         setError('Failed to load credit sales data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Transform API data to match the chart format
//   // function transformData(apiData: any[]) {
//   //   return apiData.map((item) => ({
//   //     month: new Date(item.month_start).toLocaleString('default', { month: 'short' }),
//   //     totalCreditSale: item.totalCreditSale,
//   //     withinDue: item.withinDue,
//   //     overdue: item.overdue,
//   //   }));
//   // }

//   // Transform API data to match the chart format
// function transformData(apiData: any[]) {
//   return apiData.map((item) => {
//     const date = new Date(item.month_start);
//     const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`; // e.g., "Oct 2024"
    
//     return {
//       month: monthYear,
//       totalCreditSale: item.totalCreditSale,
//       withinDue: item.withinDue,
//       overdue: item.overdue,
//     };
//   });
// }


//   function handleFilterBy(data: string) {
//     console.log('Credit Sales Filter:', data);
//   }

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <WidgetCard
//       title="Account Receivable"
//       description={
//         <>
//           <Badge renderAsDot className="me-0.5 bg-[#3b82f6]" /> Total Credit Sales
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
//         </>
//       }
//       descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
//       action={
//         <ButtonGroupAction
//           options={filterOptions}
//           onChange={handleFilterBy}
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
//               data={chartData}
//               barSize={isMediumScreen ? 20 : 28}
//               className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//             >
//               <defs>
//                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#10b981" className="[stop-opacity:0.2]" />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="month" axisLine={false} tickLine={false} />
//               <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
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
//                 {...(isTablet ? { stackId: 'salesMetrics' } : { radius: [4, 4, 0, 0] })}
//               />
//               <Bar dataKey="overdue" fill="#f97316" radius={[4, 4, 0, 0]} />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
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
// import { useEffect, useState } from 'react';
// import axios from '@/axiosInstance'; // Ensure this matches your Axios instance setup
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const filterOptions = ['Week', 'Month', 'Year'];

// export default function CreditSalesChart({
//   className,
// }: {
//   className?: string;
// }) {
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);
//   const isTablet = useMedia('(max-width: 800px)', false);

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);

//   // Fetch data from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/invoices/credit_sales_card_data/', {
//           params: {
//             start_date: startDate ? startDate.toISOString() : undefined,
//             end_date: endDate ? endDate.toISOString() : undefined,
//           },
//         });
//         const transformedData = transformData(response.data.data);
//         setChartData(transformedData);
//       } catch (err) {
//         setError('Failed to load credit sales data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [startDate, endDate]); // Re-fetch data when dates change

//   // Transform API data to match the chart format
//   function transformData(apiData: any[]) {
//     return apiData.map((item) => {
//       const date = new Date(item.month_start);
//       const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`; // e.g., "Oct 2024"
      
//       return {
//         month: monthYear,
//         totalCreditSale: item.totalCreditSale,
//         withinDue: item.withinDue,
//         overdue: item.overdue,
//       };
//     });
//   }

//   function handleFilterBy(data: string) {
//     console.log('Credit Sales Filter:', data);
//   }

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <WidgetCard
//       title="Account Receivable"
//       description={
//         <>
//           <Badge renderAsDot className="me-0.5 bg-[#3b82f6]" /> Total Credit Sales
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
//         </>
//       }
//       descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
//       action={
//         <>
//           <ButtonGroupAction
//             options={filterOptions}
//             onChange={handleFilterBy}
//             className="-ms-2 mb-3 @lg:mb-0 @lg:ms-0"
//           />
//           <div className="flex gap-2">
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               className="border rounded p-1"
//               placeholderText="Start Date"
//             />
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               className="border rounded p-1"
//               placeholderText="End Date"
//             />
//           </div>
//         </>
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
//               data={chartData}
//               barSize={isMediumScreen ? 20 : 28}
//               className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//             >
//               <defs>
//                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#10b981" className="[stop-opacity:0.2]" />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="month" axisLine={false} tickLine={false} />
//               <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
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
//                 {...(isTablet ? { stackId: 'salesMetrics' } : { radius: [4, 4, 0, 0] })}
//               />
//               <Bar dataKey="overdue" fill="#f97316" radius={[4, 4, 0, 0]} />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
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
// import { useEffect, useState } from 'react';
// import axios from '@/axiosInstance';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const filterOptions = ['Week', 'Month', 'Year'];

// export default function CreditSalesChart({
//   className,
// }: {
//   className?: string;
// }) {
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);
//   const isTablet = useMedia('(max-width: 800px)', false);

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('/invoices/credit_sales_card_data/', {
//           params: {
//             start_date: startDate ? startDate.toISOString() : undefined,
//             end_date: endDate ? endDate.toISOString() : undefined,
//           },
//         });
//         const transformedData = transformData(response.data.data);
//         setChartData(transformedData);
//         setError(null);
//       } catch (err) {
//         setError('Failed to load credit sales data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [startDate, endDate]);

//   function transformData(apiData: any[]) {
//     return apiData.map((item) => {
//       const date = new Date(item.month_start);
//       const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
//       return {
//         month: monthYear,
//         totalCreditSale: item.totalCreditSale,
//         withinDue: item.withinDue,
//         overdue: item.overdue,
//       };
//     });
//   }

//   function handleFilterBy(data: string) {
//     console.log('Credit Sales Filter:', data);
//   }

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <WidgetCard
//       title="Account Receivable"
//       description={
//         <>
//           <Badge renderAsDot className="me-0.5 bg-[#3b82f6]" /> Total Credit Sales
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
//         </>
//       }
//       descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
//       action={
//         <>
//           <ButtonGroupAction
//             options={filterOptions}
//             onChange={handleFilterBy}
//             className="-ms-2 mb-3 @lg:mb-0 @lg:ms-0"
//           />
//           <div className="flex gap-2">
//             <DatePicker
//               selected={startDate}
//               onChange={(date: Date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               className="border rounded p-1"
//               placeholderText="Start Date"
//             />
//             <DatePicker
//               selected={endDate}
//               onChange={(date: Date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               className="border rounded p-1"
//               placeholderText="End Date"
//             />
//           </div>
//         </>
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
//               data={chartData}
//               barSize={isMediumScreen ? 20 : 28}
//               className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//             >
//               <defs>
//                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#10b981" className="[stop-opacity:0.2]" />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="month" axisLine={false} tickLine={false} />
//               <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
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
//                 {...(isTablet ? { stackId: 'salesMetrics' } : { radius: [4, 4, 0, 0] })}
//               />
//               <Bar dataKey="overdue" fill="#f97316" radius={[4, 4, 0, 0]} />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
//     </WidgetCard>
//   );
// }



// Updated logic 

// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from '@/axiosInstance';
// import WidgetCard from '@components/cards/widget-card';
// import { Area, Bar, XAxis, YAxis, Tooltip, ComposedChart, ResponsiveContainer } from 'recharts';
// import { Badge } from 'rizzui';
// import cn from '@utils/class-names';
// import { useMedia } from '@hooks/use-media';
// import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import ButtonGroupAction from '@components/charts/button-group-action';
// import SimpleBar from '@ui/simplebar';
// import DatePicker from "src/app/shared/datepicker.tsx";

// const filterOptions = ['Week', 'Month', 'Year'];

// export default function CreditSalesChart({ className }: { className?: string }) {
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);
//   const isTablet = useMedia('(max-width: 800px)', false);

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [viewMode, setViewMode] = useState('monthly');

//   useEffect(() => {
//     fetchData();
//   }, [startDate, endDate, viewMode]);

//   // const fetchData = async () => {
//   //   setLoading(true);
//   //   try {
//   //     let url = '/invoices/credit_sales_card_data/';
//   //     let params: any = {};

//   //     if (startDate && endDate) {
//   //       params.start_date = startDate.toISOString().split('T')[0];
//   //       params.end_date = endDate.toISOString().split('T')[0];
//   //     }

//   //     const response = await axios.get(url, { params });
//   //     const transformedData = transformData(response.data.data || [response.data]);
//   //     setChartData(transformedData);
//   //     setError(null);
//   //   } catch (err) {
//   //     setError('Failed to load credit sales data');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const transformData = (apiData) => {
//   //   return apiData.map((item) => ({
//   //     date: item.month_start || item.issuedate,
//   //     totalCreditSale: item.totalCreditSale,
//   //     withinDue: item.withinDue,
//   //     overdue: item.overdue,
//   //   }));
//   // };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       let url = '/invoices/credit_sales_card_data/';
//       let params: any = {};

//       if (startDate && endDate) {
//         params.start_date = startDate.toISOString().split('T')[0];
//         params.end_date = endDate.toISOString().split('T')[0];
//       }

//       const response = await axios.get(url, { params });
//       const transformedData = transformData(response.data.data);
//       setChartData(transformedData);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load credit sales data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const transformData = (apiData) => {
//     return apiData.map((item) => ({
//       date: item.start_date, // or you could use `${item.start_date} to ${item.end_date}`
//       totalCreditSale: item.totalCreditSale,
//       withinDue: item.withinDue,
//       overdue: item.overdue,
//     }));
//   };

//   const handleFilterBy = (filter) => {
//     setViewMode(filter.toLowerCase());
//     // Reset date range when changing view mode
//     setStartDate(null);
//     setEndDate(null);
//   };

//   const handleRangeChange = (dates: [Date | null, Date | null]) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <WidgetCard
//       title="Account Receivable"
//       description={
//         <>
//           <Badge renderAsDot className="me-0.5 bg-[#3b82f6]" /> Total Credit Sales
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
//           <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
//         </>
//       }
//       descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
//       action={
//         <>
//           <ButtonGroupAction
//             options={filterOptions}
//             onChange={handleFilterBy}
//             className="-ms-2 mb-3 @lg:mb-0 @lg:ms-0"
//           />
//           <DatePicker
//             selected={startDate}
//             onChange={handleRangeChange}
//             startDate={startDate}
//             endDate={endDate}
//             monthsShown={2}
//             placeholderText="Select Date in a Range"
//             selectsRange
//             inputProps={{
//               clearable: true,
//               onClear: () => {
//                 setStartDate(null);
//                 setEndDate(null);
//               },
//             }}
//           />
//         </>
//       }
//       headerClassName="flex-col @lg:flex-row"
//       rounded="lg"
//       className={className}
//     >
//       <SimpleBar>
//         <div className={cn('h-[420px] w-full pt-9 @7xl:h-[480px]')}>
//           <ResponsiveContainer width="100%" height="100%" {...(isTablet && { minWidth: '700px' })}>
//             <ComposedChart
//               data={chartData}
//               barSize={isMediumScreen ? 20 : 28}
//               className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//             >
//               <defs>
//                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#10b981" className="[stop-opacity:0.2]" />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="date" axisLine={false} tickLine={false} />
//               <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
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
//                 {...(isTablet ? { stackId: 'salesMetrics' } : { radius: [4, 4, 0, 0] })}
//               />
//               <Bar dataKey="overdue" fill="#f97316" radius={[4, 4, 0, 0]} />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </SimpleBar>
//     </WidgetCard>
//   );
// }


// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from '@/axiosInstance';
// import WidgetCard from '@components/cards/widget-card';
// import { Area, Bar, XAxis, YAxis, Tooltip, ComposedChart, ResponsiveContainer } from 'recharts';
// import { Badge } from 'rizzui';
// import cn from '@utils/class-names';
// import { useMedia } from '@hooks/use-media';
// import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import ButtonGroupAction from '@components/charts/button-group-action';
// import SimpleBar from '@ui/simplebar';
// import DatePicker from "src/app/shared/datepicker.tsx";

// const filterOptions = ['Week', 'Month', 'Year'];

// export default function CreditSalesChart({ className }: { className?: string }) {
//     const isMediumScreen = useMedia('(max-width: 1200px)', false);
//     const isTablet = useMedia('(max-width: 800px)', false);

//     const [chartData, setChartData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);
//     const [viewMode, setViewMode] = useState('monthly');

//     useEffect(() => {
//         // Temporary fixed dates for testing
//         const tempStartDate = new Date();
//         tempStartDate.setDate(tempStartDate.getDate() - 30); // 30 days ago
//         const tempEndDate = new Date(); // Today

//         setStartDate(tempStartDate);
//         setEndDate(tempEndDate);
//     }, []);

//     useEffect(() => {
//         fetchData();
//     }, [startDate, endDate, viewMode]);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             let params: any = {};

//             // Set params only if both dates are selected
//             if (startDate && endDate) {
//                 params.start_date = startDate.toISOString().split('T')[0];
//                 params.end_date = endDate.toISOString().split('T')[0];
//             }

//             console.log('Fetching data with params:', params); // Log params
//             const response = await axios.get('/invoices/credit_sales_card_data/', { params });
//             console.log('API response:', response.data); // Log the response

//             const transformedData = transformData(response.data.data);
//             setChartData(transformedData);
//             setError(null);
//         } catch (err) {
//             if (axios.isAxiosError(err)) {
//                 console.error('Axios error:', err.response ? err.response.data : err.message);
//             } else {
//                 console.error('Unexpected error:', err);
//             }
//             setError('Failed to load credit sales data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const transformData = (apiData) => {
//         return apiData.map((item) => ({
//             date: item.start_date,
//             totalCreditSale: item.totalCreditSale,
//             withinDue: item.withinDue,
//             overdue: item.overdue,
//         }));
//     };

//     const handleFilterBy = (filter) => {
//         setViewMode(filter.toLowerCase());
//         // Reset date range when changing view mode
//         setStartDate(null);
//         setEndDate(null);
//     };

//     const handleRangeChange = (dates: [Date | null, Date | null]) => {
//         const [start, end] = dates;
//         setStartDate(start);
//         setEndDate(end);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <WidgetCard
//             title="Account Receivable"
//             description={
//                 <>
//                     <Badge renderAsDot className="me-0.5 bg-[#3b82f6]" /> Total Credit Sales
//                     <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
//                     <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
//                 </>
//             }
//             descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
//             action={
//                 <>
//                     <ButtonGroupAction
//                         options={filterOptions}
//                         onChange={handleFilterBy}
//                         className="-ms-2 mb-3 @lg:mb-0 @lg:ms-0"
//                     />
//                     <DatePicker
//                         selected={startDate}
//                         onChange={handleRangeChange}
//                         startDate={startDate}
//                         endDate={endDate}
//                         monthsShown={2}
//                         placeholderText="Select Date in a Range"
//                         selectsRange
//                         inputProps={{
//                             clearable: true,
//                             onClear: () => {
//                                 setStartDate(null);
//                                 setEndDate(null);
//                             },
//                         }}
//                     />
//                 </>
//             }
//             headerClassName="flex-col @lg:flex-row"
//             rounded="lg"
//             className={className}
//         >
//             <SimpleBar>
//                 <div className={cn('h-[420px] w-full pt-9 @7xl:h-[480px]')}>
//                     <ResponsiveContainer width="100%" height="100%" {...(isTablet && { minWidth: '700px' })}>
//                         <ComposedChart
//                             data={chartData}
//                             barSize={isMediumScreen ? 20 : 28}
//                             className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//                         >
//                             <defs>
//                                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                                     <stop offset="5%" stopColor="#10b981" className="[stop-opacity:0.2]" />
//                                     <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                                 </linearGradient>
//                             </defs>
//                             <XAxis dataKey="date" axisLine={false} tickLine={false} />
//                             <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
//                             <Tooltip content={<CustomTooltip />} />
//                             <Area
//                                 type="monotone"
//                                 dataKey="withinDue"
//                                 stroke="#10b981"
//                                 strokeWidth={2}
//                                 fillOpacity={1}
//                                 fill="url(#creditSalesArea)"
//                             />
//                             <Bar
//                                 dataKey="totalCreditSale"
//                                 fill="#3b82f6"
//                                 {...(isTablet ? { stackId: 'salesMetrics' } : { radius: [4, 4, 0, 0] })}
//                             />
//                             <Bar dataKey="overdue" fill="#f97316" radius={[4, 4, 0, 0]} />
//                         </ComposedChart>
//                     </ResponsiveContainer>
//                 </div>
//             </SimpleBar>
//         </WidgetCard>
//     );
// }



// 'use client';
// import React, { useState, useEffect } from 'react';

// import axios from 'axios';
// import { message } from 'antd';
// import { toast } from 'react-hot-toast';
// import axiosInstance from '@/axiosInstance';


// import WidgetCard from '@components/cards/widget-card';
// import { Area, Bar, XAxis, YAxis, Tooltip, ComposedChart, ResponsiveContainer } from 'recharts';
// import { Badge } from 'rizzui';
// import cn from '@utils/class-names';
// import { useMedia } from '@hooks/use-media';
// import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import ButtonGroupAction from '@components/charts/button-group-action';
// import SimpleBar from '@ui/simplebar';
// import DatePicker from "src/app/shared/datepicker.tsx";

// const filterOptions = ['Week', 'Month', 'Year'];

// export default function CreditSalesChart({ className }: { className?: string }) {
//     const isMediumScreen = useMedia('(max-width: 1200px)', false);
//     const isTablet = useMedia('(max-width: 800px)', false);

//     const [chartData, setChartData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);
//     const [viewMode, setViewMode] = useState('monthly');

//     useEffect(() => {
//         // Temporary fixed dates for testing
//         const tempStartDate = new Date();
//         tempStartDate.setDate(tempStartDate.getDate() - 30); // 30 days ago
//         const tempEndDate = new Date(); // Today

//         setStartDate(tempStartDate);
//         setEndDate(tempEndDate);
//     }, []);

//     useEffect(() => {
//         // Only fetch data if both startDate and endDate are set
//         if (startDate && endDate) {
//             fetchData();
//         }
//     }, [startDate, endDate, viewMode]);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             let params: any = {
//                 start_date: startDate.toISOString().split('T')[0],
//                 end_date: endDate.toISOString().split('T')[0],
//             };

//             console.log('Fetching data with params:', params); // Log params
//             const response = await axiosInstance.get('/invoices/credit_sales_card_data/', { params });
//             console.log('API response:', response.data); // Log the response

//             const transformedData = transformData(response.data.data);
//             setChartData(transformedData);
//             setError(null);
//         } catch (err) {
//             if (axios.isAxiosError(err)) {
//                 console.error('Axios error:', err.response ? err.response.data : err.message);
//             } else {
//                 console.error('Unexpected error:', err);
//             }
//             setError('Failed to load credit sales data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const transformData = (apiData) => {
//         return apiData.map((item) => ({
//             date: item.start_date,
//             totalCreditSale: item.totalCreditSale,
//             withinDue: item.withinDue,
//             overdue: item.overdue,
//         }));
//     };

//     const handleFilterBy = (filter) => {
//         setViewMode(filter.toLowerCase());
//         // Reset date range when changing view mode
//         setStartDate(null);
//         setEndDate(null);
//     };

//     const handleRangeChange = (dates: [Date | null, Date | null]) => {
//         const [start, end] = dates;
//         setStartDate(start);
//         setEndDate(end);

//         // Optionally, you could call fetchData here if you want to fetch data immediately when both dates are selected
//         // if (start && end) {
//         //     fetchData();
//         // }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <WidgetCard
//             title="Account Receivable"
//             description={
//                 <>
//                     <Badge renderAsDot className="me-0.5 bg-[#3b82f6]" /> Total Credit Sales
//                     <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
//                     <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
//                 </>
//             }
//             descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
//             action={
//                 <>
             

// <div id="datefilter23">
//   <DatePicker
//     selected={startDate}
//     onChange={handleRangeChange}
//     startDate={startDate}
//     endDate={endDate}
//     monthsShown={2}
//     placeholderText="Select Date in a Range"
//     selectsRange
//     inputProps={{
//       clearable: true,
//       onClear: () => {
//         setStartDate(null);
//         setEndDate(null);
//       },
//     }}
//   />
// </div>
//                 </>
//             }
//             headerClassName="flex-col @lg:flex-row"
//             rounded="sm"
//             className={className}
//         >
//             <SimpleBar>
//                 <div className={cn('h-[420px] w-full pt-9 @7xl:h-[480px]')}>
//                     <ResponsiveContainer width="100%" height="100%" {...(isTablet && { minWidth: '700px' })}>
//                         <ComposedChart
//                             data={chartData}
//                             barSize={isMediumScreen ? 20 : 28}
//                             className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//                         >
//                             <defs>
//                                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                                     <stop offset="5%" stopColor="#10b981" className="[stop-opacity:0.2]" />
//                                     <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                                 </linearGradient>
//                             </defs>
//                             <XAxis dataKey="date" axisLine={false} tickLine={false} />
//                             <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
//                             <Tooltip content={<CustomTooltip />} />
//                             <Area
//                                 type="monotone"
//                                 dataKey="withinDue"
//                                 stroke="#10b981"
//                                 strokeWidth={2}
//                                 fillOpacity={1}
//                                 fill="url(#creditSalesArea)"
//                             />
//                             <Bar
//                                 dataKey="totalCreditSale"
//                                 fill="#3b82f6"
//                                 {...(isTablet ? { stackId: 'salesMetrics' } : { radius: [4, 4, 0, 0] })}
//                             />
//                             <Bar dataKey="overdue" fill="#f97316" radius={[4, 4, 0, 0]} />
//                         </ComposedChart>
//                     </ResponsiveContainer>
//                 </div>
//             </SimpleBar>
//         </WidgetCard>
//     );
// }



'use client';


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/axiosInstance';
import WidgetCard from '@components/cards/widget-card';
import { Area, Bar, XAxis, YAxis, Tooltip, ComposedChart, ResponsiveContainer } from 'recharts';
import { Badge } from 'rizzui';
import cn from '@utils/class-names';
import { useMedia } from '@hooks/use-media';
import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import SimpleBar from '@ui/simplebar';
import DatePicker from "src/app/shared/datepicker.tsx";

interface ChartDataItem {
    date: string;
    totalCreditSale: number;
    withinDue: number;
    overdue: number;
}

export default function CreditSalesChart({ className }: { className?: string }) {
    const isMediumScreen = useMedia('(max-width: 1200px)', false);
    const isTablet = useMedia('(max-width: 800px)', false);

    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const tempEndDate = new Date();
        const tempStartDate = new Date(tempEndDate);
        tempStartDate.setDate(tempStartDate.getDate() - 30);

        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
    }, [startDate, endDate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = {
                start_date: startDate!.toISOString().split('T')[0],
                end_date: endDate!.toISOString().split('T')[0],
            };
            const response = await axiosInstance.get('/invoices/credit_sales_card_data/', { params });
            const transformedData = transformData(response.data.data);
            setChartData(transformedData);
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load credit sales data');
            toast.error('Failed to load credit sales data');
        } finally {
            setLoading(false);
        }
    };

    const transformData = (apiData: any[]): ChartDataItem[] => {
        if (!apiData || apiData.length === 0) return [];
        
        const dailyData: { [key: string]: ChartDataItem } = {};
        
        apiData.forEach(monthData => {
            monthData.invoices.forEach((invoice: any) => {
                const date = new Date(invoice.issuedate).toISOString().split('T')[0];
                if (!dailyData[date]) {
                    dailyData[date] = { date, totalCreditSale: 0, withinDue: 0, overdue: 0 };
                }
                dailyData[date].totalCreditSale += invoice.total_amount;
                if (invoice.status === "Due") {
                    dailyData[date].withinDue += invoice.total_amount;
                } else if (invoice.status === "Partial") {
                    dailyData[date].overdue += invoice.total_amount - invoice.paid_amount;
                    dailyData[date].withinDue += invoice.paid_amount;
                }
            });
        });

        return Object.values(dailyData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };

    const handleRangeChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <WidgetCard
            title="Account Receivable"
            description={
                <>
                    <Badge renderAsDot className="me-0.5 bg-[#3b82f6]" /> Total Credit Sales
                    <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
                    <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
                </>
            }
            descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
            action={
                <div id="datefilter23">
                    <DatePicker
                        selected={startDate}
                        onChange={handleRangeChange}
                        startDate={startDate}
                        endDate={endDate}
                        monthsShown={2}
                        placeholderText="Select Date Range"
                        selectsRange
                        inputProps={{
                            clearable: true,
                            onClear: () => {
                                setStartDate(null);
                                setEndDate(null);
                            },
                        }}
                    />
                </div>
            }
            headerClassName="flex-col @lg:flex-row"
            rounded="sm"
            className={className}
        >
            <SimpleBar>
                <div className={cn('h-[420px] w-full pt-9 @7xl:h-[480px]')}>
                    <ResponsiveContainer width="100%" height="100%" {...(isTablet && { minWidth: '700px' })}>
                        <ComposedChart
                            data={chartData}
                            barSize={isMediumScreen ? 20 : 28}
                            className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
                        >
                            <defs>
                                <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" className="[stop-opacity:0.2]" />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
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
                                {...(isTablet ? { stackId: 'salesMetrics' } : { radius: [4, 4, 0, 0] })}
                            />
                            <Bar dataKey="overdue" fill="#f97316" radius={[4, 4, 0, 0]} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </SimpleBar>
        </WidgetCard>
    );
}








// import React, { useState, useEffect } from 'react';
// import axiosInstance from '@/axiosInstance';
// import { toast } from 'react-hot-toast';
// import WidgetCard from '@components/cards/widget-card';
// import { Area, Bar, XAxis, YAxis, Tooltip, ComposedChart, ResponsiveContainer } from 'recharts';
// import { Badge } from 'rizzui';
// import cn from '@utils/class-names';
// import { useMedia } from '@hooks/use-media';
// import { CustomYAxisTick } from '@components/charts/custom-yaxis-tick';
// import { CustomTooltip } from '@components/charts/custom-tooltip';
// import SimpleBar from '@ui/simplebar';
// import DatePicker from "src/app/shared/datepicker.tsx";

// interface ChartDataItem {
//     date: string;
//     totalCreditSale: number;
//     withinDue: number;
//     overdue: number;
// }

// interface ApiDataItem {
//     start_date: string;
//     end_date: string;
//     totalCreditSale: number;
//     withinDue: number;
//     overdue: number;
//     invoices: Array<{
//         issuedate: string;
//         total_amount: number;
//         paid_amount: number;
//         status: string;
//     }>;
// }

// export default function CreditSalesChart({ className }: { className?: string }) {
//     const isMediumScreen = useMedia('(max-width: 1200px)', false);
//     const isTablet = useMedia('(max-width: 800px)', false);

//     const [chartData, setChartData] = useState<ChartDataItem[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);

//     useEffect(() => {
//         const tempEndDate = new Date();
//         const tempStartDate = new Date(tempEndDate);
//         tempStartDate.setDate(tempStartDate.getDate() - 30);

//         setStartDate(tempStartDate);
//         setEndDate(tempEndDate);
//     }, []);

//     useEffect(() => {
//         if (startDate && endDate) {
//             fetchData();
//         }
//     }, [startDate, endDate]);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const params = {
//                 start_date: startDate!.toISOString().split('T')[0],
//                 end_date: endDate!.toISOString().split('T')[0],
//             };
//             const response = await axiosInstance.get('/invoices/credit_sales_card_data/', { params });
//             const transformedData = transformData(response.data.data);
//             setChartData(transformedData);
//             setError(null);
//         } catch (err) {
//             console.error('Error fetching data:', err);
//             setError('Failed to load credit sales data');
//             toast.error('Failed to load credit sales data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const transformData = (apiData: ApiDataItem[]): ChartDataItem[] => {
//         if (!apiData || apiData.length === 0) return [];
        
//         const dailyData: { [key: string]: ChartDataItem } = {};
        
//         // Initialize dailyData with all dates in the range
//         const currentDate = new Date(startDate!);
//         const endDateObj = new Date(endDate!);
//         while (currentDate <= endDateObj) {
//             const dateString = currentDate.toISOString().split('T')[0];
//             dailyData[dateString] = { 
//                 date: dateString, 
//                 totalCreditSale: 0, 
//                 withinDue: 0, 
//                 overdue: 0 
//             };
//             currentDate.setDate(currentDate.getDate() + 1);
//         }

//         // Populate data from API response
//         apiData.forEach(monthData => {
//             monthData.invoices.forEach(invoice => {
//                 const date = new Date(invoice.issuedate).toISOString().split('T')[0];
//                 if (dailyData[date]) {
//                     dailyData[date].totalCreditSale += invoice.total_amount;
//                     if (invoice.status === "Due") {
//                         dailyData[date].withinDue += invoice.total_amount;
//                     } else if (invoice.status === "Partial") {
//                         dailyData[date].overdue += invoice.total_amount - invoice.paid_amount;
//                         dailyData[date].withinDue += invoice.paid_amount;
//                     }
//                 }
//             });
//         });

//         return Object.values(dailyData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//     };

//     const handleRangeChange = (dates: [Date | null, Date | null]) => {
//         const [start, end] = dates;
//         setStartDate(start);
//         setEndDate(end);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <WidgetCard
//             title="Account Receivable"
//             description={
//                 <>
//                     <Badge renderAsDot className="me-0.5 bg-[#3b82f6]" /> Total Credit Sales
//                     <Badge renderAsDot className="me-0.5 ms-4 bg-[#10b981]" /> Within Due
//                     <Badge renderAsDot className="me-0.5 ms-4 bg-[#f97316]" /> Overdue
//                 </>
//             }
//             descriptionClassName="text-gray-500 mt-1.5 mb-3 @lg:mb-0"
//             action={
//                 <div id="datefilter23">
//                     <DatePicker
//                         selected={startDate}
//                         onChange={handleRangeChange}
//                         startDate={startDate}
//                         endDate={endDate}
//                         monthsShown={2}
//                         placeholderText="Select Date Range"
//                         selectsRange
//                         inputProps={{
//                             clearable: true,
//                             onClear: () => {
//                                 setStartDate(null);
//                                 setEndDate(null);
//                             },
//                         }}
//                     />
//                 </div>
//             }
//             headerClassName="flex-col @lg:flex-row"
//             rounded="sm"
//             className={className}
//         >
//             <SimpleBar>
//                 <div className={cn('h-[420px] w-full pt-9 @7xl:h-[480px]')}>
//                     <ResponsiveContainer width="100%" height="100%" {...(isTablet && { minWidth: '700px' })}>
//                         <ComposedChart
//                             data={chartData}
//                             barSize={isMediumScreen ? 20 : 28}
//                             className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
//                         >
//                             <defs>
//                                 <linearGradient id="creditSalesArea" x1="0" y1="0" x2="0" y2="1">
//                                     <stop offset="5%" stopColor="#10b981" className="[stop-opacity:0.2]" />
//                                     <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                                 </linearGradient>
//                             </defs>
//                             <XAxis 
//                                 dataKey="date" 
//                                 axisLine={false} 
//                                 tickLine={false}
//                                 tickFormatter={(value) => new Date(value).toLocaleDateString()}
//                             />
//                             <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
//                             <Tooltip 
//                                 content={<CustomTooltip />}
//                                 labelFormatter={(value) => new Date(value).toLocaleDateString()}
//                             />
//                             <Area
//                                 type="monotone"
//                                 dataKey="withinDue"
//                                 stroke="#10b981"
//                                 strokeWidth={2}
//                                 fillOpacity={1}
//                                 fill="url(#creditSalesArea)"
//                             />
//                             <Bar
//                                 dataKey="totalCreditSale"
//                                 fill="#3b82f6"
//                                 {...(isTablet ? { stackId: 'salesMetrics' } : { radius: [4, 4, 0, 0] })}
//                             />
//                             <Bar dataKey="overdue" fill="#f97316" radius={[4, 4, 0, 0]} />
//                         </ComposedChart>
//                     </ResponsiveContainer>
//                 </div>
//             </SimpleBar>
//         </WidgetCard>
//     );
// }