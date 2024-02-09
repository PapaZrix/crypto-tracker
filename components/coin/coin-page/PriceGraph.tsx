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
import useWindowSize from '@/hooks/useWindowSize';
import { useTheme } from 'next-themes';
import Image from 'next/image';

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
  const { width } = useWindowSize();
  const { theme } = useTheme();
  const axisColor = theme === 'light' ? '#4b5563' : '#9ca3af';

  return (
    <>
      <div className='w-full sm:w-auto text-sm sm:text-base flex gap-4 sm:gap-6 text-gray-400 dark:text-gray-500 cursor-pointer'>
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
              className='text-gray-600 dark:text-gray-400 hover:text-orange-500'
              onClick={handleGraphRange}
            >
              {range.symbol}
            </button>
          )
        )}
      </div>
      {graphData === undefined && isLoading === false ? (
        <div className='h-56 sm:h-[22.5rem] flex flex-col gap-4 items-center justify-center'>
          <Image
            src='/assets/images/sad-kry.png'
            alt='error'
            width={width < 640 ? 100 : 200}
            height={width < 640 ? 100 : 200}
            className='rounded-full'
          />
          <p className='text-lg text-center sm:mx-w-max mx-auto sm:text-xl'>
            The API has no more requests left, please try again in a minute by switching the graph
            range above or refreshing the page
          </p>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className='flex h-full w-full mt-0 sm:mt-4'>
          {width < 640 ? (
            <LineChart
              data={graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              width={600}
              height={300}
              className='h-full w-full'
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
              <XAxis
                padding={{ right: 20 }}
                tick={{ fontSize: 12.5 }}
                dataKey='Date'
                dy={8}
                stroke={axisColor}
              />
              <YAxis
                tickCount={6}
                type='number'
                dy={-5}
                domain={['dataMin', 'dataMax']}
                orientation='right'
                stroke={axisColor}
                tick={{ fontSize: 12.5 }}
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
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={graphData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 32.5,
                  bottom: 5,
                }}
                className='h-full w-full'
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
                <XAxis dataKey='Date' dy={8} stroke={axisColor} tick={{ fontSize: 12.5 }} />
                <YAxis
                  stroke={axisColor}
                  tickCount={6}
                  type='number'
                  dy={2}
                  domain={['dataMin', 'dataMax']}
                  tick={{ fontSize: 12.5 }}
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
          )}
        </div>
      )}
    </>
  );
}
