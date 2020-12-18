import React, { useState } from "react";
import * as R from "react-bootstrap";
import "./Add.css";
import Snack from "./Snack";

function Add() {
  const INITIAL_STATE = {
    expenseItem: "",
    expenseCost: "",
    expenseDate: "",
  };

  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    setMessage("Adding...😑");
    setOpen(true);
    fetch("http://localhost/Add.php", {
      method: "POST",
      body: JSON.stringify({ userId: 11, ...state }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOpen(false);
        setState({ ...INITIAL_STATE });
        setMessage("Added!😁");
        setOpen(true);
      })
      .catch((err) => {
        setOpen(false);
        setMessage("Err Adding 😬");
        setOpen(true);
      });
  };

  // handling snacks
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setMessage("");
    setOpen(false);
  };

  return (
    <R.Col xs={12} md={7} className="Add">
      <Snack onClose={handleSnackClose} open={open} msg={message} />
      <div className="Add">
        <div className="content">
          <div className="heading">Expenses</div>
          <div className="form-content">
            <label htmlFor="dateOfExpense">Date of expense</label>
            <input
              type="date"
              name="expenseDate"
              id="dateOfExpense"
              value={state.expenseDate}
              onChange={handleChange}
            />
            <label htmlFor="item">Item</label>
            <input
              type="text"
              name="expenseItem"
              value={state.expenseItem}
              onChange={handleChange}
            />
            <label htmlFor="cost">Cost of item</label>
            <input
              type="text"
              name="expenseCost"
              value={state.expenseCost}
              onChange={handleChange}
            />
            <div className="btns">
              <R.Button variant="primary" onClick={handleClick}>
                Submit
              </R.Button>
            </div>
          </div>
        </div>
      </div>
    </R.Col>
  );
}

export default Add;
