import { NftProps } from '@/types';
import { checkPercentSign, checkPriceSign, getPriceChange } from '@/lib/utils';

export default function HistoryTable(nft: NftProps) {
  return (
    <div className='mt-6 w-full'>
      <h3 className='mb-4 sm:mb-0 text-xl bold'>
        {nft.symbol.toUpperCase()} Price History {nft.native_currency_symbol.toUpperCase()}
      </h3>
      <div className='relative overflow-visible'>
        <table className='mt-2 w-full table-auto'>
          <thead className='text-xs sm:text-base'>
            <tr className='bg-gray-200 dark:bg-gray-800'>
              <th scope='col' className='px-1 py-2 text-start pl-4'>
                Date Comparison
              </th>
              <th scope='col' className='text-end pr-4'>
                Amount Change
              </th>
              <th scope='col' className='text-end pr-4'>
                % Change
              </th>
            </tr>
          </thead>
          <tbody className='text-sm sm:text-base sm:leading-3 my-4'>
            {/* 1st Row */}
            <tr>
              <td className='p-1 text-start pl-4'>Today</td>
              <td
                className={`text-end pr-4 ${checkPriceSign(
                  getPriceChange(
                    nft.floor_price.native_currency,
                    nft.floor_price_24h_percentage_change.native_currency
                  )
                )}`}
              >
                {getPriceChange(
                  nft.floor_price.native_currency,
                  nft.floor_price_24h_percentage_change.native_currency
                )}{' '}
                {nft.native_currency_symbol}
              </td>
              <td
                className={`text-end pr-4 ${checkPercentSign(
                  nft.floor_price_24h_percentage_change.native_currency
                )}`}
              >
                {nft.floor_price_24h_percentage_change.native_currency.toFixed(2)}%
              </td>
            </tr>
            {/* 2nd Row */}
            <tr>
              <td className='p-1 text-start pl-4'>7 Days</td>
              <td
                className={`text-end pr-4 ${checkPriceSign(
                  getPriceChange(
                    nft.floor_price.native_currency,
                    nft.floor_price_7d_percentage_change.native_currency
                  )
                )}`}
              >
                {getPriceChange(
                  nft.floor_price.native_currency,
                  nft.floor_price_7d_percentage_change.native_currency
                )}{' '}
                {nft.native_currency_symbol}
              </td>
              <td
                className={`text-end pr-4 ${checkPercentSign(
                  nft.floor_price_7d_percentage_change.native_currency
                )}`}
              >
                {nft.floor_price_7d_percentage_change.native_currency.toFixed(2)}%
              </td>
            </tr>
            {/* 3rd Row */}
            <tr>
              <td className='p-1 text-start pl-4'>30 Days</td>
              <td
                className={`text-end pr-4 ${checkPriceSign(
                  getPriceChange(
                    nft.floor_price.native_currency,
                    nft.floor_price_30d_percentage_change.native_currency
                  )
                )}`}
              >
                {getPriceChange(
                  nft.floor_price.native_currency,
                  nft.floor_price_30d_percentage_change.native_currency
                )}{' '}
                {nft.native_currency_symbol}
              </td>
              <td
                className={`text-end pr-4 ${checkPercentSign(
                  nft.floor_price_30d_percentage_change.native_currency
                )}`}
              >
                {nft.floor_price_30d_percentage_change.native_currency.toFixed(2)}%
              </td>
            </tr>
            {/* 4th Row */}
            <tr>
              <td className='p-1 text-start pl-4'>60 Days</td>
              <td
                className={`text-end pr-4 ${checkPriceSign(
                  getPriceChange(
                    nft.floor_price.native_currency,
                    nft.floor_price_60d_percentage_change.native_currency
                  )
                )}`}
              >
                {getPriceChange(
                  nft.floor_price.native_currency,
                  nft.floor_price_60d_percentage_change.native_currency
                )}{' '}
                {nft.native_currency_symbol}
              </td>
              <td
                className={`text-end pr-4 ${checkPercentSign(
                  nft.floor_price_60d_percentage_change.native_currency
                )}`}
              >
                {nft.floor_price_60d_percentage_change.native_currency.toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
