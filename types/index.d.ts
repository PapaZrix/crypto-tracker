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

export type SelectedCurrency = {
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
    current_price: SelectedCurrency;
    ath: SelectedCurrency;
    ath_date: SelectedCurrency;
    market_cap: SelectedCurrency;
    market_cap_rank: number;
    total_volume: SelectedCurrency;
    high_24h: SelectedCurrency;
    low_24h: SelectedCurrency;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: SelectedCurrency;
    price_change_percentage_24h_in_currency: SelectedCurrency;
    circulating_supply: number;
  };
};
