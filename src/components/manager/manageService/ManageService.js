import "./ManageService.scss";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const ManageService = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [showTransport, setShowTransport] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const handleClosePayment = () => setShowPayment(false);
  const handleShowPayment = () => setShowPayment(true);

  const handleCloseTransport = () => setShowTransport(false);
  const handleShowTransport = () => setShowTransport(true);

  const handleClosePrice = () => setShowPrice(false);
  const handleShowPrice = () => setShowPrice(true);
  return (
    <div className="manage-service-container">
      <div className="title">Manage service</div>
      <div className="service-body">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0" className="manage-payment">
            <Accordion.Header>Manage Payment Method</Accordion.Header>
            <Accordion.Body>
              <Button
                variant="primary"
                onClick={handleShowPayment}
                className="add-btn"
              >
                Add new
              </Button>

              <Modal
                show={showPayment}
                onHide={handleClosePayment}
                backdrop="static"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add new payment method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Payment method name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name of the payment method"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Select aria-label="payment status select">
                        <option value="Active">Active</option>
                        <option value="Disable">Disable</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClosePayment}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClosePayment}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Payment method</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>COD</td>
                    <td>Active</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>VNPAY/MOMO</td>
                    <td>Active</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Paypal</td>
                    <td>Active</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Visa</td>
                    <td>Disable</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="manage-transport">
            <Accordion.Header>Manage Transport Method</Accordion.Header>
            <Accordion.Body>
              <Button
                variant="primary"
                onClick={handleShowTransport}
                className="add-btn"
              >
                Add new
              </Button>

              <Modal
                show={showTransport}
                onHide={handleCloseTransport}
                backdrop="static"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add new transport method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Transport method name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name of the transport method"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Select aria-label="transport status select">
                        <option value="Active">Active</option>
                        <option value="Disable">Disable</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseTransport}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleCloseTransport}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Transport method</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Air travel</td>
                    <td>Disable</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Ground travel</td>
                    <td>Active</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="manage-price">
            <Accordion.Header>Manage Price</Accordion.Header>
            <Accordion.Body>
              <Button
                variant="primary"
                onClick={handleShowPrice}
                className="add-btn"
              >
                Add new
              </Button>

              <Modal
                show={showPrice}
                onHide={handleClosePrice}
                backdrop="static"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add new price</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicMethod">
                      <Form.Label>Transport method</Form.Label>
                      <Form.Select aria-label="method select">
                        <option value="TransportMethodID1">Air Travel</option>
                        <option value="TransportMethodID2">
                          Ground Travel
                        </option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDistance">
                      <Form.Label>Distance</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter distance in Kilometer"
                        min="0"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCost">
                      <Form.Label>Cost</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter cost in Dong"
                        min="0"
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClosePrice}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClosePrice}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Transport method</th>
                    <th>Distance</th>
                    <th>Cost</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Air travel</td>
                    <td> &lt; 1000 Km</td>
                    <td>1000000 Dong</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Air travel</td>
                    <td> &lt; 2000 Km</td>
                    <td>2000000 Dong</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Ground travel</td>
                    <td> &lt; 500 Km</td>
                    <td>500000 Dong</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Ground travel</td>
                    <td> &lt; 700 Km</td>
                    <td>700000 Dong</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default ManageService;
