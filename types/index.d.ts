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

export type TableCoin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_supply: number;
  total_volume: number;
};

export type Exchange = {
  name: string;
  year_established: number;
  country: string;
  url: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
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
    market_cap: { [key: string]: number };
    market_cap_rank: number;
    total_volume: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    price_change_24h: number;
    price_change_24h_in_currency: { [key: string]: number };
    price_change_percentage_7d: number;
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
