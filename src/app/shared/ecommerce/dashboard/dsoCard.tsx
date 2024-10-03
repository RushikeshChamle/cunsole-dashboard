// "use client"

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
// import { ArrowUpIcon, ArrowDownIcon, AlertCircle } from 'lucide-react'
// import { Title } from "rizzui";


// const data = [
//   { month: 'Jan', dso: 45 },
//   { month: 'Feb', dso: 42 },
//   { month: 'Mar', dso: 47 },
//   { month: 'Apr', dso: 44 },
//   { month: 'May', dso: 39 },
//   { month: 'Jun', dso: 41 },
// ]

// export default function BarChartList() {
//   const currentDSO = data[data.length - 1].dso
//   const previousDSO = data[data.length - 2].dso
//   const percentageChange = ((currentDSO - previousDSO) / previousDSO) * 100
//   const isPositiveChange = percentageChange >= 0
//   const averageDSO = data.reduce((sum, item) => sum + item.dso, 0) / data.length
//   const targetDSO = 40 // Example target DSO

//   return (
//     <div className="w-full max-w-2xl p-6 bg-background border border-border rounded-lg shadow-sm">
//       <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <h3 className="text-lg font-semibold">Accounts Receivable DSO</h3>
//         <AlertCircle className="h-4 w-4 text-muted-foreground" />
//       </div>
//       <div className="mt-4">
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="space-y-2">
//             <p className="text-sm font-medium text-muted-foreground">Current DSO</p>
//             <p className="text-2xl font-bold text-primary">{currentDSO} days</p>
//             <div className="flex items-center space-x-2">
//               {!isPositiveChange ? (
//                 <ArrowDownIcon className="w-4 h-4 text-green-500" />
//               ) : (
//                 <ArrowUpIcon className="w-4 h-4 text-red-500" />
//               )}
//               <span className={`text-sm font-medium ${!isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
//                 {Math.abs(percentageChange).toFixed(2)}%
//               </span>
//               <span className="text-sm text-muted-foreground">vs last month</span>
//             </div>
//           </div>
//           <div className="space-y-2">
//             <p className="text-sm font-medium text-muted-foreground">6-Month Average DSO</p>
//             <p className="text-2xl font-bold text-primary">{averageDSO.toFixed(1)} days</p>
//             {/* <p className="text-sm text-muted-foreground">Target: {targetDSO} days</p> */}
//           </div>
//         </div>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data} barSize={24}>
//               <XAxis 
//                 dataKey="month" 
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
//                 tickFormatter={(value) => `${value} days`}
//               />
//               <Tooltip
//                 contentStyle={{
//                   background: 'rgba(255, 255, 255, 0.8)',
//                   border: 'none',
//                   borderRadius: '4px',
//                   boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                 }}
//                 formatter={(value) => [`${value} days`, 'DSO']}
//               />
//               <Bar 
//                 dataKey="dso" 
//                 fill="currentColor" 
//                 radius={[4, 4, 0, 0]} 
//                 className="fill-primary"
//               />
//               {/* <ReferenceLine y={targetDSO} stroke="red" strokeDasharray="3 3" /> */}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="mt-4 text-sm text-muted-foreground">
//           {/* <span className="font-medium">DSO Trend Analysis:</span> {' '}
//           {currentDSO < averageDSO 
//             ? "Current DSO is below the 6-month average, indicating improved collection efficiency." 
//             : "Current DSO is above the 6-month average, suggesting potential collection issues."} */}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpIcon, ArrowDownIcon, AlertCircle } from 'lucide-react'


interface BarChartListProps {
  className?: string;
}


const data = [
  { month: 'Jan', dso: 45 },
  { month: 'Feb', dso: 42 },
  { month: 'Mar', dso: 47 },
  { month: 'Apr', dso: 44 },
  { month: 'May', dso: 39 },
  { month: 'Jun', dso: 41 },
]

// export default function BarChartList() {
  export default function BarChartList({ className }: BarChartListProps) {

  const currentDSO = data[data.length - 1].dso
  const previousDSO = data[data.length - 2].dso
  const percentageChange = ((currentDSO - previousDSO) / previousDSO) * 100
  const isPositiveChange = percentageChange >= 0
  const averageDSO = data.reduce((sum, item) => sum + item.dso, 0) / data.length

  return (
    <div className="w-full max-w-4xl p-6 bg-background border border-border rounded-lg shadow-sm">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-lg font-semibold">Accounts Receivable DSO</h3>
        <AlertCircle className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Current DSO</p>
            <p className="text-2xl font-bold text-primary">{currentDSO} days</p>
            <div className="flex items-center space-x-2">
              {!isPositiveChange ? (
                <ArrowDownIcon className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowUpIcon className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${!isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(percentageChange).toFixed(2)}%
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">6-Month Average DSO</p>
            <p className="text-2xl font-bold text-primary">{averageDSO.toFixed(1)} days</p>
          </div>
        </div>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={24}>
              <XAxis 
                dataKey="month" 
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
                tickFormatter={(value) => `${value} days`}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`${value} days`, 'DSO']}
              />
              <Bar 
                dataKey="dso" 
                fill="currentColor" 
                radius={[4, 4, 0, 0]} 
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
