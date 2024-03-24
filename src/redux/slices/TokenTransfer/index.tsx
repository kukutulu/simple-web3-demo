import { bep20_abi } from "@/abi/BEP20";
import { TransferResult } from "@/global";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contract, JsonRpcSigner, parseUnits } from "ethers";

const tokenTransferInitState = {
  data: {} as TransferResult,
  status: "IDLE",
};

export const tokenTransferAsync = createAsyncThunk(
  "tokenTransfer/tokenTransferAsync",
  async ({
    tokenAddress,
    signer,
    amount,
    decimals,
    receiptAddress,
    symbol,
  }: {
    tokenAddress: string;
    signer: JsonRpcSigner;
    amount: number;
    decimals: string;
    receiptAddress: string;
    symbol: string;
  }) => {
    let _result: TransferResult = {};
    const contract = new Contract(tokenAddress, bep20_abi, signer);
    if (amount) {
      const amountFormatted = amount.toString();
      const transferAmount = parseUnits(amountFormatted, parseInt(decimals));
      const transfer = await contract.transfer(receiptAddress, transferAmount);
      const hash = transfer.hash;
      await transfer.wait();
      _result = { receiptAddress, amount, symbol, hash };
    }

    return _result;
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
        state.status = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(tokenTransferAsync.rejected, (state) => {
        state.status = "FAILED";
      });
  },
});
