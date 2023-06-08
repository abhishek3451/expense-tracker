import React, { useEffect } from "react";
import { Button, Table } from "reactstrap";

const ExpenseItems = ({ expen, edit, del, getItem }) => {
  useEffect(() => {
    getItem();
  }, []);
  return (
    <div className="card m-5 text-white">
      <h3 className="text-center m-1">Expense List</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expen.map((itm) => (
            <tr key={itm.id}>
              <td>Rs.{itm.amount}</td>
              <td>{itm.description}</td>
              <td>{itm.type}</td>

              <td>
                <Button onClick={() => edit(itm.id)}>Edit</Button>
              </td>
              <td>
                <Button onClick={() => del(itm.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseItems;
