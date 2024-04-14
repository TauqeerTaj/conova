import { useState, createContext } from "react";
import { Row, Col } from "reactstrap";
import InputForm from "./components/Form";
import Search from "./components/Search";
import TableComponent from "./components/Table";
import Sorting from "./components/sorting";
import "./App.css";

export const upvotesContext = createContext<any>([]);

function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [editFormData, setEditFormData] = useState({
    title: "",
    upvotes: null,
    date: "",
  });
  const [editData, setEditData] = useState(false);
  const [sortingList, setSortingList] = useState([]);

  return (
    <div className="App px-lg-5 px-md-5 px-xxl-5 px-xl-5 mt-5">
      <upvotesContext.Provider
        value={{
          list,
          setList,
          filteredList,
          setFilteredList,
          editFormData,
          setEditFormData,
          editData,
          setEditData,
          sortingList,
          setSortingList,
        }}
      >
        <Row>
          <Col xxl="12" xl="12" lg="12" md="12" sm="12" xs="12">
            <Row>
              <Col
                xxl={{ offset: 6, size: 4 }}
                xl={{ offset: 6, size: 4 }}
                lg={{ offset: 6, size: 4 }}
                md={{ offset: 2, size: 8 }}
              >
                <Search />
              </Col>
              <Col
                xxl={{ offset: 6, size: 4 }}
                xl={{ offset: 6, size: 4 }}
                lg={{ offset: 6, size: 4 }}
                md={{ offset: 2, size: 8 }}
              >
                <Sorting />
              </Col>
            </Row>
          </Col>
          <Col xxl="4" xl="4" lg="4" md="12" sm="12" xs="12">
            <InputForm />
          </Col>
          <Col xxl="8" xl="8" lg="8" md="12" sm="12" xs="12" className="py-2">
            <TableComponent />
          </Col>
        </Row>
      </upvotesContext.Provider>
    </div>
  );
}

export default App;
