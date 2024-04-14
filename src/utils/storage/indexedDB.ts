import { formData } from "../constants/formData";

const idb = window.indexedDB;

export const insertDataInIndexedDb = () => {
  //check for support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("upvotes-db", 3);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log(event);
    const db = request.result;

    if (!db.objectStoreNames.contains("upvotesData")) {
      db.createObjectStore("upvotesData", {
        keyPath: "id",
      });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("upvotesData", "readwrite");
    tx.objectStore("upvotesData");

    return tx.oncomplete;
  };
};

export const getAllData = (list: (data: formData[]) => void) => {
  const dbPromise = idb.open("upvotes-db", 1);
  dbPromise.onsuccess = () => {
    const db = dbPromise.result;

    var tx = db.transaction("upvotesData", "readonly");
    var upvotesData = tx.objectStore("upvotesData");
    const dataList = upvotesData.getAll();

    dataList.onsuccess = (event) => {
      let res = (event.target as any).result;
      list(res);
    };

    tx.oncomplete = function () {
      db.close();
    };
  };
};

export const submitData = (
  event: { preventDefault: () => void },
  editData: boolean,
  count: number,
  formData: formData,
  reset: () => void,
  setList: (data: formData[]) => void
) => {
  const dbPromise = idb.open("upvotes-db", 1);

  dbPromise.onsuccess = () => {
    const db = dbPromise.result;

    var tx = db.transaction("upvotesData", "readwrite");
    var upvotesData = tx.objectStore("upvotesData");

    if (!editData) {
      const data = upvotesData.put({
        id: count + 1,
        ...formData,
      });
      data.onsuccess = (query) => {
        tx.oncomplete = function () {
          db.close();
        };
        reset();
        getAllData(setList);
        event.preventDefault();
      };
    } else {
      const data = upvotesData.put(formData);

      data.onsuccess = (query) => {
        tx.oncomplete = function () {
          db.close();
        };
        reset();
        getAllData(setList);
        event.preventDefault();
      };
    }
  };
};

export const deleteSelected = (
  data: any,
  setList: (data: formData[]) => void
) => {
  const dbPromise = idb.open("upvotes-db", 1);

  dbPromise.onsuccess = function () {
    const db = dbPromise.result;
    var tx = db.transaction("upvotesData", "readwrite");
    var dataUpvotes = tx.objectStore("upvotesData");
    const deleteUpvotes = dataUpvotes.delete(data?.id);

    deleteUpvotes.onsuccess = (query) => {
      tx.oncomplete = function () {
        db.close();
      };
      getAllData(setList);
    };
  };
};
