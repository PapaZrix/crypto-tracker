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

export type SearchCoin = {
  name: string;
  id: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
};

export type Currency = {
  name: string | undefined;
  symbol: string | undefined;
};

export type CoinPageParams = {
  id: string;
  name: string;
  symbol: string;
  description: { en: string };
  image: { large: string };
  market_data: {
    current_price: { [key: string]: number };
    ath: { [key: string]: number };
    ath_date: { [key: string]: number };
    market_cap: { [key: string]: number };
    market_cap_rank: number;
    total_volume: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    price_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: { [key: string]: number };
    price_change_percentage_7d_in_currency: { [key: string]: number };
    price_change_percentage_14d_in_currency: { [key: string]: number };
    price_change_percentage_30d_in_currency: { [key: string]: number };
    price_change_percentage_60d_in_currency: { [key: string]: number };
    price_change_percentage_24h_in_currency: { [key: string]: number };
    circulating_supply: number;
  };
};

export type Ticker = [timestamp: Date, price: number];

export type GraphData = [Ticker[]];
