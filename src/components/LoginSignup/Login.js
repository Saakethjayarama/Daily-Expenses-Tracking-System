import React, { useState } from "react";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import * as R from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function Login() {
  const history = useHistory();

  const INITIAL_STATE = {
    username: "",
    password: "",
    fullName: "",
    mobileNumber: "",
  };

  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginSubmit = (event) => {
    fetch("http://localhost/Verify.php", {
      method: "POST",
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((data) => {
        const { id, message } = data;
        if (id) {
          setCookie("id", id, 365);
          history.push("/dashboard");
        } else if (message) {
          setMessage(message);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
      });
  };

  const handleSignUpSubmit = (event) => {
    fetch("http://localhost/AddUser.php", {
      method: "POST",
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage("Account created Login!");
        setTimeout(() => {
          setMessage("");
          setState({ ...INITIAL_STATE });
          setIsLogin(true);
        }, 5000);
      })
      .catch((err) => {
        setMessage("Err creating account.");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      handleLoginSubmit();
    } else {
      handleSignUpSubmit();
    }
  };

  const [message, setMessage] = useState("");

  return (
    <div className="Login">
      <R.Col md={5}>
        {isLogin ? <h2>Login</h2> : <h2>Signup</h2>}
        {message === "" ? null : <R.Alert variant="danger">{message}</R.Alert>}
        <Form onSubmit={handleSubmit}>
          {isLogin ? null : (
            <>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={state.fullName}
                  onChange={handleChange}
                  name="fullName"
                />
              </Form.Group>

              <Form.Group controlId="formBasicName">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mobile Number"
                  value={state.mobileNumber}
                  onChange={handleChange}
                  name="mobileNumber"
                />
              </Form.Group>
            </>
          )}

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={state.username}
              onChange={handleChange}
              name="username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div className="float-right">
            <Link onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create Account" : "Have an Account? Login"}
            </Link>
          </div>
        </Form>
      </R.Col>
    </div>
  );
}

export default Login;
