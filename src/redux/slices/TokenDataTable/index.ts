import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const tokenTableInitState = {
  data: [
    {
      icon: "/assets/DAI.png",
      name: "Dai",
      symbol: "DAI",
      decimals: "18",
      balanceOf: null,
    },
    {
      icon: "/assets/USDC.png",
      name: "USDC",
      symbol: "USDC",
      decimals: "6",
      balanceOf: null,
    },
    {
      icon: "/assets/USDT.png",
      name: "Tether USDt",
      symbol: "USDT",
      decimals: "6",
      balanceOf: null,
    },
    {
      icon: "/assets/WETH.png",
      name: "WETH",
      symbol: "WETH",
      decimals: "18",
      balanceOf: null,
    },
  ],
  status: "IDLE",
};

const fetchTableData = createAsyncThunk("tokenDataTable", async () => {});

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   data: null,
//   error: null,
// };

// const fetchSomeData = createAsyncThunk(
//   'mySliceName/fetchData', // Replace with your action type
//   async () => {
//     // Replace with your actual async logic to fetch data
//     return new Promise((resolve) => setTimeout(() => resolve({ message: 'Success!' }), 2000));
//   }
// );

// const mySlice = createSlice({
//   name: 'mySliceName',
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSomeData.pending, (state) => {
//         state.status = 'PROCESSING';
//         state.data = null;
//         state.error = null;
//       })
//       .addCase(fetchSomeData.fulfilled, (state, action) => {
//         state.status = 'SUCCESS';
//         state.data = action.payload;
//       })
//       .addCase(fetchSomeData.rejected, (state, action) => {
//         state.status = 'FAILED';
//         state.error = action.error;
//       });
//   },
// });

// export const { fetchSomeData } = mySlice.actions;
// export default mySlice.reducer;

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
