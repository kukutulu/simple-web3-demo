import { ChainType, NativeToken } from "@/global";

export const BNB: NativeToken = {
  name: "BNB",
  symbol: "BNB",
  decimals: 18,
};

export const FTM: NativeToken = {
  name: "FTM",
  symbol: "FTM",
  decimals: 18,
};

export const CHAIN_ALLOWS = {
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
  FANTOM: 250,
};

export const TokenAddresses: { [key: number]: string[] } = {
  97: [
    "0xfccb260c9074fabb69702c1972aa747aac6e654f",
    "0x345dcb7b8f17d342a3639d1d9bd649189f2d0162",
    "0x780397e17dbf97259f3b697ca3a394fa483a1419",
    "0xbe2a3b225ada4142c42a36cfbd5b04f28d261ca8",
  ],
  250: [
    "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
    "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
    "0x74b23882a30290451a17c44f4f05243b6b58c76d",
    "0x321162cd933e2be498cd2267a90534a804051b11",
  ],
};

export const AllowedNetwork = [
  CHAIN_ALLOWS.BSC_MAINNET,
  CHAIN_ALLOWS.BSC_TESTNET,
  CHAIN_ALLOWS.FANTOM,
];

export const DisplayNetwork = [];

export const CHAINS: ChainType = {
  [CHAIN_ALLOWS.BSC_MAINNET]: {
    chainId: CHAIN_ALLOWS.BSC_MAINNET,
    blockExplorerUrls: ["https://bscscan.com"],
    name: "BSC Mainnet",
    nativeCurrency: BNB,
    urls: [
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed2.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
      "https://bsc-dataseed2.ninicoin.io/",
      "https://bsc-dataseed.binance.org/",
    ],
    keyToWagmi: "bsc",
  },
  [CHAIN_ALLOWS.BSC_TESTNET]: {
    chainId: CHAIN_ALLOWS.BSC_TESTNET,
    blockExplorerUrls: ["https://testnet.bscscan.com"],
    name: "BSC Testnet",
    nativeCurrency: BNB,
    urls: [
      "https://data-seed-prebsc-2-s2.binance.org:8545/",
      "https://data-seed-prebsc-1-s3.binance.org:8545/",
      "https://data-seed-prebsc-2-s1.binance.org:8545/",
      "https://data-seed-prebsc-1-s1.binance.org:8545/",
      "https://data-seed-prebsc-1-s2.binance.org:8545/",
      "https://data-seed-prebsc-2-s3.binance.org:8545/",
    ],
    keyToWagmi: "bscTestnet",
  },
  [CHAIN_ALLOWS.FANTOM]: {
    chainId: CHAIN_ALLOWS.FANTOM,
    blockExplorerUrls: ["https://ftmscan.com"],
    name: "FTM Mainnet",
    nativeCurrency: FTM,
    urls: [
      "https://rpc.ftm.tools",
      "https://fantom-mainnet.public.blastapi.io",
      "https://rpc.ankr.com/fantom",
      "https://1rpc.io/ftm",
      "https://fantom.blockpi.network/v1/rpc/public",
    ],
    keyToWagmi: "ftm",
  },
};
