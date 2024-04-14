import { useContext, useEffect, useReducer, memo } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { upvotesContext } from "../../App";
import { filterReducer } from "../../utils/reducers/filterReducer";
import { formData } from "../../utils/constants/formData";
import "../../style/style.css";
import { getAllData } from "../../utils/storage/indexedDB";

const Search = () => {
  const { list, setList, setFilteredList } = useContext(upvotesContext);
  const [state, dispatch] = useReducer(filterReducer, {
    searchValue: "",
  });

  useEffect(() => {
    if (state.searchValue.length >= 3) {
      const delayDebounceFn = setTimeout(() => {
        const filteredResults = list.filter((item: formData) =>
          item.title.toLowerCase().includes(state.searchValue.toLowerCase())
        );
        if (filteredResults.length <= 0) {
          state.searchValue = "";
          setFilteredList([]);
        } else {
          setFilteredList([...filteredResults]);
        }
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    } else {
      getAllData(setList);
    }
  }, [state.searchValue]);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: "searchInput", payload: e.currentTarget.value });
  };
  return (
    <Form>
      <FormGroup>
        <Input
          placeholder="Search the record..."
          type="search"
          value={state.searchValue}
          onChange={changeHandler}
        />
      </FormGroup>
    </Form>
  );
};
export default memo(Search);
