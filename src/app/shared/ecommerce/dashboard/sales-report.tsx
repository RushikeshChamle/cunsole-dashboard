


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
            title="Credit Sales vs Balance Due"
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





