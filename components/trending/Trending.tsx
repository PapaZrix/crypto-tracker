'use client';

import { TrendingCoin, NFT as NftType } from '@/types';
import Coin from './Coin';
import NFT from './NFT';
import { useState } from 'react';

const currency = [
  { name: 'coins', text: 'Coins' },
  { name: 'nfts', text: 'NFTs' },
];

type TrendingProps = {
  coins: TrendingCoin[];
  nfts: NftType[];
};

export default function Trending({ coins, nfts }: TrendingProps) {
  const [active, setActive] = useState('coins');

  return (
    <div className='w-full'>
      <div className='mb-5 text-sm xl:text-lg flex'>
        {currency.map((curr) => (
          <span
            onClick={() => setActive(curr.name)}
            className={`cursor-pointer px-4 py-2 rounded-full font-semibold hover:text-orange-500 ${
              curr.name === active && 'border border-orange-500 text-orange-500'
            }`}
            key={curr.name}
          >
            {curr.text}
          </span>
        ))}
      </div>
      <div className='grid grid-cols-3 grid-rows-2 gap-4'>
        {active === 'coins'
          ? coins.slice(0, 6).map((coin) => <Coin key={coin.item.name} item={coin.item} />)
          : nfts.slice(0, 6).map((nft) => <NFT key={nft.id} {...nft} />)}
      </div>
    </div>
  );
}
