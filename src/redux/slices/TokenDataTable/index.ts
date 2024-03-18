const tokenTableInitState = [
  {
    icon: "/assets/DAI.png",
    name: "Dai",
    symbol: "DAI",
    decimals: "18",
    balanceOf: null,
  },
  {
    icon: "/assets/USDC.png",
    name: "USDC",
    symbol: "USDC",
    decimals: "6",
    balanceOf: null,
  },
  {
    icon: "/assets/USDT.png",
    name: "Tether USDt",
    symbol: "USDT",
    decimals: "6",
    balanceOf: null,
  },
  {
    icon: "/assets/WETH.png",
    name: "WETH",
    symbol: "WETH",
    decimals: "18",
    balanceOf: null,
  },
];

import { createSlice } from "@reduxjs/toolkit";

export const tokenDataTableSlice = createSlice({
  name: "tokenDataTable",
  initialState: tokenTableInitState,
  reducers: {
    update: (state, action) => {
      return action.payload;
    },
    reset: (state, action) => {
      return tokenTableInitState;
    },
  },
});
