export const columns = [
  {
    name: "Title",
    width: "35%",
    selector: (row: any) => row.title,
  },
  {
    name: "Upvotes",
    selector: (row: any) => row.upvotes,
  },
  {
    name: "Date",
    selector: (row: any) => row.date,
  },
  {
    name: "",
    selector: (row: any) => row.action,
  },
];
