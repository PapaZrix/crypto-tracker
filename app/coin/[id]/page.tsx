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

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
    next: { revalidate: 6000 },
  });
  const coin: CoinPageParams = await res.json();
  return {
    title: `${coin.name} price today, ${coin.symbol.toUpperCase()} to USD live price`,
    description: coin.description.en,
    keywords: `Buy ${coin.name} ${coin.symbol.toUpperCase()} USD crypto`,
    metadataBase: new URL('https://crypto-tracker-sepia-chi.vercel.app'),
    openGraph: {
      images: coin.image.large,
      description: `Check ${
        coin.name
      } (${coin.symbol.toUpperCase()}) price and its recent market movement`,
      title: `${coin.name} price today`,
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
