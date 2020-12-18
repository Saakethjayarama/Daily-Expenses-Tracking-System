import React from "react";
import * as R from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

function Period(props) {
  const { override, handleClick, setPeriods, periods } = props;
  return (
    <R.Col xs={12} md={12} className="Manage">
      <Form>
        {override ? (
          <>
            <Form.Group controlId="fromdate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={props.periods.startDate}
                onChange={(event) => {
                  setPeriods({
                    ...periods,
                    startDate: event.target.value,
                  });
                }}
              />
            </Form.Group>
          </>
        ) : (
          <>
            <Form.Group controlId="fromdate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={props.periods.startDate}
                onChange={(event) => {
                  setPeriods({
                    ...periods,
                    startDate: event.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="todate">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                value={props.periods.endDate}
                onChange={(event) => {
                  setPeriods({
                    ...periods,
                    endDate: event.target.value,
                  });
                }}
              />
            </Form.Group>
          </>
        )}
        <Button
          variant="primary"
          onClick={(event) => {
            event.preventDefault();
            handleClick();
          }}
        >
          Submit
        </Button>
      </Form>
    </R.Col>
  );
}

export default Period;
