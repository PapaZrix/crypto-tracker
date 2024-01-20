import type { CoinPageParams, Currency } from '@/types';
import { checkPercentSign, checkPriceSign } from '@/utils/checkSign';

type HistoryTableProps = {
  coin: CoinPageParams;
  selectedCurrency: Currency;
};

function getPriceChange(price: any, percentage: any): any {
  let priceChange = 0;
  if (percentage < 0) {
    priceChange = price * (percentage / 100);
    return priceChange.toFixed(3);
  } else {
    let multiplier: number = percentage / 100;
    return (price * (1 + multiplier) - price).toFixed(2);
  }
}

export default function HistoryTable({
  coin,
  selectedCurrency,
}: HistoryTableProps) {
  return (
    <div className='mt-6 w-full'>
      <h3 className='text-xl bold'>
        {coin.symbol.toUpperCase()} Price History{' '}
        {selectedCurrency.name?.toUpperCase()}
      </h3>
      <div className='relative overflow-x-auto'>
        <table className='mt-2 w-full table-auto'>
          <thead className='text-xs sm:text-base'>
            <th scope='col' className='px-1 py-2 text-start pl-4'>
              Date Comparison
            </th>
            <th scope='col' className='text-end pr-4'>
              Amount Change
            </th>
            <th scope='col' className='text-end pr-4'>
              % Change
            </th>
          </thead>
          <tbody className='text-sm sm:text-base my-4'>
            {/* 1st Row */}
            <tr>
              <td className='p-1 text-start pl-4'>Today</td>
              <td
                className={`text-end pr-4 ${checkPriceSign(
                  getPriceChange(
                    coin.market_data.current_price[selectedCurrency.name ?? ''],
                    coin.market_data.price_change_percentage_24h_in_currency[
                      selectedCurrency.name ?? ''
                    ]
                  )
                )}`}
              >
                {selectedCurrency.symbol}{' '}
                {getPriceChange(
                  coin.market_data.current_price[selectedCurrency.name ?? ''],
                  coin.market_data.price_change_percentage_24h_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                )}
              </td>
              <td
                className={`text-end pr-4 ${checkPercentSign(
                  coin.market_data.price_change_percentage_24h_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                )}`}
              >
                {coin.market_data.price_change_percentage_24h_in_currency[
                  selectedCurrency.name ?? ''
                ].toFixed(2)}
                %
              </td>
            </tr>
            {/* 2nd Row */}
            <tr>
              <td className='p-1 text-start pl-4'>7 Days</td>
              <td
                className={`text-end pr-4 ${checkPriceSign(
                  getPriceChange(
                    coin.market_data.current_price[selectedCurrency.name ?? ''],
                    coin.market_data.price_change_percentage_7d_in_currency[
                      selectedCurrency.name ?? ''
                    ]
                  )
                )}`}
              >
                {selectedCurrency.symbol}{' '}
                {getPriceChange(
                  coin.market_data.current_price[selectedCurrency.name ?? ''],
                  coin.market_data.price_change_percentage_7d_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                )}
              </td>
              <td
                className={`text-end pr-4 ${checkPercentSign(
                  coin.market_data.price_change_percentage_7d_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                )}`}
              >
                {coin.market_data.price_change_percentage_7d_in_currency[
                  selectedCurrency.name ?? ''
                ].toFixed(2)}
                %
              </td>
            </tr>
            {/* 3rd Row */}
            <tr>
              <td className='p-1 text-start pl-4'>30 Days</td>
              <td
                className={`text-end pr-4 ${checkPriceSign(
                  getPriceChange(
                    coin.market_data.current_price[selectedCurrency.name ?? ''],
                    coin.market_data.price_change_percentage_30d_in_currency[
                      selectedCurrency.name ?? ''
                    ]
                  )
                )}`}
              >
                {selectedCurrency.symbol}{' '}
                {getPriceChange(
                  coin.market_data.current_price[selectedCurrency.name ?? ''],
                  coin.market_data.price_change_percentage_30d_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                )}
              </td>
              <td
                className={`text-end pr-4 ${checkPercentSign(
                  coin.market_data.price_change_percentage_30d_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                )}`}
              >
                {coin.market_data.price_change_percentage_30d_in_currency[
                  selectedCurrency.name ?? ''
                ].toFixed(2)}
                %
              </td>
            </tr>
            {/* 4th Row */}
            <tr>
              <td className='p-1 text-start pl-4'>60 Days</td>
              <td
                className={`text-end pr-4 ${checkPriceSign(
                  getPriceChange(
                    coin.market_data.current_price[selectedCurrency.name ?? ''],
                    coin.market_data.price_change_percentage_60d_in_currency[
                      selectedCurrency.name ?? ''
                    ]
                  )
                )}`}
              >
                {selectedCurrency.symbol}{' '}
                {getPriceChange(
                  coin.market_data.current_price[selectedCurrency.name ?? ''],
                  coin.market_data.price_change_percentage_60d_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                )}
              </td>
              <td
                className={`text-end pr-4 ${checkPercentSign(
                  coin.market_data.price_change_percentage_60d_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                )}`}
              >
                {coin.market_data.price_change_percentage_60d_in_currency[
                  selectedCurrency.name ?? ''
                ].toFixed(2)}
                %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
