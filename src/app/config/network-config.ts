import { ChainType, NativeToken } from "@/global";

export const BNB: NativeToken = {
  name: "BNB",
  symbol: "BNB",
  decimals: 18,
};

export const ETH: NativeToken = {
  name: "ETH",
  symbol: "ETH",
  decimals: 18,
};

export const CHAIN_ALIASES = {
  ETHEREUM_MAINNET: 1,
  // SEPOLIA_TEST_NETWORK: 11155111,
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
  // FANTOM: 250,
};

export const AllowedNetwork = [
  CHAIN_ALIASES.ETHEREUM_MAINNET,
  // CHAIN_ALIASES.SEPOLIA_TEST_NETWORK,
  CHAIN_ALIASES.BSC_MAINNET,
  CHAIN_ALIASES.BSC_TESTNET,
  // CHAIN_ALIASES.FANTOM,
];

export const CHAINS: ChainType = {
  [CHAIN_ALIASES.ETHEREUM_MAINNET]: {
    chainId: CHAIN_ALIASES.ETHEREUM_MAINNET,
    blockExplorerUrls: ["https://etherscan.io/"],
    name: "Ethereum Mainnet",
    nativeCurrency: ETH,
    urls: [
      "https://eth.llamarpc.com/",
      "https://eth-mainnet.public.blastapi.io/",
      "https://api.securerpc.com/v1/",
      "https://rpc.ankr.com/eth/",
      "wss://ethereum-rpc.publicnode.com/",
    ],
    keyToWagmi: "eth",
  },
  [CHAIN_ALIASES.BSC_MAINNET]: {
    chainId: CHAIN_ALIASES.BSC_MAINNET,
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
  [CHAIN_ALIASES.BSC_TESTNET]: {
    chainId: CHAIN_ALIASES.BSC_TESTNET,
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
};
