'use client';

import { Currency, GraphData, Ticker } from '@/types';
import { formatPrice } from '@/utils/format';
import { useState } from 'react';

export default function useGraphData() {
  const [graphData, setGraphData] = useState<GraphData>();
  const [isLoading, setIsLoading] = useState(false);
  const [graphRange, setGraphRange] = useState(30);

  const handleGraphRange = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGraphRange(Number(event.currentTarget.value));
  };

  const getGraphData = async (id: string, currency: Currency, range: number) => {
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
      const data = await res.json();

      const graphData = data.prices.map((price: Ticker) => {
        const [timestamp, p] = price;
        const date = new Date(timestamp).toLocaleDateString('en-gb', {
          day: 'numeric',
          month: 'numeric',
          year: '2-digit',
        });

        return {
          Date: date,
          Price: Number(formatPrice(p)),
          Time: new Date(timestamp).toLocaleTimeString(),
        };
      });

      setIsLoading(false);
      setGraphData(graphData);
    } catch (error) {
      if (error instanceof TypeError) {
        setGraphData(undefined);
        setIsLoading(false);
      }
    }
  };

  return { graphData, isLoading, getGraphData, handleGraphRange, graphRange };
}
