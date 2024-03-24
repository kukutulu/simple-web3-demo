import { configureStore } from "@reduxjs/toolkit";
import { tokenDataTableSlice } from "./slices/TokenDataTable";
import { tokenDetailSlice } from "./slices/TokenDetail";
import { tokenTransferSlice } from "./slices/TokenTransfer";

const store = configureStore({
  reducer: {
    tokenDataTable: tokenDataTableSlice.reducer,
    tokenDetail: tokenDetailSlice.reducer,
    tokenTransfer: tokenTransferSlice.reducer,
  },
});

export default store;
