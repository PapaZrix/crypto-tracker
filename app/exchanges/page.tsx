import TableItem from '@/components/exchange/TableItem';
import { Exchange } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Popular Exchanges | CryptoTracker',
  description:
    'Check out the top crypto exchanges right now and visit their website to start buying/selling crypto',
};

async function getExchanges() {
  const res = await fetch('https://api.coingecko.com/api/v3/exchanges');
  const data = await res.json();

  return data;
}

export default async function Exchanges() {
  const exchanges: Exchange[] = await getExchanges();

  return (
    <div className='h-screen sm:h-auto flex mt-8 sm:p-5 flex-col w-full 2xl:w-10/12 mx-auto'>
      <div className='w-full overflow-scroll sm:overflow-auto relative'>
        <table
          id='exchanges'
          className='w-full relative text-sm sm:text-[16px]'
        >
          <thead className='w-full sticky top-0 z-30 text-center'>
            <tr>
              <th className='w-[20px] sticky left-0 sm:w-[20px] text-start z-20 bg-gray-200 dark:bg-gray-700'>
                #
              </th>
              <th className='text-start sticky max-w-[100px] left-[40px] z-20 bg-gray-200 dark:bg-gray-700'>
                Name
              </th>
              <th className='text-center whitespace-nowrap bg-gray-200 dark:bg-gray-700'>
                Trust Score
              </th>
              <th className='text-center bg-gray-200 dark:bg-gray-700'>
                Country
              </th>
              <th className='text-center whitespace-nowrap bg-gray-200 dark:bg-gray-700'>
                Year Established
              </th>
              <th className='text-center bg-gray-200 dark:bg-gray-700'>
                Trade
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-600'>
            {exchanges.slice(0, 30).map((exc) => {
              return (
                <TableItem
                  key={exc.name}
                  country={exc.country}
                  image={exc.image}
                  name={exc.name}
                  trust_score={exc.trust_score}
                  trust_score_rank={exc.trust_score_rank}
                  url={exc.url}
                  year_established={exc.year_established}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
