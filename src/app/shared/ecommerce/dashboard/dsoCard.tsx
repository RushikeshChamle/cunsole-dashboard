


// "use client"

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
// import { ArrowUpIcon, ArrowDownIcon, AlertCircle } from 'lucide-react'


// interface BarChartListProps {
//   className?: string;
// }


// const data = [
//   { month: 'Jan', dso: 45 },
//   { month: 'Feb', dso: 42 },
//   { month: 'Mar', dso: 47 },
//   { month: 'Apr', dso: 44 },
//   { month: 'May', dso: 39 },
//   { month: 'Jun', dso: 41 },
// ]

// // export default function BarChartList() {
//   export default function BarChartList({ className }: BarChartListProps) {

//   const currentDSO = data[data.length - 1].dso
//   const previousDSO = data[data.length - 2].dso
//   const percentageChange = ((currentDSO - previousDSO) / previousDSO) * 100
//   const isPositiveChange = percentageChange >= 0
//   const averageDSO = data.reduce((sum, item) => sum + item.dso, 0) / data.length

//   return (
//     <div className="w-full max-w-4xl p-6 bg-background border border-border rounded-lg shadow-sm">
//       <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <h3 className="text-lg font-semibold">Accounts Receivable DSO</h3>
//         <AlertCircle className="h-4 w-4 text-muted-foreground" />
//       </div>
//       <div className="mt-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
//           </div>
//         </div>
//         <div className="h-64 sm:h-80">
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
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/axiosInstance";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from "recharts";
import { ArrowUpIcon, ArrowDownIcon, AlertCircle } from "lucide-react";

// Interface for props
interface BarChartListProps {
  className?: string;
}

// API data structure
interface DSOData {
  month: string;
  dso: number;
}

// Main component
export default function BarChartList({ className }: BarChartListProps) {
  const [data, setData] = useState<DSOData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDSO, setCurrentDSO] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [averageDSO, setAverageDSO] = useState(0);

  // Fetch DSO data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/invoices/dso_data_card/");
        const dsoData = response.data.dso_data;

        setData(dsoData);

        const latestDSO = dsoData[dsoData.length - 1].dso;
        const previousDSO = dsoData[dsoData.length - 2]?.dso || 0;
        const change = ((latestDSO - previousDSO) / (previousDSO || 1)) * 100;

        setCurrentDSO(latestDSO);
        setPercentageChange(change);
        setAverageDSO(
          // dsoData.reduce((sum:any, item:any) => sum + item.dso, 0) / dsoData.length
          dsoData.reduce((sum: number, item: DSOData) => sum + item.dso, 0) / dsoData.length

        );
      } catch (err) {
        setError("Failed to fetch DSO data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const isPositiveChange = percentageChange >= 0;

  return (
    <div className={`w-full max-w-4xl p-6 bg-background border rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-lg font-semibold">Days Sales Outstanding</h3>
        <AlertCircle className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Current DSO</p>
            <p className="text-2xl font-bold text-primary">{currentDSO} days</p>
            <div className="flex items-center space-x-2">
              {isPositiveChange ? (
                <ArrowUpIcon className="w-4 h-4 text-red-500" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-green-500" />
              )}
              <span className={`text-sm font-medium ${isPositiveChange ? 'text-red-500' : 'text-green-500'}`}>
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
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
  );
}

