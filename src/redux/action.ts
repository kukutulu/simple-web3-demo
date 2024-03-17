export const updateTable = (data: any) => {
  return {
    type: "tokenDataTable/update",
    payload: data,
  };
};
