import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import "./navbar.css";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false); 
  const [assistanceChecked, setAssistanceChecked] = useState(false); 
  const [cleaningChecked, setCleaningChecked] = useState(false); 

  const handleCallWaiter = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleCallWaiterSubmit = () => {
    let message = "";
    if (assistanceChecked && cleaningChecked) {
      message = "Assistance and cleaning are on their way!";
    } else if (assistanceChecked) {
      message = "Assistance is on its way!";
    } else if (cleaningChecked) {
      message = "Cleaning is on its way!";
    } else {
      return;
    }
    alert(message); 
    setShowModal(false); 
    setAssistanceChecked(false); 
    setCleaningChecked(false); 
  };

  return (
    <div className="navbar">
      <Container>
        <Link to="/"> Orderly </Link>
        <Button className="call-button" onClick={handleCallWaiter}>
          Call For Waiter
        </Button>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </Container>

      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Call For A Waiter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              className="modal-checkbox"
              type="checkbox"
              id="assistance"
              label="Assistance"
              checked={assistanceChecked}
              onChange={(e) => setAssistanceChecked(e.target.checked)}
            />
            <Form.Check
              className="modal-checkbox"
              type="checkbox"
              id="cleaning"
              label="Cleaning the table"
              checked={cleaningChecked}
              onChange={(e) => setCleaningChecked(e.target.checked)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  className="cancel-button" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className="submit-button" onClick={handleCallWaiterSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
