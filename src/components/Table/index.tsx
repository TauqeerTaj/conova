import { useContext, useEffect, useReducer } from "react";
import { Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { columns } from "./columns";
import { getAllData } from "../../utils/storage/indexedDB";
import { formData } from "../../utils/constants/formData";
import { upvotesContext } from "../../App";
import ConfimationDialog from "./modal/confimationDialog";
import { deleteReducer } from "../../utils/reducers/deleteReducer";
import ViewRecordModal from "./modal/viewRecordModal";
import "../../style/style.css";

export default function TableComponent() {
  const {
    list,
    setList,
    filteredList,
    sortingList,
    setEditFormData,
    setEditData,
  } = useContext(upvotesContext);

  const [state, dispatch] = useReducer(deleteReducer, {
    show: false,
    view: false,
    item: {},
  });

  useEffect(() => {
    if (filteredList.length > 0) {
      setList([...filteredList]);
    } else {
      getAllData(setList);
    }
  }, [filteredList]);

  useEffect(() => {
    if (sortingList.length > 0) {
      setList([...sortingList]);
    } else {
      getAllData(setList);
    }
  }, [sortingList]);

  const editFormData = (data: formData) => {
    setEditFormData(data);
    setEditData(true);
  };
  const toggleVeiw = (item?: formData) => {
    dispatch({ type: "viewModal", payload: item });
  };
  const toggleConfirm = (item?: formData) => {
    dispatch({ type: "confirmModal", payload: item });
  };

  return (
    <>
      <ViewRecordModal
        show={state.view}
        toggle={toggleVeiw}
        setList={setList}
        item={state.item}
      />
      <ConfimationDialog
        show={state.show}
        toggle={toggleConfirm}
        setList={setList}
        item={state.item}
      />
      <DataTable
        columns={columns}
        data={list.map((item: formData) => {
          return {
            ...item,
            action: (
              <>
                <Button color="success" onClick={() => toggleVeiw(item)}>
                  View
                </Button>
                <Button color="primary" onClick={() => editFormData(item)}>
                  Edit
                </Button>
                <Button color="danger" onClick={() => toggleConfirm(item)}>
                  Delete
                </Button>
              </>
            ),
          };
        })}
        pagination={list.length > 10 ?? false}
      />
    </>
  );
}
