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
    const delayDebounceFn = setTimeout(() => {
      if (state.searchValue) {
        const filteredResults = list.filter((item: formData) =>
          item.title.toLowerCase().includes(state.searchValue.toLowerCase())
        );
        setFilteredList([...filteredResults]);
      } else {
        getAllData(setList);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
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
          onChange={changeHandler}
        />
      </FormGroup>
    </Form>
  );
};
export default memo(Search);
