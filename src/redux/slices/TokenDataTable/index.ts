import { createSlice } from "@reduxjs/toolkit";

const tokenTableInitState = {
  data: [
    {
      icon: "/assets/DAI.png",
      address: "",
      name: "Dai",
      symbol: "DAI",
      decimals: "18",
      balanceOf: null,
    },
    {
      icon: "/assets/USDC.png",
      address: "",
      name: "USDC",
      symbol: "USDC",
      decimals: "6",
      balanceOf: null,
    },
    {
      icon: "/assets/USDT.png",
      address: "",
      name: "Tether USDt",
      symbol: "USDT",
      decimals: "6",
      balanceOf: null,
    },
    {
      icon: "/assets/WETH.png",
      address: "",
      name: "WETH",
      symbol: "WETH",
      decimals: "18",
      balanceOf: null,
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
