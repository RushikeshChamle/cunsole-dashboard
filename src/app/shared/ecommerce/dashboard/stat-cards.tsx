'use client';


import React, { useState, useEffect } from 'react';
import MetricCard from '@components/cards/metric-card';
import { Text } from 'rizzui';
import cn from '@utils/class-names';
import { BsPatchExclamation } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import {
  PiCaretDoubleUpDuotone,
  PiCaretDoubleDownDuotone,
  PiBankDuotone,
} from 'react-icons/pi';
import axiosInstance from '@/axiosInstance';

interface SummaryData {
  outstanding: {
    current: number;
    previous: number;
    change: number;
  };
  overdue: {
    current: number;
    previous: number;
    change: number;
  };
  due: {
    current: number;
    previous: number;
    change: number;
  };
}

export default function StatCards({ className }: { className?: string }) {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axiosInstance.get<{ summary: SummaryData }>('/invoices/invoice_summary_cards/');
        setSummaryData(response.data.summary);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!summaryData) return null;

  const cardData = [
    {
      id: '1',
      icon: <PiBankDuotone />,
      title: 'Outstanding',
      metric: `$${summaryData.outstanding.current.toLocaleString()}`,
      increased: summaryData.outstanding.change > 0,
      decreased: summaryData.outstanding.change < 0,
      percentage: Math.abs(summaryData.outstanding.change).toFixed(2),
      style: 'text-[#7a9cf4]',
    },
    {
      id: '2',
      icon: <BsPatchExclamation />,
      title: 'Overdue',
      metric: `$${summaryData.overdue.current.toLocaleString()}`,
      increased: summaryData.overdue.change > 0,
      decreased: summaryData.overdue.change < 0,
      percentage: Math.abs(summaryData.overdue.change).toFixed(2),
      style: 'text-[#ff8a8a]',
    },
    {
      id: '3',
      icon: <LiaFileInvoiceDollarSolid className="h-6 w-6" />,
      title: 'Due',
      metric: `$${summaryData.due.current.toLocaleString()}`,
      increased: summaryData.due.change > 0,
      decreased: summaryData.due.change < 0,
      percentage: Math.abs(summaryData.due.change).toFixed(2),
      style: 'text-[#a87ac7]',
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 3xl:gap-8 4xl:gap-9', className)}>
      {cardData.map((card) => (
        <MetricCard
          key={card.title + card.id}
          title={card.title}
          metric={card.metric}
          metricClassName="lg:text-[22px]"
          icon={card.icon}
          iconClassName={cn(
            '[&>svg]:w-10 [&>svg]:h-6 lg:[&>svg]:w-[28px] lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5',
            card.id === '1' &&
              '[&>svg]:w-9 [&>svg]:h-7 lg:[&>svg]:w-[42px] lg:[&>svg]:h-[34px]',
            card.style
          )}
          className="@container [&>div]:items-center"
        >
          <Text className="mt-5 flex items-center border-t border-dashed border-muted pt-4 leading-none text-gray-500">
            <Text
              as="span"
              className={cn(
                'me-2 inline-flex items-center font-medium',
                card.increased ? 'text-green' : 'text-red'
              )}
            >
              {card.increased ? (
                <PiCaretDoubleUpDuotone className="me-1 h-4 w-4" />
              ) : (
                <PiCaretDoubleDownDuotone className="me-1 h-4 w-4" />
              )}
              {card.percentage}%
            </Text>
            <Text as="span" className="me-1 hidden @[240px]:inline-flex">
              {card.increased ? 'Increased' : 'Decreased'}
            </Text>{' '}
            last month
          </Text>
        </MetricCard>
      ))}
    </div>
  );
}