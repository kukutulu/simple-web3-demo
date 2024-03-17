export interface NativeToken {
  name: string;
  symbol: string;
  decimals: number;
}

export interface BaseChain {
  name: string;
  nativeCurrency: NativeToken;
  chainId: number;
}

export interface Chain extends BaseChain {
  blockExplorerUrls: Array<string>;
  urls: Array<string>;
  keyToWagmi: string;
}

export interface ChainType {
  [chain: string]: Chain;
}

export type ColumnItemType = {
  name?: string;
  symbol?: string;
  decimals?: string;
  balanceOf?: string;
};

export type TableDataType = ColumnItemType[];
