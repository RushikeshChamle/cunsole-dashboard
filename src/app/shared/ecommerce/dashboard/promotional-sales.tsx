"use client";

import { useEffect, useState } from 'react';
import axiosInstance from '@/axiosInstance'; // Custom Axios instance
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { AlertCircle } from 'lucide-react';
import { Tooltip as RizzuiTooltip, Text } from 'rizzui';

// Chart Data Interface
interface ChartData {
  name: string;
  value: number;
  color: string;
  category: string;
}

// API Response Interface
interface ApiResponse {
  total_receivables: number;
  overdue_percentage: number;
  aging_data: ChartData[];
  summary: {
    outstanding: { current: number; previous: number; change: number };
    overdue: { current: number; previous: number; change: number };
    due: { current: number; previous: number; change: number };
  };
}

interface PromotionalSalesProps {
  className?: string;
}

function CustomContent() {
  return (
    <div className="w-40 text-start">
      <div className="inline-flex items-center gap-2 text-base mb-1.5">
        <Text className="text-sm font-light">
          Moderate overdue percentage. Review collection strategies to reduce overdue accounts.
        </Text>
      </div>
    </div>
  );
}

export default function PromotionalSales({ className = '' }: PromotionalSalesProps) {
  const [data, setData] = useState<ChartData[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [overduePercentage, setOverduePercentage] = useState(0);

  // Fetch data from the backend API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get<ApiResponse>('invoices/ar_status_card/');
        const { total_receivables, overdue_percentage, aging_data } = response.data;

        setData(aging_data);
        setTotalValue(total_receivables);
        setOverduePercentage(overdue_percentage);
      } catch (error) {
        console.error('Failed to fetch AR status data:', error);
      }
    }

    fetchData();
  }, []);

  const overdueValue = data.find(item => item.name === 'Overdue')?.value || 0;
  const agingData = data.filter(item => item.category === 'aging');
  const weightedDaysOverdue = agingData.reduce((sum, item, index) => {
    const midpoint = [15, 45, 75, 105][index]; // Midpoints of each aging category
    return sum + item.value * midpoint;
  }, 0);
  const averageDaysOverdue = overdueValue > 0 ? weightedDaysOverdue / overdueValue : 0;

  const annualRevenue = 50000000; // $50 million annual revenue
  const dso = (totalValue / (annualRevenue / 365)).toFixed(1);

  return (
    <div className={`w-full max-w-2xl p-4 md:p-6 bg-background border border-border rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 space-y-2 md:space-y-0">
        <h3 className="text-lg font-semibold">Aging Balance</h3>
        <RizzuiTooltip size="sm" shadow="lg" placement="left" content={<CustomContent />}>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </RizzuiTooltip>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Receivables</p>
            <p className="text-2xl font-bold text-primary">${totalValue.toFixed(2)}</p>
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
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              {/* <Tooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
                formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
              /> */}
              <Tooltip
  contentStyle={{
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  }}
  formatter={(value) => [`$${(value as number).toFixed(2)}`, 'Amount']}
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
