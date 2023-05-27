import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ManageTrip = () => {
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
          <Modal.Title>Add new trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStart">
                <Form.Label>Staring location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter departure location"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEnd">
                <Form.Label>Arrival location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter arrival location"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridLimit">
                <Form.Label>Delivery limit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter delivery limit"
                  min="0"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Transporter</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter transporter's name"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDate">
                <Form.Label>Departure date</Form.Label>
                <Form.Control type="date" placeholder="Enter departure date" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMethod">
                <Form.Label>Transport Method</Form.Label>
                <Form.Select aria-label="transport method select">
                  <option value="TransportMethodID1">Air Travel</option>
                  <option value="TransportMethodID2">Ground Travel</option>
                </Form.Select>
              </Form.Group>
            </Row>
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
            <th>Departure location</th>
            <th>Arrival location</th>
            <th>Departure date</th>
            <th>Transport method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cà Mau</td>
            <td>Cần Thơ</td>
            <td>01/06/2023 07:00:00</td>
            <td>Ground Travel</td>
            <td>
              <Button variant="secondary" className="mx-2">
                View detail
              </Button>
              <Button variant="warning">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cần Thơ</td>
            <td>Tiền Giang</td>
            <td>03/06/2023 09:00:00</td>
            <td>Ground Travel</td>
            <td>
              <Button variant="secondary" className="mx-2">
                View detail
              </Button>
              <Button variant="warning">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Tiền Giang</td>
            <td>Hồ Chí Minh</td>
            <td>03/06/2023 15:00:00</td>
            <td>Ground Travel</td>
            <td>
              <Button variant="secondary" className="mx-2">
                View detail
              </Button>
              <Button variant="warning">Edit</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ManageTrip;
