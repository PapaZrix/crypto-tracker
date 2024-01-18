'use client';

import { Currency, GraphData, Ticker } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useGraphData() {
  const router = useRouter();
  const [graphData, setGraphData] = useState<GraphData>();
  const [isLoading, setIsLoading] = useState(false);

  const getGraphData = async (
    id: string,
    currency: Currency,
    range: number
  ) => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${range}`;
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 600 },
      });

      if (!res.ok) router.push('/404');

      const data = await res.json();

      const graphData = data.prices.map((price: Ticker) => {
        const [timestamp, p] = price;
        const date = new Date(timestamp).toLocaleDateString('en-us', {
          day: 'numeric',
          month: 'numeric',
          year: '2-digit',
        });

        return {
          Date: date,
          Price: p.toFixed(2),
          Time: new Date(timestamp).toLocaleTimeString(),
        };
      });

      setIsLoading(false);
      setGraphData(graphData);
    } catch (error) {
      console.log(error);
    }
  };

  return { graphData, isLoading, getGraphData };
}
