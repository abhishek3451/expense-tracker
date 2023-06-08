import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbarr from "../Header/Navbarr";
import Expenses from "../NewExpense/Expenses";
import { expenseActions } from "../Store/Expensereducer";

const ExpensePage = () => {
  const expen = useSelector((state) => state.expenses.items);
  const [isEditing, setIsEditing] = useState(false);

  const [retId, setRetId] = useState(null);
  const dispatch = useDispatch();

  const email = localStorage.getItem("userId");
  const emailUrl = email.replace(/[@.]/g, "");

  const updItm = async (item) => {
    try {
      if (!isEditing) {
        const res = await axios.post(
          `https://exp-track-21f82-default-rtdb.firebaseio.com/expense${emailUrl}.json`,
          item
        );
        if (res.status) {
          console.log(res.data);
          getItem();
          console.log("first", item);
        }
      } else {
        const res = await axios.put(
          `https://exp-track-21f82-default-rtdb.firebaseio.com/expense${emailUrl}/${retId}.json`,
          item
        );
        if (res.status) {
          getItem();
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getItem = async () => {
    try {
      const res = await axios.get(
        `https://exp-track-21f82-default-rtdb.firebaseio.com/expense${emailUrl}.json`
      );
      if (res.status) {
        const loadedExpense = [];
        for (const key in res.data) {
          loadedExpense.push({
            id: key,
            amount: res.data[key].amount,
            description: res.data[key].description,
            type: res.data[key].type,
          });
        }

        dispatch(expenseActions.addExpense(loadedExpense));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  const del = async (id) => {
    try {
      const res = await axios.delete(
        `https://exp-track-21f82-default-rtdb.firebaseio.com/expense${emailUrl}/${id}.json`
      );
      if (res.status) {
        dispatch(expenseActions.deleteExpense(id));
      }
      console.log("del");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbarr />
      <Expenses
        onSave={updItm}
        expen={expen}
        getItem={getItem}
        del={del}
        setIsEditing={setIsEditing}
        setRetId={setRetId}
      />
    </>
  );
};

export default ExpensePage;
