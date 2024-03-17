export const updateTable = (data: any) => {
  return {
    type: "tokenDataTable/update",
    payload: data,
  };
};

export const resetTable = () => {
  return {
    type: "tokenDataTable/reset",
  };
};
