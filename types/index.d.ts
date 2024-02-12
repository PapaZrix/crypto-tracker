export type TrendingCoin = {
  item: {
    name: string;
    large: string;
    id: string;
    data: {
      price: string;
      price_change_percentage_24h: {
        usd: number;
      };
    };
  };
};

export type TrendingNft = {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  native_currency_symbol: string;
  floor_price_24h_percentage_change: number;
  floor_price_in_native_currency: number;
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
    ath_date: { [key: string]: Date };
    market_cap: { [key: string]: number };
    market_cap_rank: number;
    total_volume: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    price_change_24h: number;
    price_change_24h_in_currency: { [key: string]: number };
    price_change_percentage_7d: number;
    price_change_percentage_7d_in_currency: { [key: string]: number };
    price_change_percentage_14d: number;
    price_change_percentage_14d_in_currency: { [key: string]: number };
    price_change_percentage_30d: number;
    price_change_percentage_30d_in_currency: { [key: string]: number };
    price_change_percentage_60d: number;
    price_change_percentage_60d_in_currency: { [key: string]: number };
    price_change_percentage_24h_in_currency: { [key: string]: number };
    circulating_supply: number;
  };
};

export type NftProps = {
  name: string;
  symbol: string;
  image: { small: string };
  description: string;
  contract_address: string;
  native_currency: string;
  native_currency_symbol: string;
  floor_price: { native_currency: number };
  market_cap: { native_currency: number };
  volume_24h: { native_currency: number };
  floor_price_24h_percentage_change: { native_currency: number };
  market_cap_24h_percentage_change: { native_currency: number };
  volume_24h_percentage_change: { native_currency: number };
  number_of_unique_addresses: number;
  total_supply: number;
  one_day_sales: number;
  one_day_average_sale_price: number;
  links: { homepage: string; twitter: string; discord: string };
  floor_price_7d_percentage_change: { native_currency: number };
  floor_price_14d_percentage_change: { native_currency: number };
  floor_price_30d_percentage_change: { native_currency: number };
  floor_price_60d_percentage_change: { native_currency: number };
  floor_price_1y_percentage_change: { native_currency: number };
  explorers: [{ link: string }];
};

export type Ticker = [timestamp: Date, price: number];

export type GraphData = [Ticker[]];
