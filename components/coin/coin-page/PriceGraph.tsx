import { graphRanges } from '@/constants';
import { Currency, GraphData } from '@/types';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import Loader from '@/components/layout/Loader';
import { useTheme } from 'next-themes';

type PriceGraphProps = {
  graphData: GraphData | undefined;
  graphRange: number;
  handleGraphRange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCurrency: Currency;
  isLoading: boolean;
};

export default function PriceGraph({
  graphData,
  graphRange,
  handleGraphRange,
  selectedCurrency,
  isLoading,
}: PriceGraphProps) {
  const { theme } = useTheme();

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex h-full w-full mt-4'>
          {/* <ResponsiveContainer>
            <ComposedChart
              data={graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#129a74' stopOpacity={0.1} />
                  <stop offset='95%' stopColor='#FFFFFF' stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='1 1' vertical={false} />
              <XAxis dataKey='Date' />
              <YAxis
                tickCount={6}
                type='number'
                dy={-5}
                domain={['dataMin', 'dataMax']}
              />
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
              />
              <Area
                type='monotone'
                dataKey='Price'
                stroke='false'
                strokeWidth={2}
                fillOpacity={0.3}
                fill='#d1d5db'
              />
            </ComposedChart>
          </ResponsiveContainer> */}
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
              <defs>
                <filter id='shadow' height='200%'>
                  <feDropShadow
                    dx='0'
                    dy='10'
                    stdDeviation='10'
                    floodColor='#fb923c'
                    floodOpacity='0.7'
                  />
                </filter>
              </defs>
              <CartesianGrid strokeDasharray='1 1' vertical={false} />
              <XAxis dataKey='Date' dy={8} />
              <YAxis
                tickCount={6}
                type='number'
                dy={-5}
                domain={['dataMin', 'dataMax']}
              />
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
                strokeLinecap='round'
                filter='url(#shadow)'
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
