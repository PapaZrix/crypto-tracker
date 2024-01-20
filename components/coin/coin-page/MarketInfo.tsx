import millify from 'millify';
import type { CoinPageParams, Currency } from '@/types';
import { checkPercentSign } from '@/utils/checkSign';

type MarketInfoProps = {
  coin: CoinPageParams;
  selectedCurrency: Currency;
};

export default function MarketInfo({
  coin,
  selectedCurrency,
}: MarketInfoProps) {
  return (
    <div className='mt-6 w-full'>
      <h2 className='text-xl bold'>
        {coin.symbol.toUpperCase()} Market Information
      </h2>
      <div className='mt-2 w-full flex justify-between'>
        <div className='w-full'>
          <p className='text-gray-500'>Popularity</p>
          <p>#{coin.market_data.market_cap_rank}</p>
        </div>
        <div className='w-full'>
          <p className='text-gray-500'>Market Cap</p>
          <p>
            {millify(coin.market_data.market_cap[selectedCurrency.name ?? ''], {
              precision: 2,
            })}
          </p>
        </div>
        <div className='w-full'>
          <p className='text-gray-500'>Volume (24h)</p>
          <p>
            {millify(
              coin.market_data.total_volume[selectedCurrency.name ?? ''],
              {
                precision: 2,
              }
            )}
          </p>
        </div>
        <div className='w-full'>
          <p className='text-gray-500'>Circulating Supply</p>
          <p>
            {millify(coin.market_data.circulating_supply, {
              precision: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
