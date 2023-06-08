import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    totalAmount: 0,
    showPrime: false,
    isActive: false,
    isdarkMode: false,
  },
  reducers: {
    addExpense: (state, action) => {
      state.items = action.payload;
      state.showPrime =
        state.items.reduce((acc, curr) => acc + Number(curr.amount), 0) > 10000;

      console.log("first", state.showPrime);
    },
    deleteExpense: (state, action) => {
      state.items = state.items.filter((exp) => exp.id !== action.payload);
      state.showPrime =
        state.items.reduce((acc, curr) => acc + Number(curr.amount), 0) > 10000;
      console.log("first", state.showPrime);
    },
    activatePremium: (state) => {
      state.isActive = true;
    },

    setMode: (state) => {
      state.isdarkMode = !state.isdarkMode;
    },
  },
});

export const expenseActions = expensesSlice.actions;
export default expensesSlice.reducer;
