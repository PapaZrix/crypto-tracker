import TableItem from '@/components/exchange/TableItem';
import { Exchange } from '@/types';

async function getExchanges() {
  const res = await fetch('https://api.coingecko.com/api/v3/exchanges', {
    next: { revalidate: 1200 },
  });
  const data = await res.json();

  return data;
}

export default async function Exchanges() {
  const exchanges: Exchange[] = await getExchanges();

  return (
    <div className='flex p-5 flex-col w-10/12 mx-auto'>
      <div className='relative overflow-x-auto'>
        <table className='w-full table-auto divide-y divide-gray-500'>
          <thead>
            <tr>
              <th className='pl-4 text-start'>#</th>
              <th className='pl-4 text-start'>Name</th>
              <th className='p-4 text-center'>Trust Score</th>
              <th className='p-4 text-center'>Country</th>
              <th className='p-4 text-center'>Year Established</th>
              <th className='p-4 text-center'>Trade</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-500'>
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
