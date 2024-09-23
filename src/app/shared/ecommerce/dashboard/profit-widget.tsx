// // 'use client';

// // import { Button, Text } from 'rizzui';
// // import cn from '@utils/class-names';
// // import WidgetCard from '@components/cards/widget-card';
// // import ButtonGroupAction from '@components/charts/button-group-action';
// // import {
// //   AreaChart,
// //   Area,
// //   Tooltip,
// //   ResponsiveContainer,
// //   CartesianGrid,
// // } from 'recharts';
// // import { CustomTooltip } from '@components/charts/custom-tooltip';
// // import { PiInfoFill } from 'react-icons/pi';

// // const data = [
// //   {
// //     month: 'Jan',
// //     totalSales: 95,
// //   },
// //   {
// //     month: 'Mar',
// //     totalSales: 70,
// //   },
// //   {
// //     month: 'May',
// //     totalSales: 113,
// //   },
// //   {
// //     month: 'Jul',
// //     totalSales: 159,
// //   },
// //   {
// //     month: 'Sep',
// //     totalSales: 105,
// //   },
// //   {
// //     month: 'Nov',
// //     totalSales: 140,
// //   },
// // ];

// // const filterOptions = ['5 D', '2 W', '1 M', '6 M', '1 Y'];

// // export default function ProfitWidget({ className }: { className?: string }) {
// //   function handleFilterBy(data: string) {
// //     console.log('Profit Filter:', data);
// //   }

// //   return (
// //     <WidgetCard
// //       title={'Total Profit'}
// //       description={'$8,950.00'}
// //       titleClassName="text-gray-500 font-normal font-inter !text-sm"
// //       descriptionClassName="text-lg font-semibold sm:text-xl 3xl:text-2xl text-gray-900 font-lexend mt-1"
// //       action={
// //         <Button variant="outline" size="sm" className="text-sm">
// //           Details
// //         </Button>
// //       }
// //       headerClassName="mb-6"
// //       className={cn('flex flex-col', className)}
// //     >
// //       <div className="grid flex-grow grid-cols-1 gap-3">
// //         <ButtonGroupAction
// //           options={filterOptions}
// //           defaultActive={filterOptions[0]}
// //           onChange={(data) => handleFilterBy(data)}
// //           btnClassName="@sm:px-2.5"
// //           className="justify-between self-start rounded-lg border border-muted p-1.5"
// //         />
// //         <div className="mt-auto h-64 w-full pb-5 @sm:h-72 @sm:pt-3 @7xl:h-[240px] lg:pb-7">
// //           <ResponsiveContainer width="100%" height="100%">
// //             <AreaChart
// //               data={data}
// //               margin={{
// //                 top: 6,
// //                 bottom: 30,
// //               }}
// //             >
// //               <defs>
// //                 <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
// //                   <stop offset="5%" stopColor="#10b981" stopOpacity={0.125} />
// //                   <stop offset="95%" stopColor="#ffdadf" stopOpacity={0.05} />
// //                 </linearGradient>
// //               </defs>

// //               <CartesianGrid
// //                 strokeDasharray="8 10"
// //                 strokeOpacity={0.5}
// //                 vertical={false}
// //               />
// //               <Tooltip content={<CustomTooltip />} />
// //               <Area
// //                 type="bump"
// //                 dataKey="totalSales"
// //                 stroke="#10b981"
// //                 strokeWidth={2.3}
// //                 fillOpacity={1}
// //                 fill="url(#totalSales)"
// //               />
// //             </AreaChart>
// //           </ResponsiveContainer>
// //           <Text className="text-gray-500 @sm:mt-2.5 ">
// //             <PiInfoFill className="inline-flex h-auto w-4 text-gray-500/80 dark:text-gray-600" />{' '}
// //             Total profit without tax included.
// //           </Text>
// //         </div>
// //       </div>
// //     </WidgetCard>
// //   );
// // }


// 'use client';

// import { Button } from 'rizzui';
// import cn from '@utils/class-names';
// import WidgetCard from '@components/cards/widget-card';
// import { PiInfoFill } from 'react-icons/pi';

// const filterOptions = ['5 D', '2 W', '1 M', '6 M', '1 Y'];

