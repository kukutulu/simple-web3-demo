import { bep20_abi } from "@/abi/BEP20";
import { ColumnItemType } from "@/global";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { Contract, JsonRpcProvider } from "ethers";

const tokenDetailInitState = {
  data: {} as ColumnItemType,
  status: "IDLE",
};

export const getTokenDetailAsync = createAsyncThunk(
  "tokenDetail/getTokenDetailAsync",
  async ({
    tokenAddress,
    accountAddress,
    reader,
  }: {
    tokenAddress: string;
    accountAddress: string;
    reader: JsonRpcProvider;
  }) => {
    const contract = new Contract(tokenAddress, bep20_abi, reader);
    const address = tokenAddress;
    const decimals = await contract.decimals();
    const balanceOf = accountAddress
      ? await contract.balanceOf(accountAddress)
      : 0;
    const name = await contract.name();
    const symbol = await contract.symbol();
    const icon = `/assets/${symbol}.png`;
    return {
      icon: icon,
      address: address,
      name: name,
      symbol: symbol,
      decimals: decimals.toString(),
      balanceOf: BigNumber(balanceOf.toString())
        .dividedBy(BigNumber(10).pow(decimals))
        .toFixed(3),
    };
  }
);

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
  extraReducers(builder) {
    builder
      .addCase(getTokenDetailAsync.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(getTokenDetailAsync.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(getTokenDetailAsync.rejected, (state) => {
        state.status = "FAILED";
      });
  },
});
