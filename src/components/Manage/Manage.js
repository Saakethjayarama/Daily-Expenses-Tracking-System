import React, { useEffect, useState } from "react";
import * as R from "react-bootstrap";
import "./Manage.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import Modal from "./Modal";
import Snack from "../Add/Snack";

function Manage() {
  const [expenses, setExpenses] = useState([]);

  const [reload, setReload] = useState(true);
  // fetch expenses
  useEffect(() => {
    const cookies = new Map(
      document.cookie
        .split("; ")
        .map((v) => v.split("=").map(decodeURIComponent))
    );

    const id = cookies.get("id");

    fetch("http://localhost/ExpenseByUid.php?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        const datum = [];

        data.forEach((dt) => {
          dt["expenseDate"] = dt.expenseDate.split("-").reverse().join("-");
          datum.push(dt);
        });

        setExpenses(datum);
      });
  }, [reload]);

  const handleDelete = (id) => {
    setModalShow(false);
    setMessage("Deleting...😑");
    setOpen(true);

    fetch("http://localhost/Delete.php", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        setReload(Math.random());
        setOpen(false);
        setMessage("Deleted!😁");
        setOpen(true);
      })
      .catch((err) => {
        setOpen(false);
        setMessage("Err Deleting 😬");
        setOpen(true);
      });
  };

  const [modalShow, setModalShow] = useState(false);

  // modal states
  const [modalState, setModalState] = useState({
    id: "",
    expenseItem: "",
    expenseCost: "",
    expenseDate: "",
  });

  const handleEdit = (id) => {
    let selected = expenses.filter((expense) => expense.id === id);
    if (selected.length > 0) {
      selected = selected[0];
      setModalState(selected);
    }
    setModalShow(true);
  };

  const modalHandleChange = (event) => {
    setModalState({
      ...modalState,
      [event.target.name]: event.target.value,
    });
  };
  const modalHandleSubmit = () => {
    setModalShow(false);
    setMessage("Updating...😑");
    setOpen(true);
    fetch("http://localhost/Edit.php", {
      method: "PUT",
      body: JSON.stringify(modalState),
    })
      .then((res) => {
        setReload(Math.random());
        setOpen(false);
        setMessage("Updated!😁");
        setOpen(true);
      })
      .catch((err) => {
        setOpen(false);
        setMessage("Err Updating 😬");
        setOpen(true);
      });
  };

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setMessage("");
    setOpen(false);
  };

  return (
    <R.Col xs={12} md={7} className="Manage">
      <Snack onClose={handleSnackClose} open={open} msg={message} />
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalState={modalState}
        modalHandleChange={modalHandleChange}
        modalHandleSubmit={modalHandleSubmit}
      />
      <R.Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Expense Item</th>
            <th>Expense Cost</th>
            <th>Expense Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((value, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.expenseItem}</td>
                <td>{value.expenseCost}</td>
                <td>{value.expenseDate}</td>
                <td className="actions">
                  <div
                    className="edit action"
                    onClick={() => handleEdit(value.id)}
                  >
                    <CreateIcon />
                  </div>
                  <div
                    className="delete action"
                    onClick={() => handleDelete(value.id)}
                  >
                    <DeleteForeverIcon />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </R.Table>
    </R.Col>
  );
}

export default Manage;
