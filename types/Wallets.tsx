export interface DebankUserSearchItem {
  id: string;
  desc: {
    usd_value: number;
  };
}

export interface WalletBalanceByCoin {
  id: string;
  symbol: string;
  price: number;
  logo_url: string;
  amount: number;
  usd_value: number;
  value_pct: number;
}

export interface WalletBalanceExchangePool {
  name: string;
}

export interface WalletBalanceByExchange {
  name: string;
  pools: WalletBalanceExchangePool[];
}

export interface Portfolio {
  wallets: string[];
  usd_value: number;
  by_coin: {[key: string]: WalletBalanceByCoin}
  by_exchange: {[key: string]: WalletBalanceByExchange}
}