export const filterReducer = (
  state: {
    searchValue: string;
  },
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "searchInput":
      return { searchValue: action.payload };
    default:
      return state;
  }
};
