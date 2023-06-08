import React from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  updItm: (item) => {},
  getItem: () => {},
  del: (id) => {},
  edit: (id) => {},
});

export default ExpenseContext;
