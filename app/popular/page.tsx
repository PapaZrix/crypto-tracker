'use client';

import { TableCoin } from '@/types';
import { useEffect, useState } from 'react';
import { filters } from '@/constants';
import Loader from '@/components/layout/Loader';
import TableItem from '@/components/popular/TableItem';
import { getCoins } from '@/utils/getCoins';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';

const ITEMS_PER_PAGE = 20;

export default function PopularTable() {
  const [coins, setCoins] = useState<TableCoin[] | null>([] || null);
  const [visibleCoins, setVisibleCoins] = useState<TableCoin[] | null>(
    [] || null
  );
  const [activeFilter, setActiveFilter] = useState<any>(filters[2]);

  useEffect(() => {
    const getFirstPageCoins = async () => {
      const coins: any = await getCoins();
      setCoins(coins);
      return setVisibleCoins(coins.slice(0, ITEMS_PER_PAGE));
    };
    getFirstPageCoins();
  }, []);

  if (visibleCoins?.length === 0) {
    return (
      <div className='h-[calc(100vh_-_78px)] sm:h-[calc(100vh_-_83px)] bg-gray-50 dark:bg-gray-900'>
        <Loader />
      </div>
    );
  }

  //   return (
  //     <div className='w-full max-w-5xl mx-auto overflow-x-auto'>
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Cryptocurrency Coins</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <div className='flex overflow-x-auto'>
  //             <Table className='min-w-[1200px]'>
  //               <TableHeader>
  //                 <TableRow>
  //                   <TableHead className='w-[80px] sticky left-0 bg-white'>
  //                     Rank
  //                   </TableHead>
  //                   <TableHead className='max-w-[150px] sticky left-[80px] bg-white'>
  //                     Name
  //                   </TableHead>
  //                   <TableHead className='hidden md:table-cell'>
  //                     Current Price
  //                   </TableHead>
  //                   <TableHead className='hidden md:table-cell'>
  //                     Price Change Percentage in 24 Hours
  //                   </TableHead>
  //                   <TableHead>Market Cap</TableHead>
  //                   <TableHead>Total Volume</TableHead>
  //                   <TableHead>Circulating Supply</TableHead>
  //                 </TableRow>
  //               </TableHeader>
  //               <TableBody>
  //                 {visibleCoins?.map((coin) => (
  //                   <TableRow key={coin.id}>
  //                     <TableCell {...coin}></TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }
  return (
    <div className='flex p-5 flex-col w-9/12 mx-auto'>
      <div className='w-full'>
        <table className='w-full'>
          <thead className='bg-gray-200 dark:bg-gray-700'>
            <tr>
              <th>#</th>
              <th className='text-start'>Name</th>
              <th>Price</th>
              <th>24h %</th>
              <th className='text-end'>Market Cap</th>
              <th className='text-end'>Total Volume</th>
              <th className='text-end'>Circulating Supply</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-500'>
            {visibleCoins?.map((coin) => {
              return (
                <TableItem
                  key={coin.id}
                  id={coin.id}
                  current_price={coin.current_price}
                  market_cap={coin.market_cap}
                  market_cap_rank={coin.market_cap_rank}
                  name={coin.name}
                  price_change_percentage_24h={coin.price_change_percentage_24h}
                  symbol={coin.symbol}
                  total_supply={coin.total_supply}
                  total_volume={coin.total_volume}
                  image={coin.image}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
