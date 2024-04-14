import { formData } from "../constants/formData";

export const deleteReducer = (
  state: {
    show: boolean;
    view: boolean;
    item: formData;
    // sortingList: formData[];
    // mostUpvoted: boolean;
    // mostRecent: boolean;
  },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "confirmModal":
      return { ...state, show: !state.show, item: action.payload };
    case "viewModal":
      return { ...state, view: !state.view, item: action.payload };
    // case "upvoteSorting":
    //   return {
    //     ...state,
    //     sortingList: action.payload,
    //     mostUpvoted: !state.mostUpvoted,
    //   };
    // case "recentSorting":
    //   return {
    //     ...state,
    //     sortingList: action.payload,
    //     mostRecent: !state.mostRecent,
    //   };
    default:
      return state;
  }
};
