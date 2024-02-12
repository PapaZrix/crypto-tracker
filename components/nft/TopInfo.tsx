import { checkPercentSign, formatPrice } from '@/lib/utils';
import { NftProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function TopInfo(nft: NftProps) {
  return (
    <>
      <div className='flex flex-col sm:flex-row items-center'>
        <div className='flex items-center gap-1 w-full'>
          {!nft.image.small.includes('https') ? (
            <Image
              src='/assets/images/not-available.png'
              width={60}
              height={50}
              alt='not available'
              className='rounded-full dark:invert'
            />
          ) : (
            <Image
              src={nft.image.small}
              width={60}
              height={50}
              alt={nft.name}
              className='rounded-full'
            />
          )}
          <div className='p-2 flex gap-2 items-center'>
            <p className='text-3xl'>{nft.name}</p>
            <p className='text-gray-400 text-xl'>({nft.symbol.toUpperCase()})</p>
          </div>
        </div>
        <div className='flex gap-2 items-center mt-4 sm:mt-0 w-full sm:w-auto sm:mr-2'>
          <p className='text-gray-400 sm:block whitespace-nowrap'>Native Currency:</p>
          <p className='font-medium whitespace-nowrap'>
            {nft.native_currency.charAt(0).toUpperCase().concat(nft.native_currency.slice(1))}
          </p>
        </div>
      </div>
      <div className='flex flex-col justify-center sm:flex-row sm:justify-between mb-2'>
        <div className='my-2 sm:my-0'>
          <div className='mt-2 mb-3 sm:mb-0 sm:mt-4 flex items-center gap-2 sm:gap-4'>
            <div className='flex items-center sm:gap-2'>
              <p className='text-2xl hidden sm:block'>Floor Price: </p>
              <div className='text-2xl'>
                {formatPrice(nft.floor_price.native_currency)} {nft.native_currency_symbol}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <>
                <p
                  className={`text-2xl ${checkPercentSign(
                    nft.floor_price_24h_percentage_change.native_currency
                  )}`}
                >
                  {nft.floor_price_24h_percentage_change.native_currency.toFixed(2)}%
                </p>
                <p className='text-gray-400'>(1D)</p>
              </>
            </div>
          </div>
          <div className='my-2 sm:my-4'>
            <p className='text-gray-400'>
              Created by{' '}
              <Link href={nft.explorers[0].link} className='font-medium text-black dark:text-white'>
                {nft.contract_address
                  .slice(0, 6)
                  .concat('...')
                  .concat(nft.contract_address.slice(36))}
              </Link>
            </p>
          </div>
        </div>
        <div className='flex sm:grid sm:grid-cols-2 gap-2 text-xs sm:text-sm justify-between font-medium'>
          {nft.links.discord ? (
            <>
              <div className='flex items-center gap-2 pl-2'>
                <Image
                  className='dark:invert'
                  src='/assets/images/twitter.png'
                  alt='twitter'
                  width={20}
                  height={40}
                />
                <Link target='_blank' href={nft.links.twitter}>
                  Twitter
                </Link>
              </div>
              <div className='flex items-center gap-1'>
                <Image
                  className='dark:invert'
                  src='/assets/icons/discord.svg'
                  alt='twitter'
                  width={35}
                  height={40}
                />
                <Link target='_blank' href={nft.links.discord}>
                  Discord
                </Link>
              </div>
              <div className='flex items-center gap-[0.15rem]'>
                <Image
                  className='dark:invert'
                  src='/assets/images/homepage.png'
                  alt='twitter'
                  width={35}
                  height={40}
                />
                <Link target='_blank' href={nft.links.homepage}>
                  Website
                </Link>
              </div>
              <div className='flex items-center gap-1'>
                <Image src='/assets/images/etherscan.png' alt='etherscan' width={35} height={40} />
                <Link target='_blank' href={nft.explorers[0].link}>
                  Etherscan
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
