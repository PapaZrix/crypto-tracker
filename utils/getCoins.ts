export const getCoins = async () => {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
  const res = await fetch(url, { next: { revalidate: 1200 } });
  const data = await res.json();
  console.log('COINS', data);
  return data;
};
