export type WalletBalanceByCoin = {
  id: string;
  symbol: string;
  price: number;
  logo_url: string;
  amount: number;
  usd_value: number;
  value_pct: number;
}

export type WalletBalanceExchangePool = {
  name: string;
}

export type WalletBalanceByExchange = {
  name: string;
  pools: WalletBalanceExchangePool[];
}

export type Portfolio = {
  wallets: string[];
  usd_value: number;
  by_coin: {[key: string]: WalletBalanceByCoin}
  by_exchange: {[key: string]: WalletBalanceByExchange}
}