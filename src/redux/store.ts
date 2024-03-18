import { configureStore } from "@reduxjs/toolkit";
import { tokenDataTableSlice } from "./slices/TokenDataTable";

const store = configureStore({
  reducer: {
    tokenDataTable: tokenDataTableSlice.reducer,
  },
});

export default store;
