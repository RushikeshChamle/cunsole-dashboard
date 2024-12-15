import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
const RADIAN = Math.PI / 180;
interface CreditScorePieChartProps {
  creditScore: number; // Current credit score
  maxScore?: number; // Maximum credit score, defaults to 850
}

const CreditScorePieChart: React.FC<CreditScorePieChartProps> = ({
  creditScore,
  maxScore = 850,
}) => {
  // Define credit score ranges and colors
  const getCreditScoreData = (score: number) => {
    const ranges = [
      { range: 'Poor', min: 0, max: 579, color: '#FF6B6B' },
      { range: 'Fair', min: 580, max: 669, color: '#FFD93D' },
      { range: 'Good', min: 670, max: 739, color: '#6BCB77' },
      { range: 'Very Good', min: 740, max: 799, color: '#4D96FF' },
      { range: 'Exceptional', min: 800, max: 850, color: '#9C27B0' },
    ];
    const currentRange = ranges.find(r => score >= r.min && score <= r.max) || ranges[0];
    return [
      { name: 'Credit Score', value: score, color: currentRange.color },
      { name: 'Remaining', value: maxScore - score, color: '#E0E0E0' },
    ];
  };
  const data = getCreditScoreData(creditScore);
  const cx = 150; // Center x-coordinate
  const cy = 200; // Center y-coordinate
  const iR = 50; // Inner radius
  const oR = 100; // Outer radius
  // Enhanced Needle
  const renderNeedle = (value: number, data: any[], cx: number, cy: number, iR: number, oR: number) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5; // Needle base radius
    const x0 = cx; // Needle center
    const y0 = cy; // Needle center
    const xba = x0 + r * sin; // Needle base A
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin; // Needle base B
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos; // Needle tip
    const yp = y0 + length * sin;
    return (
      <>
        <circle key="needle-base" cx={x0} cy={y0} r={r} fill="gold" stroke="black" strokeWidth={1} />
        <path
          key="needle-path"
          d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
          stroke="none"
          fill="url(#needleGradient)"
        />
        <defs key="needle-defs">
          <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#FF5722', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FFC107', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </>
    );
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {renderNeedle(creditScore, data, cx, cy, iR, oR)}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CreditScorePieChart;