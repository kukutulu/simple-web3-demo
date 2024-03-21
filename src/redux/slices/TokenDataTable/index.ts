import { bep20_abi } from "@/abi/BEP20";
import { TableDataType } from "@/global";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { Contract, JsonRpcProvider } from "ethers";

const tableInitState = {
  data: [] as TableDataType,
  status: "IDLE",
};

export const getDataTableAsync = createAsyncThunk(
  "tokenDataTable/getDataTableAsync",
  async ({
    tokenAddresses,
    accountAddress,
    reader,
  }: {
    tokenAddresses: string[];
    accountAddress: string;
    reader: JsonRpcProvider;
  }) => {
    const _tempArr: TableDataType = [];
    for (let tokenAddress of tokenAddresses) {
      const contract = new Contract(tokenAddress, bep20_abi, reader);
      const _balanceOf = accountAddress
        ? await contract.balanceOf(accountAddress)
        : 0;
      const _name = await contract.name();
      const _symbol = await contract.symbol();
      const _decimals = await contract.decimals();
      _tempArr.push({
        icon: `/assets/${_symbol}.png`,
        address: tokenAddress,
        name: _name,
        symbol: _symbol,
        decimals: _decimals.toString(),
        balanceOf: BigNumber(_balanceOf.toString())
          .dividedBy(BigNumber(10).pow(_decimals))
          .toFixed(3),
      });
    }
    return _tempArr;
  }
);

export const tokenDataTableSlice = createSlice({
  name: "tokenDataTable",
  initialState: tableInitState,
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
      state.data = tableInitState.data;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDataTableAsync.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(getDataTableAsync.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(getDataTableAsync.rejected, (state) => {
        state.status = "FAILED";
      });
  },
});
