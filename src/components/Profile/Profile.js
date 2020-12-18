import React, { useEffect, useState } from "react";
import * as R from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import "./Profile.css";
import Snack from "../Add/Snack";

function Profile() {
  const INITIAL_STATE = {
    id: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    regDate: "",
  };

  const [profile, setProfile] = useState({ ...INITIAL_STATE });

  useEffect(() => {
    const cookies = new Map(
      document.cookie
        .split("; ")
        .map((v) => v.split("=").map(decodeURIComponent))
    );

    const id = cookies.get("id");

    fetch(`http://localhost/Profile.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    setMessage("Updating...😐");
    setOpen(true);

    fetch("http://localhost/Update.php", {
      method: "PUT",
      body: JSON.stringify(profile),
    })
      .then(() => {
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

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
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
    <R.Col xs={12} md={7} className="Profile">
      <Snack onClose={handleSnackClose} open={open} msg={message} />
      <h4>Profile</h4>
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            disabled
            name="email"
            value={profile.email}
          />
        </Form.Group>
        <Form.Group controlId="formBasicMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mobile Number"
            name="mobileNumber"
            value={profile.mobileNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicRegistrationDate">
          <Form.Label>Registration Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Registration Date"
            disabled
            name="regDate"
            value={profile.regDate}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleClick}>
          Update
        </Button>
      </Form>
    </R.Col>
  );
}

export default Profile;
