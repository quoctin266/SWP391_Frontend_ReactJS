import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const ManageStation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="station-title">Station List</div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add new
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicStation">
              <Form.Label>Station Name</Form.Label>
              <Form.Control type="text" placeholder="Enter station name" />
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
      <div className="station-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Station</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Cà Mau</td>
              <td>
                <Button variant="warning">Edit</Button>
                <Button variant="danger" className="mx-2">
                  Delete
                </Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Hồ Chí Minh</td>
              <td>
                <Button variant="warning">Edit</Button>
                <Button variant="danger" className="mx-2">
                  Delete
                </Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Hà Nội</td>
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

export default ManageStation;
