import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

function Mdl(props) {
  const { modalState, modalHandleChange, modalHandleSubmit } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Expenses
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Expenses Item</Form.Label>
          <Form.Control
            type="text"
            value={modalState.expenseItem}
            name="expenseItem"
            onChange={modalHandleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Expenses Cost</Form.Label>
          <Form.Control
            type="text"
            value={modalState.expenseCost}
            name="expenseCost"
            onChange={modalHandleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Expenses Date</Form.Label>
          <Form.Control
            type="date"
            value={modalState.expenseDate}
            name="expenseDate"
            onChange={modalHandleChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={modalHandleSubmit}>
          Update
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Mdl;
