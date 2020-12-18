import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import * as R from "react-bootstrap";
import Progress from "../Progress";

function Dashboard() {
  const INITIAL_STATE = [
    {
      price: "25",
      percent: 25,
      tag: "Today's Expense",
      color: "rgb(48,165,255)",
    },
    {
      price: "25",
      percent: 25,
      tag: "Yesterday's Expense",
      color: "rgb(255,181,62)",
    },
    { price: "25", percent: 25, tag: "Last 7 Days", color: "rgb(30,191,174)" },
    { price: "25", percent: 25, tag: "Last 30 Days", color: "rgb(249,36,63)" },
    { price: "25", percent: 25, tag: "Current Year", color: "rgb(153,211,98)" },
    { price: "100%", percent: 100, tag: "Total", color: "rgb(204,168,71)" },
  ];
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    let today = new Date();
    today = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`;
    const todayPromise = fetch(
      `http://localhost/ExpenseByDate.php?id=11&date=${today}`
    );

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDay()}`;
    const yesterdayPromise = fetch(
      `http://localhost/ExpenseByDate.php?id=11&date=${yesterday}`
    );

    let lastSeven = new Date();
    lastSeven.setDate(lastSeven.getDate() - 7);
    lastSeven = `${lastSeven.getFullYear()}-${lastSeven.getMonth()}-${lastSeven.getDay()}`;
    const lastSevenPromise = fetch(
      `http://localhost/ExpenseByDate.php?id=11&startDate=${today}&endDate=${lastSeven}`
    );

    let lastThirty = new Date();
    lastThirty.setDate(lastThirty.getDate() - 30);
    lastThirty = `${lastThirty.getFullYear()}-${lastThirty.getMonth()}-${lastThirty.getDay()}`;
    const lastThirtyPromise = fetch(
      `http://localhost/ExpenseByDate.php?id=11&startDate=${today}&endDate=${lastThirty}`
    );

    const year = new Date().getFullYear();
    const currentYearPromise = fetch(
      `http://localhost/ExpenseByDate.php?id=11&startDate=${year}-01-01&endDate=${today}`
    );
  }, []);

  return (
    <R.Col xs={12} md={7} className="Manage">
      <R.Row className="progress-row">
        {state.map((val, index) => {
          if (index <= 2) {
            return (
              <Progress
                color={val.color}
                percent={val.percent}
                tag={val.tag}
                price={val.price}
              />
            );
          }
        })}
      </R.Row>
      <br />
      <br />
      <R.Row className="progress-row">
        {state.map((val, index) => {
          if (index > 2) {
            return (
              <Progress
                color={val.color}
                percent={val.percent}
                tag={val.tag}
                price={val.price}
              />
            );
          }
        })}
      </R.Row>
    </R.Col>
  );
}

export default Dashboard;
