export type DebankUserSearchItem = {
  id: string;
  desc: {
    usd_value: number;
  };
}

export type DebankAssetClassifyByCoin = {
  id: string;
  amount: number;
  price: number;
  symbol: string;
  logo_url: string;
}
