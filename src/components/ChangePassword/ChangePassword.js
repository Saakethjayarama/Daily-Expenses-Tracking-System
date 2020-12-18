import React, { useState } from "react";
import "./ChangePassword.css";
import * as R from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import Snack from "../Add/Snack";

function ChangePassword() {
  const INITIAL_STATE = {
    oldPassword: "",
    password: "",
    repassword: "",
  };

  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const active =
    state.password === state.repassword &&
    state.password !== "" &&
    state.repassword !== "";

  const handleClick = (event) => {
    event.preventDefault();

    setMessage("Updating...😑");
    setOpen(true);

    const cookies = new Map(
      document.cookie
        .split("; ")
        .map((v) => v.split("=").map(decodeURIComponent))
    );

    const id = cookies.get("id");

    const data = {
      id,
      oldPassword: state.oldPassword,
      password: state.password,
    };

    fetch("http://localhost/Reset.php", {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        const { message } = data;
        setOpen(false);
        if (message) {
          setMessage(`${message} 😬`);
        } else {
          setState({ ...INITIAL_STATE });
          setMessage("Updated!😁");
        }
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setMessage(`Err Updating 😬`);
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
    <R.Col xs={12} md={7} className="Password">
      <Snack onClose={handleSnackClose} open={open} msg={message} />
      <h4>Change Password</h4>

      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            onChange={handleChange}
            value={state.oldPassword}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            value={state.password}
          />
        </Form.Group>
        <Form.Group controlId="formBasicMobileNumber">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="repassword"
            onChange={handleChange}
            value={state.repassword}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!active}
          onClick={handleClick}
        >
          Change Password
        </Button>
      </Form>
    </R.Col>
  );
}

export default ChangePassword;
