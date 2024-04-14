export const sortingReducer = (
  state: {
    mostUpvoted: boolean;
    mostRecent: boolean;
  },
  action: { type: string }
) => {
  switch (action.type) {
    case "upvoteSorting":
      return {
        ...state,
        mostUpvoted: !state.mostUpvoted,
      };
    case "recentSorting":
      return {
        ...state,
        mostRecent: !state.mostRecent,
      };
    default:
      return state;
  }
};
