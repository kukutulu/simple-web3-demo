import { bep20_abi } from "@/abi/BEP20";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { Contract, JsonRpcSigner, parseUnits } from "ethers";

const tokenTransferInitState = {
  data: {},
  status: "IDLE",
};

export const tokenTransferAsync = createAsyncThunk(
  "tokenTransfer/tokenTransferAsync",
  async ({
    pathname,
    signer,
    amount,
    decimals,
    receiptAddress,
    symbol,
  }: {
    pathname: string;
    signer: JsonRpcSigner;
    amount: number;
    decimals: string;
    receiptAddress: string;
    symbol: string;
  }) => {
    const segments = pathname!.split("/");
    const tokenAddress = segments[segments.length - 1];
    const contract = new Contract(tokenAddress, bep20_abi, signer);
    if (amount) {
      const amountFormatted = BigNumber(amount)
        .dividedBy(BigNumber(10).pow(parseInt(decimals)))
        .toFixed(3);
      const transferAmount = parseUnits(amountFormatted, parseInt(decimals));
      const transfer = await contract.transfer(receiptAddress, transferAmount);
      await transfer.wait();
    }

    return {
      receiptAddress: receiptAddress,
      amount: amount,
      symbol: symbol,
    };
  }
);

export const tokenTransferSlice = createSlice({
  name: "tokenTransfer",
  initialState: tokenTransferInitState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(tokenTransferAsync.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(tokenTransferAsync.fulfilled, (state, action) => {
        (state.status = "SUCCESS"), (state.data = action.payload);
      })
      .addCase(tokenTransferAsync.rejected, (state) => {
        state.status = "FAILED";
      });
  },
});
