import React from "react";
import "./Menu.css";

// Material ui icons
import DragHandleIcon from "@material-ui/icons/DragHandle";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// react router dom

import * as R from "react-bootstrap";
import { useHistory } from "react-router-dom";

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function Menu() {
  const history = useHistory();

  const handleClick = (route) => {
    history.push(route);
  };

  const handleLogout = () => {
    setCookie("id", "id", -1);
    history.push("/");
  };

  return (
    <R.Col xs={12} md={3} className="Menu">
      <div className="Menu">
        <nav>
          <ul>
            <li
              onClick={() => {
                handleClick("/dashboard");
              }}
            >
              <div className="m-icon">
                <DashboardIcon />
              </div>
              Dashboard
            </li>
            <li
              onClick={() => {
                handleClick("/add");
              }}
            >
              <div className="m-icon">
                <AddCircleIcon />
              </div>
              Add Expense
            </li>
            <li
              onClick={() => {
                handleClick("/manage");
              }}
            >
              <div className="m-icon">
                <DragHandleIcon />
              </div>
              Manage Expenses
            </li>
            <li
              onClick={() => {
                handleClick("/day");
              }}
            >
              <div className="m-icon">
                <TodayIcon />
              </div>
              Daywise Expenses
            </li>
            <li
              onClick={() => {
                handleClick("/month");
              }}
            >
              <div className="m-icon">
                <DateRangeIcon />
              </div>
              Monthwise Expenses
            </li>
            <li
              onClick={() => {
                handleClick("/year");
              }}
            >
              <div className="m-icon">
                <CalendarTodayIcon />
              </div>
              Yearwise Expenses
            </li>
            <li
              onClick={() => {
                handleClick("/profile");
              }}
            >
              <div className="m-icon">
                <PersonIcon />
              </div>
              Profile
            </li>
            <li
              onClick={() => {
                handleClick("/change");
              }}
            >
              <div className="m-icon">
                <VisibilityOffIcon />
              </div>
              Change Password
            </li>
            <li onClick={handleLogout}>
              <div className="m-icon">
                <LockIcon />
              </div>
              Logout
            </li>
          </ul>
        </nav>
      </div>
    </R.Col>
  );
}

export default Menu;
