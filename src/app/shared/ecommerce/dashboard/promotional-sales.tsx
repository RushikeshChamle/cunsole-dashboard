
// "use client";

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { AlertCircle } from 'lucide-react';
// import { Tooltip as RizzuiTooltip, Text } from "rizzui";

// interface ChartData {
//   name: string;
//   value: number;
//   color: string;
//   category: string;
// }

// const data: ChartData[] = [
//   { name: 'Due', value: 3250000, color: '#10b981', category: 'due' },
//   { name: 'Overdue', value: 1750000, color: '#ef4444', category: 'overdue' },
//   { name: '1-30 days', value: 950000, color: '#eab308', category: 'aging' },
//   { name: '31-60 days', value: 450000, color: '#f97316', category: 'aging' },
//   { name: '61-90 days', value: 200000, color: '#ec4899', category: 'aging' },
//   { name: '> 90 days', value: 150000, color: '#7c3aed', category: 'aging' },
// ];

// function CustomContent() {
//   return (
//     <div className="w-40 text-start">
//       <div className="inline-flex items-center gap-2 text-base mb-1.5">
//         <Text className="text-sm font-light">Moderate overdue percentage. Review collection strategies to reduce overdue accounts.</Text>
//       </div>
//     </div>
//   );
// }

// interface PromotionalSalesProps {
//   className?: string;
// }

// export default function PromotionalSales({ className = '' }: PromotionalSalesProps) {
//   const totalValue = data.reduce((sum, item) => sum + item.value, 0);
//   const overdueValue = data.find(item => item.name === 'Overdue')?.value || 0; // Added optional chaining
//   const overduePercentage = (overdueValue / totalValue) * 100;

//   const agingData = data.filter(item => item.category === 'aging');
//   const weightedDaysOverdue = agingData.reduce((sum, item, index) => {
//     const midpoint = [15, 45, 75, 105][index]; // Midpoints of each aging category
//     return sum + item.value * midpoint;
//   }, 0);
//   const averageDaysOverdue = overdueValue > 0 ? weightedDaysOverdue / overdueValue : 0; // Prevent division by zero

//   const annualRevenue = 50000000; // $50 million annual revenue
//   const dso = (totalValue / (annualRevenue / 365)).toFixed(1);

//   return (
//     <div className={`w-full max-w-2xl p-6 bg-background border border-border rounded-lg shadow-sm ${className}`}>
//       <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <h3 className="text-lg font-semibold">Accounts Receivable Status</h3>
//         <RizzuiTooltip size="sm" shadow="lg" placement="left" content={<CustomContent />}>
//           <AlertCircle className="h-4 w-4 text-muted-foreground" />
//         </RizzuiTooltip>
//       </div>
//       <div className="mt-4">
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="space-y-2">
//             <p className="text-sm font-medium text-muted-foreground">Total Receivables</p>
//             <p className="text-2xl font-bold text-primary">${(totalValue / 1000000).toFixed(2)}M</p>
//           </div>
//           <div className="space-y-2">
//             <p className="text-sm font-medium text-muted-foreground">Overdue Percentage</p>
//             <p className="text-2xl font-bold text-primary">{overduePercentage.toFixed(1)}%</p>
//           <br></br>
          
//           </div>
//         </div>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data} barSize={24}>
//               <XAxis 
//                 dataKey="name" 
//                 stroke="#888888" 
//                 fontSize={12} 
//                 tickLine={false} 
//                 axisLine={false}
//               />
//               <YAxis
//                 stroke="#888888"
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={false}
//                 tickFormatter={(value) => `$${value / 1000000}M`}
//               />
//               <Tooltip
//                 contentStyle={{
//                   background: 'rgba(255, 255, 255, 0.8)',
//                   border: 'none',
//                   borderRadius: '4px',
//                   boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                 }}
//                 formatter={(value) => [`$${(value / 1000000).toFixed(2)}M`, 'Amount']}
//               />
//               <Bar dataKey="value" radius={[4, 4, 0, 0]}>
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { Tooltip as RizzuiTooltip, Text } from "rizzui";

interface ChartData {
  name: string;
  value: number;
  color: string;
  category: string;
}

const data: ChartData[] = [
  { name: 'Due', value: 3250000, color: '#10b981', category: 'due' },
  { name: 'Overdue', value: 1750000, color: '#ef4444', category: 'overdue' },
  { name: '1-30 days', value: 950000, color: '#eab308', category: 'aging' },
  { name: '31-60 days', value: 450000, color: '#f97316', category: 'aging' },
  { name: '61-90 days', value: 200000, color: '#ec4899', category: 'aging' },
  { name: '> 90 days', value: 150000, color: '#7c3aed', category: 'aging' },
];

function CustomContent() {
  return (
    <div className="w-40 text-start">
      <div className="inline-flex items-center gap-2 text-base mb-1.5">
        <Text className="text-sm font-light">Moderate overdue percentage. Review collection strategies to reduce overdue accounts.</Text>
      </div>
    </div>
  );
}

interface PromotionalSalesProps {
  className?: string;
}

export default function PromotionalSales({ className = '' }: PromotionalSalesProps) {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const overdueValue = data.find(item => item.name === 'Overdue')?.value || 0;
  const overduePercentage = (overdueValue / totalValue) * 100;

  const agingData = data.filter(item => item.category === 'aging');
  const weightedDaysOverdue = agingData.reduce((sum, item, index) => {
    const midpoint = [15, 45, 75, 105][index]; // Midpoints of each aging category
    return sum + item.value * midpoint;
  }, 0);
  const averageDaysOverdue = overdueValue > 0 ? weightedDaysOverdue / overdueValue : 0; // Prevent division by zero

  const annualRevenue = 50000000; // $50 million annual revenue
  const dso = (totalValue / (annualRevenue / 365)).toFixed(1);

  return (
    <div className={`w-full max-w-2xl p-4 md:p-6 bg-background border border-border rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 space-y-2 md:space-y-0">
        <h3 className="text-lg font-semibold">Accounts Receivable Status</h3>
        <RizzuiTooltip size="sm" shadow="lg" placement="left" content={<CustomContent />}>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </RizzuiTooltip>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Receivables</p>
            <p className="text-2xl font-bold text-primary">${(totalValue / 1000000).toFixed(2)}M</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Overdue Percentage</p>
            <p className="text-2xl font-bold text-primary">{overduePercentage.toFixed(1)}%</p>
          </div>
        </div>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={24}>
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000000}M`}
              />
              {/* <Tooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`$${(value / 1000000).toFixed(2)}M`, 'Amount']}
              /> */}

<Tooltip
  contentStyle={{
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }}
  formatter={(value) => {
    const numericValue = typeof value === 'number' ? value : 0; // Ensure value is a number
    return [`$${(numericValue / 1000000).toFixed(2)}M`, 'Amount'];
  }}
/>

              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