// // Example list of top due customers
// const topDueCustomers = [
//   { name: 'Zephyr Tech', due: '8,400,000', dueIn: '30 days' },
//   { name: 'Omega Holdings', due: '6,200,000', dueIn: '60 days' },
//   { name: 'Nova Dynamics', due: '5,900,000', dueIn: '90 days' },
//   { name: 'Pinnacle Solutions', due: '7,000,000', dueIn: '45 days' },
//   { name: 'Quantum Innovations', due: '4,500,000', dueIn: '120 days' },
//   { name: 'Rising Star Corp', due: '3,700,000', dueIn: '15 days' },
//   { name: 'Synergy Partners', due: '6,800,000', dueIn: '75 days' },

// ];


// export default function ProfitWidget({ className }: { className?: string }) {
//   function handleFilterBy(data: string) {
//     console.log('Profit Filter:', data);
//   }

//   return (
//     <WidgetCard
//       title={'Top Due Customers'}
//       // titleClassName="text-gray-500 font-normal font-inter text-sm"
//       descriptionClassName="text-lg font-semibold sm:text-xl text-gray-900 font-lexend mt-1"
//       action={
//         <Button variant="outline" size="sm" className="text-sm hover:bg-gray-200 transition-colors duration-200">
//           Details
//         </Button>
//       }
//       headerClassName="mb-6"
//       className={cn('flex flex-col', className)}
//     >
//       <div className="grid flex-grow grid-cols-1 gap-3">
//         <div className="mt-4 p-4 rounded duration-300">

//           <ul className="space-y-2">
//             {topDueCustomers.map((customer, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 <span className="font-medium">{customer.name}</span>
//                 <span className="font-medium text-gray-700">
//                   Due by {customer.dueIn}: ${customer.due}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </WidgetCard>
//   );
// }

'use client';

import { Button, Table, Badge } from 'rizzui';
import cn from '@utils/class-names';
import WidgetCard from '@components/cards/widget-card';
import { PiInfoFill } from 'react-icons/pi';

const filterOptions = ['5 D', '2 W', '1 M', '6 M', '1 Y'];

// Example list of top due customers
const topDueCustomers = [
  { name: 'Zephyr Tech', due: '8,400,000', dueIn: '30 days' },
  { name: 'Omega Holdings', due: '6,200,000', dueIn: '60 days' },
  { name: 'Nova Dynamics', due: '5,900,000', dueIn: '90 days' },
  { name: 'Pinnacle Solutions', due: '7,000,000', dueIn: '45 days' },
  { name: 'Quantum Innovations', due: '4,500,000', dueIn: '120 days' },
  { name: 'Rising Star Corp', due: '3,700,000', dueIn: '15 days' },
  { name: 'Synergy Partners', due: '6,800,000', dueIn: '75 days' },
];

export default function ProfitWidget({ className }: { className?: string }) {
  function handleFilterBy(data: string) {
    console.log('Profit Filter:', data);
  }

  return (
    <WidgetCard
      title={'Top 10 Due Customers'}
      descriptionClassName="text-lg font-semibold sm:text-xl text-gray-900 font-lexend mt-1"
      action={
        <Button variant="outline" size="sm" className="text-sm hover:bg-gray-200 transition-colors duration-200">
          Details
        </Button>
      }
      headerClassName="mb-6"
      className={cn('flex flex-col', className)}
    >
      <div className="grid flex-grow grid-cols-1 gap-3">
        <div className="max-h-[400px] overflow-y-auto">
          <Table >
            <Table.Header>
              <Table.Row>
                <Table.Head>Customer</Table.Head>
                <Table.Head>Due Amount</Table.Head>
                <Table.Head>Overdue</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {topDueCustomers.map((customer, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{customer.name}</Table.Cell>
                  <Table.Cell>${customer.due}</Table.Cell>
                  <Table.Cell>{customer.dueIn}</Table.Cell>
                
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </WidgetCard>
  );
}

// Utility function to determine the badge color based on dueIn
function getBadgeColor(dueIn: string) {
  const days = parseInt(dueIn.split(' ')[0]);
  if (days <= 30) return 'red'; // Short-term due
  if (days <= 60) return 'orange'; // Medium-term due
  return 'green'; // Long-term due
}
