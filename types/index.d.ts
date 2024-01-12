export type TrendingCoin = {
  item: {
    name: string;
    large: string;
    id: string;
    data: {
      price: string;
      price_change_percentage_24h: {
        usd: string;
      };
    };
  };
};

export type GlobalMarketData = {
  data: {
    active_cryptocurrencies: number;
    total_market_cap: { usd: number };
    market_cap_change_percentage_24h_usd: number;
  };
};
