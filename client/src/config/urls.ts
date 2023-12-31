export const CoinList = (currency: string) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const TrendChart = (id: string, days = 365, currency: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency: string) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=200&page=1&sparkline=false&price_change_percentage=24h`;

// export const server = "http://localhost:3000"
export const server = "https://cryptotracker-aayush65.up.railway.app"