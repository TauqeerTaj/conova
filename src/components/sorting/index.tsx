import { useContext, useReducer, memo } from "react";
import { Button } from "reactstrap";
import { sortingReducer } from "../../utils/reducers/sortingReducer";
import { upvotesContext } from "../../App";

const Sorting = () => {
  const { list, setSortingList } = useContext(upvotesContext);

  const sortUpvotesAscending = () => {
    const sortedData = [...list].sort((a, b) => a.upvotes - b.upvotes);
    setSortingList([...sortedData]);
    dispatch({ type: "upvoteSorting" });
  };

  const sortUpvotedDescending = () => {
    const sortedData = [...list].sort((a, b) => b.upvotes - a.upvotes);
    setSortingList([...sortedData]);
    dispatch({ type: "upvoteSorting" });
  };

  const sortDatesAscending = () => {
    const sortedData = [...list].sort(
      (a, b) => (new Date(a.date) as any) - (new Date(b.date) as any)
    );
    setSortingList([...sortedData]);
    dispatch({ type: "recentSorting" });
  };

  const sortDatesDescending = () => {
    const sortedData = [...list].sort(
      (a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)
    );
    setSortingList([...sortedData]);
    dispatch({ type: "recentSorting" });
  };
  const [state, dispatch] = useReducer(sortingReducer, {
    mostUpvoted: false,
    mostRecent: false,
  });
  return (
    <div className="sorting text-center mb-3">
      <strong>SORT BY</strong>
      <Button
        onClick={() => {
          if (state.mostUpvoted) {
            sortUpvotedDescending();
          } else {
            sortUpvotesAscending();
          }
        }}
      >
        Most Upvoted
      </Button>
      <Button
        onClick={() => {
          if (state.mostRecent) {
            sortDatesDescending();
          } else {
            sortDatesAscending();
          }
        }}
      >
        Most Recent
      </Button>
    </div>
  );
};
export default memo(Sorting);
