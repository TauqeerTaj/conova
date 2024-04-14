import { useEffect, useReducer, useState, useContext, memo } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import DatePicker from "react-datepicker";
import {
  insertDataInIndexedDb,
  submitData,
} from "../../utils/storage/indexedDB";
import { upvotesReducer } from "../../utils/reducers/upvotesReducer";
import { upvotesContext } from "../../App";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/style.css";

function InputForm() {
  const [validation, setValidation] = useState(true);

  const {
    list,
    setList,
    editFormData,
    setEditFormData,
    editData,
    setEditData,
  } = useContext(upvotesContext);
  const [state, dispatch] = useReducer(upvotesReducer, {
    title: "",
    upvotes: null,
    date: "",
  });

  useEffect(() => {
    insertDataInIndexedDb();
  }, []);

  useEffect(() => {
    if (
      (editFormData.title || state.title) &&
      (editFormData.upvotes || state.upvotes) &&
      (editFormData.date || state.date)
    ) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [state, editFormData]);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (editData) {
      setEditFormData({
        ...editFormData,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    } else {
      dispatch({
        type: "change",
        payload: { name: e.currentTarget.name, value: e.currentTarget.value },
      });
    }
  };

  const reset = () => {
    if (editData) {
      setEditFormData({ ...state });
    }
    dispatch({
      type: "reset",
      payload: { name: "", value: "" },
    });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    submitData(
      e,
      editData,
      list.length,
      editData ? editFormData : state,
      reset,
      setList
    );
    setValidation(true);
    setEditData(false);
  };
  return (
    <Form onSubmit={(e) => submitHandler(e)} className="square border p-4">
      <h6 className="mb-4">{editData ? "Edit Record" : "Add Record"}</h6>
      <FormGroup>
        <Input
          name="title"
          placeholder="Enter title..."
          type="text"
          value={state.title || editFormData.title}
          onChange={changeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="upvotes"
          placeholder="Enter upvotes number between 0 to 100..."
          type="number"
          value={state.upvotes || editFormData.upvotes || ""}
          onChange={changeHandler}
        />
      </FormGroup>
      <FormGroup>
        <DatePicker
          className="datePicker"
          placeholderText="Enter Date..."
          selected={
            (state.date as string | any) || (editFormData.date as string | any)
          }
          onChange={(date) => {
            if (editData) {
              setEditFormData({
                ...editFormData,
                date: date?.toISOString().substring(0, 10) as string,
              });
            } else {
              dispatch({
                type: "change",
                payload: {
                  name: "date",
                  value: date?.toISOString().substring(0, 10) as string,
                },
              });
            }
          }}
        />
      </FormGroup>
      <Button type="submit" disabled={validation} className="w-100">
        {editData ? "Save Edits" : "Add Data"}
      </Button>
    </Form>
  );
}

export default memo(InputForm);
