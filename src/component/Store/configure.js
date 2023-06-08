import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Authreducer";
import expensesReducer from "./Expensereducer";

const store = configureStore({
  reducer: { auth: authReducer, expenses: expensesReducer },
});
export default store;
