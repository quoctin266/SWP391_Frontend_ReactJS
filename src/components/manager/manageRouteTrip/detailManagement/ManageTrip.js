import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";

const ManageTrip = () => {
  const [show, setShow] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const routes = [
    {
      value: "routeID1",
      label: "Cà Mau - Cần Thơ - Hồ Chí Minh - Đồng Nai - Lâm Đồng",
    },
    { value: "routeID2", label: "Bình Định - Quảng Nam - Quảng Trị - Hà Tĩnh" },
    { value: "routeID3", label: "Hà Nội - Tuyên Quang - Lào Cai - Sơn La" },
  ];

  return (
    <>
      <div className="route-title">Select Route</div>
      <div className="route-list">
        <Select
          defaultValue={selectedRoute}
          onChange={setSelectedRoute}
          options={routes}
        />
        <div className="detail-title">Route detail</div>
        <div className="route-detail">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Station</th>
                <th>Driving time</th>
                <th>Distance from origin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hà Nội</td>
                <td>0 hours</td>
                <td>0 Km</td>
              </tr>
              <tr>
                <td>Tuyên Quang</td>
                <td>5 hours</td>
                <td>15 Km</td>
              </tr>
              <tr>
                <td>Lào Cai</td>
                <td>10 hours</td>
                <td>20 Km</td>
              </tr>
              <tr>
                <td>Sơn La</td>
                <td>15 hours</td>
                <td>25 Km</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <div className="trip-title">Current Trips</div>
      <Button variant="primary" onClick={handleShow} className="add-btn">
        Add new
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDate">
                <Form.Label>Departure date</Form.Label>
                <Form.Control type="date" placeholder="Enter departure date" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDriver">
                <Form.Label>Driver</Form.Label>
                <Form.Control type="text" placeholder="Enter driver name" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formGridVehicle" as={Col}>
                <Form.Label>Select vehicle</Form.Label>
                <Form.Select aria-label="vehicle select">
                  <option value="VehicleID1">International ProStar</option>
                  <option value="VehicleID2">Western Star</option>
                  <option value="VehicleID3">Kenworth W900</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}></Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formGridCarryLimit" as={Col}>
                <Form.Label>Carry Limit</Form.Label>
                <Form.Control type="text" value="30" disabled />
              </Form.Group>

              <Form.Group as={Col}></Form.Group>
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
      <div className="trip-list">
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>ID</th>
              <th>Departure date</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>01/06/2023 07:00:00</td>
              <td>Hùng</td>
              <th>
                <Button variant="secondary">View</Button>
              </th>
              <td>
                <Button variant="warning" className="mx-2">
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>03/06/2023 09:00:00</td>
              <td>Mạnh</td>
              <td>
                <Button variant="secondary">View</Button>
              </td>
              <td>
                <Button variant="warning" className="mx-2">
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>05/06/2023 15:00:00</td>
              <td>Hải</td>
              <td>
                <Button variant="secondary">View</Button>
              </td>
              <td>
                <Button variant="warning" className="mx-2">
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ManageTrip;
