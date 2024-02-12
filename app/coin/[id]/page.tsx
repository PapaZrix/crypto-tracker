import { CoinPageParams } from '@/types';
import { notFound } from 'next/navigation';
import CoinPage from '@/components/coin/coin-page/CoinPage';
import { ResolvingMetadata, Metadata } from 'next';

type MetadataProps = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  if (res.status == 404) notFound();

  const coin: CoinPageParams = await res.json();

  return {
    title: `${coin?.name ?? 'Coin'} price today, ${
      coin?.symbol?.toUpperCase() ?? 'Coin'
    } to USD live price`,
    description:
      coin?.description?.en ??
      'This coin currently has no description available due to API restrictions',
    keywords: `Buy ${coin?.name ?? 'COIN'} ${coin?.symbol?.toUpperCase() ?? 'Coin'} USD crypto`,
    metadataBase: new URL('https://crypto-tracker-sepia-chi.vercel.app'),
    openGraph: {
      images: [coin?.image?.large ?? ''],
      description: `Check ${coin?.name ?? 'Coin'} (${
        coin?.symbol?.toUpperCase() ?? 'Coin'
      }) price and its recent market movement`,
      title: `${coin?.name ?? 'Coin'} price today`,
    },
  };
}

async function getCoin(id: string) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) notFound();
    const coin = await res.json();
    return coin;
  } catch (error) {
    if (error instanceof TypeError) {
      return undefined;
    }
  }
}

export default async function CoinView({ params }: MetadataProps) {
  const coin: CoinPageParams = await getCoin(params.id);

  return <CoinPage coin={coin} params={params} />;
}
