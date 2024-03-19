import { configureStore } from "@reduxjs/toolkit";
import { tokenDataTableSlice } from "./slices/TokenDataTable";
import { tokenDetailSlice } from "./slices/TokenDetail";

const store = configureStore({
  reducer: {
    tokenDataTable: tokenDataTableSlice.reducer,
    tokenDetail: tokenDetailSlice.reducer,
  },
});

export default store;
