const initState = {
  tokenDataTable: [
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
};

const rootReducer = (state = initState, action: any) => {
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
