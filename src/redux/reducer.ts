const initState = {
  tokenDataTable: [
    {
      icon: "DAI icon",
      name: "Dai",
      symbol: "DAI",
      decimals: "18",
      balanceOf: null,
    },
    {
      icon: "USDC icon",
      name: "USDC",
      symbol: "USDC",
      decimals: "6",
      balanceOf: null,
    },
    {
      icon: "USDT icon",
      name: "Tether USDt",
      symbol: "USDT",
      decimals: "6",
      balanceOf: null,
    },
    {
      icon: "WETH icon",
      name: "WETH",
      symbol: "WETH",
      decimals: "18",
      balanceOf: null,
    },
  ],
};

const rootReducer = (state = initState, action: any) => {
  console.log(state, action);
  switch (action.type) {
    case "tokenDataTable/update":
      return {
        ...state,
        tokenDataTable: action.payload,
      };
    case "tokenDataTable/reset":
      return initState;
    // add item to table
    //   return {
    //     ...state,
    //     tokenDataTable: [...state.tokenDataTable, action.payload],
    //   };
    default:
      return state;
  }
};

export default rootReducer;
