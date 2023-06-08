import React, { useRef } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

import ExpenseItems from "../Expense/ExpenseItem";

const categories = ["Food", "Petrol", "Shopping"];
const Expenses = ({ onSave, expen, del, setIsEditing, setRetId, getItem }) => {
  const typeref = useRef();
  const amountref = useRef();
  const descref = useRef();
  const isActive = useSelector((state) => state.expenses.isActive);

  const submitHandler = (event) => {
    event.preventDefault();
    const item = {
      amount: amountref.current.value,
      description: descref.current.value,
      type: typeref.current.value,
    };
    onSave(item);

    amountref.current.value = "";
    descref.current.value = "";
    typeref.current.value = "";
  };
  const cancleEditing = () => {
    setIsEditing(false);
    amountref.current.value = "";
    descref.current.value = "";
    typeref.current.value = "";
  };
  const edit = (id) => {
    setIsEditing(true);
    setRetId(id);
    const editItem = expen.find((item) => item.id === id);
    const { amount, type, description } = editItem;
    amountref.current.value = amount;
    descref.current.value = description;
    typeref.current.value = type;
  };

  return (
    <>
      <div
        className="container card bg-light text-dark"
        style={{ marginTop: "2rem" }}
      >
        <h3 className="text-center m-2">Add Expense</h3>
        <Form className="m-2">
          <Row>
            <Col>
              <FormGroup>
                <Label>Amount:</Label>
                <Input type="number" innerRef={amountref} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Description:</Label>
                <Input type="text" innerRef={descref} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Category:</Label>

                <Input
                  type="select"
                  name="category"
                  id="category"
                  innerRef={typeref}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex justify-content-center ">
            <Button onClick={submitHandler} style={{ marginRight: "1rem" }}>
              Add Expenses
            </Button>

            <div className="d-flex justify-content-center ">
              <Button onClick={cancleEditing}>Cancel</Button>
            </div>
          </div>
        </Form>
      </div>
      <ExpenseItems expen={expen} getItem={getItem} del={del} edit={edit} />

      <div className="d-flex justify-content-center mb-5 mr-2">
        <CSVLink data={expen} className="text-center">
          {isActive && <button className="btn btn-success">Download me</button>}
        </CSVLink>
      </div>
    </>
  );
};

export default Expenses;
