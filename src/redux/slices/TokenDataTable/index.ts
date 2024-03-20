import { createSlice } from "@reduxjs/toolkit";

const tokenTableInitState = {
  data: [
    {
      icon: "/assets/DAI.png",
      address: "0xfccb260c9074fabb69702c1972aa747aac6e654f",
      name: "Dai",
      symbol: "DAI",
      decimals: "18",
      balanceOf: 0,
    },
    {
      icon: "/assets/USDC.png",
      address: "0x345dcb7b8f17d342a3639d1d9bd649189f2d0162",
      name: "USDC",
      symbol: "USDC",
      decimals: "6",
      balanceOf: 0,
    },
    {
      icon: "/assets/USDT.png",
      address: "0x780397e17dbf97259f3b697ca3a394fa483a1419",
      name: "Tether USDt",
      symbol: "USDT",
      decimals: "6",
      balanceOf: 0,
    },
    {
      icon: "/assets/WETH.png",
      address: "0xbe2a3b225ada4142c42a36cfbd5b04f28d261ca8",
      name: "WETH",
      symbol: "WETH",
      decimals: "18",
      balanceOf: 0,
    },
    {
      icon: "/assets/DAI.png",
      address: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
      name: "Dai",
      symbol: "DAI",
      decimals: "18",
      balanceOf: 0,
    },
    {
      icon: "/assets/USDC.png",
      address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
      name: "USDC",
      symbol: "USDC",
      decimals: "6",
      balanceOf: 0,
    },
    {
      icon: "/assets/ETH.png",
      address: "0x74b23882a30290451a17c44f4f05243b6b58c76d",
      name: "ETH",
      symbol: "ETH",
      decimals: "18",
      balanceOf: 0,
    },
    {
      icon: "/assets/BTC.png",
      address: "0x321162cd933e2be498cd2267a90534a804051b11",
      name: "BTC",
      symbol: "BTC",
      decimals: "8",
      balanceOf: 0,
    },
  ],
  status: "IDLE",
};

export const tokenDataTableSlice = createSlice({
  name: "tokenDataTable",
  initialState: tokenTableInitState,
  reducers: {
    updatePending: (state, action) => {
      state.status = "PENDING";
    },
    updateSuccess: (state, action) => {
      state.status = "SUCCESS";
      state.data = action.payload;
    },
    updateFailed: (state, action) => {
      state.status = "FAILED";
    },
    reset: (state, action) => {
      state.status = "IDLE";
      state.data = tokenTableInitState.data;
    },
  },
});
