const initState = {
  tokenDataTable: [
    {
      icon: "A icon",
      name: "A coin",
      symbol: "A symbol",
      decimals: "A decimal",
      balanceOf: "A balance",
    },
    {
      icon: "B icon",
      name: "B coin",
      symbol: "B symbol",
      decimals: "B decimal",
      balanceOf: "B balance",
    },
    {
      icon: "C icon",
      name: "C coin",
      symbol: "C symbol",
      decimals: "C decimal",
      balanceOf: "C balance",
    },
    {
      icon: "D icon",
      name: "D coin",
      symbol: "D symbol",
      decimals: "D decimal",
      balanceOf: "D balance",
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
    default:
      return state;
  }
};

export default rootReducer;
