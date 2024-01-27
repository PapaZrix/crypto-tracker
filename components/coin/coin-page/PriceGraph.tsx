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
import { IoMdInformationCircleOutline } from 'react-icons/io';

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
  const textColor = theme === 'light' ? '#4b5563' : '#9ca3af';

  return (
    <>
      <div className='w-full sm:w-auto text-sm sm:text-base flex gap-4 sm:gap-6 text-gray-400 dark:text-gray-500 cursor-pointer'>
        {graphRange === 1 ? (
          <div className='mt-4 flex justify-center gap-1 items-center relative'>
            <p className='text-lg underline text-black dark:text-gray-300 font-semibold'>
              Data for this coin is available only for the last 24 hours
            </p>
            <div className='group relative flex justify-center'>
              <button>
                <IoMdInformationCircleOutline
                  size='1.5rem'
                  className='text-gray-700 dark:text-white cursor-pointer'
                />
              </button>
              <div className='invisible absolute -left-10 bottom-5 sm:-left-[0.35rem] sm:bottom-6 group-hover:visible'>
                <div className='w-24 bg-gray-200 text-black dark:bg-gray-800 rounded px-3 py-2 text-center dark:text-white sm:w-56'>
                  Some coins do not have all the necessary market data information from the API
                </div>
                <div
                  style={{
                    borderColor: '#5E6673 transparent transparent transparent',
                    borderWidth: '6px 8px 0 8px',
                  }}
                  className='border-solid w-2 mx-[10px]'
                ></div>
              </div>
            </div>
          </div>
        ) : (
          graphRanges.map((range) =>
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
          <p className='text-lg max-w-[300px] sm:max-w-max mx-auto sm:text-xl'>
            The API has no more requests left, please try again in a minute or so
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
                className='text-base sm:text-base'
                dataKey='Date'
                dy={8}
                stroke={textColor}
              />
              <YAxis
                tickCount={6}
                type='number'
                dy={-5}
                domain={['dataMin', 'dataMax']}
                orientation='right'
                stroke={textColor}
                className='text-base sm:text-base'
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
                  top: 5,
                  right: 30,
                  left: 20,
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
                <XAxis dataKey='Date' dy={8} stroke={textColor} />
                <YAxis
                  stroke={textColor}
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
          )}
        </div>
      )}
    </>
  );
}
