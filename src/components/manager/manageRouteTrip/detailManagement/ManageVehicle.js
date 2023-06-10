import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const ManageVehicle = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="vehicle-title">Vehicle List</div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add new
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicVehicle">
              <Form.Label>Vehicle Name</Form.Label>
              <Form.Control type="text" placeholder="Enter vehicle name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCarryLimit">
              <Form.Label>Carry Limit</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter carry limit"
                min="0"
              />
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
      <div className="vehicle-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Carry Limit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Kenworth W900</td>
              <td>20</td>
              <td>
                <Button variant="warning">Edit</Button>
                <Button variant="danger" className="mx-2">
                  Delete
                </Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Western Star</td>
              <td>25</td>
              <td>
                <Button variant="warning">Edit</Button>
                <Button variant="danger" className="mx-2">
                  Delete
                </Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>International ProStar</td>
              <td>30</td>
              <td>
                <Button variant="warning">Edit</Button>
                <Button variant="danger" className="mx-2">
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ManageVehicle;
