import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

const ManageRoute = () => {
  const [show, setShow] = useState(false);
  const [showCourse, setShowCourse] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="add-btn">
        Add new
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicStation">
              <Form.Label>Add Station</Form.Label>
              <Form.Select aria-label="select station">
                <option value="stationID1">Cà Mau</option>
                <option value="stationID2">Cần Thơ</option>
                <option value="stationID3">Hồ Chí Minh</option>
                <option value="stationID4">Đồng Nai</option>
                <option value="stationID5">Lâm Đồng</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Form.Group
                className="mb-3"
                controlId="formBasicDrivingTime"
                as={Col}
              >
                <Form.Label>Driving Time</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Time needed to reach from origin in hours"
                  min="0"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicDistance"
                as={Col}
              >
                <Form.Label>Distance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Distance from origin in Km"
                  min="0"
                  step="0.1"
                />
              </Form.Group>
            </Row>
            <Button
              variant="warning"
              className="mb-4"
              onClick={() => setShowCourse(true)}
            >
              Add station
            </Button>
            {showCourse && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Note</th>
                    <th>Station</th>
                    <th>Driving Time</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Origin</td>
                    <td>Hồ Chí Minh</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Đồng Nai</td>
                    <td>8 Hours</td>
                    <td>8 Km</td>
                  </tr>
                  <tr>
                    <td>Destination</td>
                    <td>Lâm Đồng</td>
                    <td>18 Hours</td>
                    <td>18 Km</td>
                  </tr>
                </tbody>
              </Table>
            )}
            <Form.Group
              className="mt-5 mb-3"
              controlId="formBasicDescription"
              as={Col}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter route description" />
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
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cà Mau</td>
            <td>Hồ Chí Minh</td>
            <td>Cà Mau - Cần Thơ - Hồ Chí Minh</td>
            <td>
              <Button variant="secondary">Detail</Button>
              <Button variant="warning" className="mx-2">
                Edit
              </Button>
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Đak Lak</td>
            <td>Quảng Trị</td>
            <td>Đak Lak - Bình Định - Quảng Nam - Quảng Trị</td>
            <td>
              <Button variant="secondary">Detail</Button>
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
