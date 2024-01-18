'use client';

import { graphRanges } from '@/constants';
import { Currency, GraphData } from '@/types';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  PolarGrid,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

type PriceGraphProps = {
  graphData: GraphData | undefined;
  graphRange: number;
  handleGraphRange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCurrency: Currency;
};

export default function PriceGraph({
  graphData,
  graphRange,
  handleGraphRange,
  selectedCurrency,
}: PriceGraphProps) {
  return (
    <>
      <div className='flex gap-6 text-gray-400 dark:text-gray-500 cursor-pointer'>
        {graphRanges.map((range) =>
          range.days === graphRange ? (
            <button
              value={range.days}
              key={range.days}
              className='text-orange-500'
              onClick={handleGraphRange}
            >
              {range.symbol}
            </button>
          ) : (
            <button
              value={range.days}
              key={range.days}
              className='hover:text-orange-500'
              onClick={handleGraphRange}
            >
              {range.symbol}
            </button>
          )
        )}
      </div>
      <div className='flex h-full w-full mt-4'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={graphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='1 1' vertical={false} />
            <XAxis dataKey='Date' dy={8} />
            <YAxis type='number' dy={-5} domain={['dataMin', 'dataMax']} />
            <Tooltip
              content={
                // @ts-ignore
                <CustomTooltip selectedCurrency={selectedCurrency.symbol} />
              }
            />
            <Line
              dot={false}
              type='monotone'
              dataKey='Price'
              stroke='#f97316'
              activeDot={{ r: 8 }}
              style={{ zIndex: '100' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
