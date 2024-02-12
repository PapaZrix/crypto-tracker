import TopInfo from '@/components/nft/TopInfo';
import { NftProps } from '@/types';
import { formatValue } from '@/lib/utils';
import { notFound } from 'next/navigation';
import HistoryTable from '@/components/nft/HistoryTable';
import MarketInfo from '@/components/nft/MarketInfo';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;

  const res = await fetch(`https://api.coingecko.com/api/v3/nfts/${id}`);

  if (!res.ok) notFound();

  const nft: NftProps = await res.json();

  return {
    title: `${nft?.name} NFT Collection Latest Price, Sales and Market Data`,
    description: nft?.description,
    keywords: `Buy ${nft?.name ?? 'NFT'} ${nft?.symbol?.toUpperCase() ?? 'NFT'}`,
    openGraph: {
      images: [nft?.image?.small ?? ''],
      description: `Check ${nft?.name ?? 'Coin'} (${
        nft?.symbol?.toUpperCase() ?? 'Coin'
      }) price and its recent market movement`,
      title: `${nft?.name ?? 'Coin'} price today`,
    },
  };
}

async function getNft(id: string) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/nfts/${id}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) notFound();
    const nft = await res.json();
    return nft;
  } catch (error) {
    if (error instanceof TypeError) {
      return undefined;
    }
  }
}

export default async function NftView({ params }: { params: { id: string } }) {
  const nft: NftProps = await getNft(params.id);
  const movement = nft?.floor_price_24h_percentage_change.native_currency > 0 ? 'up' : 'down';

  return (
    <div className='mt-4 flex flex-col p-4 sm:p-5 w-full lg:w-11/12 xl:w-10/12 2xl:w-9/12 mx-auto'>
      <TopInfo {...nft} />
      <hr className='mt-3 border-black dark:border-orange-500' />
      <div className='mt-3 mb-2 flex justify-around gap-2 text-gray-600 dark:text-gray-400'>
        <div className='flex flex-col'>
          <p>Total Owners</p>
          <p className='font-semibold text-black dark:text-white flex gap-1'>
            {nft.number_of_unique_addresses}{' '}
            <span className='hidden sm:block'>
              ({((nft.number_of_unique_addresses / nft.total_supply) * 100).toFixed(2)}%)
            </span>
          </p>
        </div>
        <div className='flex flex-col'>
          <p>24h Sales</p>
          <p className='font-semibold text-black dark:text-white'>{nft.one_day_sales}</p>
        </div>
        <div className='flex flex-col'>
          <p>Total Supply</p>
          <p className='font-semibold text-black dark:text-white'>{nft.total_supply}</p>
        </div>
        <div className='flex flex-col'>
          <p>24h Average</p>
          <p className='font-semibold text-black dark:text-white'>
            {formatValue(nft.one_day_average_sale_price)} {nft.native_currency_symbol}
          </p>
        </div>
      </div>
      <hr className='mt-2 border-black dark:border-orange-500' />
      <div className='mt-4'>
        <h2 className='text-3xl mt-4'>{nft.symbol.toUpperCase()} Price Live Data</h2>
        <p className='mt-4 dark:text-[#B7BDC6]'>
          {nft.name} price is updated every 5 minutes due to API restrictions. The live price of{' '}
          {nft.name} is{' '}
          <span className='font-semibold'>
            {nft.floor_price.native_currency} {nft.native_currency_symbol}
          </span>{' '}
          with a current market cap of{' '}
          <span className='font-semibold'>
            {nft.market_cap.native_currency} {nft.native_currency_symbol}.
          </span>{' '}
          {nft.name} is {movement}
          <span
            className={`${
              nft.floor_price_24h_percentage_change.native_currency < 0
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {' '}
            {nft.floor_price_24h_percentage_change.native_currency.toFixed(2)}%
          </span>{' '}
          in the last 24 hours with a total supply of{' '}
          <span className='font-semibold'>
            {nft.total_supply} {nft.symbol.toUpperCase()}.
          </span>
        </p>
      </div>
      <HistoryTable {...nft} />
      <MarketInfo {...nft} />
      {nft.description.length === 0 ? null : (
        <div className='w-full mt-10 mb-2'>
          <h2 className='text-3xl'>
            About {nft.name} ({nft.symbol.toUpperCase()})
          </h2>
          <div
            id='description'
            dangerouslySetInnerHTML={{ __html: nft.description }}
            className='mt-3 leading-7 whitespace-normal'
          ></div>
        </div>
      )}
    </div>
  );
}
