import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const ManageRoute = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="add-btn">
        Add new
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicStart">
              <Form.Label>Starting point</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter departure location"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEnd">
              <Form.Label>End point</Form.Label>
              <Form.Control type="text" placeholder="Enter arrival location" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Starting point</th>
            <th>End point</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cà Mau</td>
            <td>Hồ Chí Minh</td>
            <td>
              <Button variant="warning" className="mx-2">
                Edit
              </Button>
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Vũng Tàu</td>
            <td>Khánh Hòa</td>
            <td>
              <Button variant="warning" className="mx-2">
                Edit
              </Button>
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Đak Lak</td>
            <td>Huế</td>
            <td>
              <Button variant="warning" className="mx-2">
                Edit
              </Button>
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ManageRoute;
