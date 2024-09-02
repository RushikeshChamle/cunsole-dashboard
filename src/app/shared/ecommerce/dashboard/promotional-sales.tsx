// 'use client';

// import { useState } from 'react';
// import { DatePicker } from '@ui/datepicker';
// import WidgetCard from '@components/cards/widget-card';
// import {
//   RadialBarChart,
//   RadialBar,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import cn from '@utils/class-names';
// import { useMedia } from '@hooks/use-media';

// const data = [
//   {
//     name: 'Youtube',
//     sales: 31.47,
//     fill: '#FF0000',
//   },
//   {
//     name: 'Instagram',
//     sales: 26.69,
//     fill: '#E1306C',
//   },
//   {
//     name: 'Twitter',
//     sales: 15.69,
//     fill: '#1DA1F2',
//   },
//   {
//     name: 'Facebook',
//     sales: 8.22,
//     fill: '#4267B2',
//   },

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
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];


// export default function PromotionalSales({
//   className,
// }: {
//   className?: string;
// }) {
//   const isMobile = useMedia('(max-width: 480px)', false);

//   const isMediumScreen = useMedia('(max-width: 1200px)', false);
//   return (
//     // <WidgetCard
//     //   title={'Promotional Sales'}
//     //   action={
//     //     <DatePicker
//     //       selected={startDate}
//     //       onChange={(date: Date) => setStartDate(date)}
//     //       dateFormat="MMM, yyyy"
//     //       placeholderText="Select Month"
//     //       showMonthYearPicker
//     //       popperPlacement="bottom-end"
//     //       inputProps={{
//     //         variant: 'text',
//     //         inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
//     //       }}
//     //       className="w-36"
//     //     />
//     //   }
//     //   className={cn('@container', className)}
//     // >
//     //   <div className="h-96 w-full pb-4 pt-4 @sm:h-96 @xl:pb-0">
//     //     <ResponsiveContainer
//     //       width="100%"
//     //       height="100%"
//     //       className="[&_.recharts-default-legend]:flex [&_.recharts-default-legend]:flex-wrap [&_.recharts-default-legend]:justify-center @xl:[&_.recharts-default-legend]:flex-col [&_.recharts-legend-wrapper]:!static [&_.recharts-legend-wrapper]:!-mt-[22px] [&_.recharts-legend-wrapper]:!leading-[22px] @xs:[&_.recharts-legend-wrapper]:!mt-0 @xl:[&_.recharts-legend-wrapper]:!absolute @xl:[&_.recharts-legend-wrapper]:!end-0 @xl:[&_.recharts-legend-wrapper]:!start-auto @xl:[&_.recharts-legend-wrapper]:!top-1/2 @xl:[&_.recharts-legend-wrapper]:!-translate-y-1/2 @xl:[&_.recharts-legend-wrapper]:!translate-x-0 @xl:[&_.recharts-legend-wrapper]:!leading-9"
//     //     >
//     //       <RadialBarChart
//     //         innerRadius="20%"
//     //         outerRadius="110%"
//     //         barSize={isMobile ? 16 : 24}
//     //         data={data}
//     //         className="rtl:[&_.recharts-legend-item>svg]:ml-1"
//     //       >
//     //         <RadialBar
//     //           label={{ fill: '#ffffff', position: 'insideStart' }}
//     //           background
//     //           dataKey="sales"
//     //           className="[&_.recharts-radial-bar-background-sector]:fill-gray-100"
//     //         />
//     //         <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
//     //       </RadialBarChart>
//     //     </ResponsiveContainer>
//     //   </div>
//     // </WidgetCard>

//     <WidgetCard title={'Simple Bar Chart'} className={className}>
//       <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             barSize={isMediumScreen ? 18 : 24}
//             margin={{
//               left: -10,
//             }}
//             className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis tickLine={false} dataKey="name" />
//             <YAxis tickLine={false} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="pv" fill="#5a5fd7" radius={[4, 4, 0, 0]} />
//             <Bar dataKey="uv" fill="#10b981" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
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
//     name: 'Due',
//     uv: 4000,
  
