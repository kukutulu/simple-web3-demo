import { createSlice } from "@reduxjs/toolkit";

const tokenDetailInitState = {
  data: {
    icon: "",
    address: "",
    name: "",
    symbol: "",
    decimals: "",
    balanceOf: null,
  },
  status: "IDLE",
};

export const tokenDetailSlice = createSlice({
  name: "tokenDetail",
  initialState: tokenDetailInitState,
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
      state.data = tokenDetailInitState.data;
    },
  },
});