//   },
//   {
//     name: 'Over Due',
//     uv: 3000,
  
//   },

//   // add gap between them
//   {
//     name: '<30 days',
//     uv: 2000,
 
//   },
//   {
//     name: '30-60 Days',
//     uv: 2780,

//   },
//   {
//     name: '60-90 Days',
//     uv: 1890,
 
//   },
//   {
//     name: '>90 days',
//     uv: 2390,

//   },
  
// ];

// export default function PromotionalSales({
//   className,
// }: {
//   className?: string;
// }) {
//   const isMobile = useMedia('(max-width: 480px)', false);
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);

//   return (
//     <WidgetCard title={'Aging Balance'} className={className}>
//       <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             barSize={isMediumScreen ? 18 : 24}
//             barGap={40} // Increases the gap between bars
//             margin={{ left: -10 }}
//             className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis tickLine={false} dataKey="name" />
//             <YAxis tickLine={false} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="uv" fill="#10b981" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
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
//   Cell,
// } from 'recharts';
// import { useMedia } from '@hooks/use-media';

// const data = [
//   { name: 'Due', uv: 4000, color: '#10b981' },        // Green for 'Due'
//   { name: 'Over Due', uv: 3000, color: '#f97316' },   // Orange for 'Over Due' 
//   { name: '<30 days', uv: 2000, color: '#eab308' },   // Yellow for '<30 days'
//   { name: '30-60 Days', uv: 2780, color: '#3b82f6' }, // Blue for '30-60 Days'
//   { name: '60-90 Days', uv: 1890, color: '#8b5cf6' }, // Purple for '60-90 Days'
//   { name: '>90 days', uv: 2390, color: '#ef4444' },   // Red for '>90 days'
// ];

// export default function PromotionalSales({
//   className,
// }: {
//   className?: string;
// }) {
//   const isMobile = useMedia('(max-width: 480px)', false);
//   const isMediumScreen = useMedia('(max-width: 1200px)', false);

//   return (
//     <WidgetCard title={'Aging Balance'} className={className}>
//       <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             barSize={isMediumScreen ? 18 : 24}
//             barGap={50} // Increases the gap between bars
//             margin={{ left: -10 }}
//             className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis tickLine={false} dataKey="name" />
//             <YAxis tickLine={false} />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />

//             {/* Use a single Bar component to render all bars with different colors */}
//             <Bar
//               dataKey="uv"
//               radius={[4, 4, 0, 0]}
//               // label={{  }}
//             >
//               {/* Map through data to dynamically set bar colors */}
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </WidgetCard>
//   );
// }

'use client';

import WidgetCard from '@components/cards/widget-card';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useMedia } from '@hooks/use-media';

const data = [
  { name: 'Due', uv: 4000, color: '#10b981' },        // Green for 'Due'
  { name: 'Over Due', uv: 3000, color: '#f97316' },   // Orange for 'Over Due'
  { name: '', uv: 0, color: 'transparent' },          // Spacer (invisible bar)
  { name: '<30 days', uv: 2000, color: '#eab308' },   // Yellow for '<30 days'
  { name: '30-60 Days', uv: 2780, color: '#3b82f6' }, // Blue for '30-60 Days'
  { name: '60-90 Days', uv: 1890, color: '#8b5cf6' }, // Purple for '60-90 Days'
  { name: '>90 days', uv: 2390, color: '#ef4444' },   // Red for '>90 days'
];

export default function PromotionalSales({
  className,
}: {
  className?: string;
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const isMediumScreen = useMedia('(max-width: 1200px)', false);

  return (
    <WidgetCard title={'Aging Balance'} className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={isMediumScreen ? 18 : 24}
            barGap={5} // Smaller gap for other bars
            margin={{ left: -10 }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tickLine={false} dataKey="name" />
            <YAxis tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* Use a single Bar component to render all bars with different colors */}
            <Bar dataKey="uv" radius={[4, 4, 0, 0]}>
              {/* Map through data to dynamically set bar colors */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
