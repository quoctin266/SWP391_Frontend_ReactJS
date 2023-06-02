import "./ManageService.scss";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { FcCheckmark } from "react-icons/fc";

const ManageService = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showPackage, setShowPackage] = useState(false);

  const handleClosePayment = () => setShowPayment(false);
  const handleShowPayment = () => setShowPayment(true);

  const handleClosePrice = () => setShowPrice(false);
  const handleShowPrice = () => setShowPrice(true);

  const handleClosePackage = () => setShowPackage(false);
  const handleShowPackage = () => setShowPackage(true);
  return (
    <div className="manage-service-container">
      <div className="title">Manage Service</div>
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
                  <Modal.Title>Add New Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Payment method name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter payment method name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicType">
                      <Form.Label>Payment Type</Form.Label>
                      <Form.Select aria-label="payment type select">
                        <option value="COD">COD</option>
                        <option value="Online">Online</option>
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
                    <th>Payment type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Cash</td>
                    <td>COD</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>MOMO</td>
                    <td>COD</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Paypal</td>
                    <td>Online</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Visa</td>
                    <td>Online</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>MOMO</td>
                    <td>Online</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="manage-price">
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
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add New Price</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicMin"
                        as={Col}
                      >
                        <Form.Label>Min Distance</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter min distance in Kilometer"
                          min="0"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicMax"
                        as={Col}
                      >
                        <Form.Label>Max Distance</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter max distance in Kilometer"
                          min="0"
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formBasicCost">
                      <Form.Label>Initial Cost</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter cost in VND"
                        min="0"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAdditionalCost"
                    >
                      <Form.Label>Additional Bird Cost</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter cost in VND"
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
                    <th>Distance</th>
                    <th>Initial Cost</th>
                    <th>Each Additional Bird Cost</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td> 0 - 100 Km</td>
                    <td>100,000 VND</td>
                    <td>100,000 VND</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td> 100 - 200 Km</td>
                    <td>200,000 VND</td>
                    <td>100,000 VND</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td> 200 - 300 Km</td>
                    <td>300,000 VND</td>
                    <td>100,000 VND</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td> 300 - 400 Km</td>
                    <td>400,000 VND</td>
                    <td>100,000 VND</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td> From 400 Km</td>
                    <td>500,000 VND</td>
                    <td>100,000 VND</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="manage-package">
            <Accordion.Header>Manage Package</Accordion.Header>
            <Accordion.Body>
              <Button
                variant="primary"
                onClick={handleShowPackage}
                className="add-btn"
              >
                Add new
              </Button>

              <Modal
                show={showPackage}
                onHide={handleClosePackage}
                backdrop="static"
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add New Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPackage"
                        as={Col}
                      >
                        <Form.Label>Package name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter package name"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFood"
                        as={Col}
                      >
                        <Form.Label>Food type</Form.Label>
                        <Form.Select aria-label="food type select">
                          <option value="Regular">Regular</option>
                          <option value="Premium">Premium</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicHealthcare"
                        as={Col}
                      >
                        <Form.Label>Healthcare</Form.Label>
                        <Form.Select aria-label="healthcare select">
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPickup"
                        as={Col}
                      >
                        <Form.Label>Home pick up/deliver</Form.Label>
                        <Form.Select aria-label="pick up select">
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPrice"
                        as={Col}
                      >
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter cost in VND"
                          min="0"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicEmpty"
                        as={Col}
                      ></Form.Group>
                    </Row>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClosePackage}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClosePackage}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>Food type</th>
                    <th>Healthcare</th>
                    <th>Home pick up/deliver</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Standard</td>
                    <td>Regular</td>
                    <td></td>
                    <td></td>
                    <td>99,000</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>VIP</td>
                    <td>Premium</td>
                    <td>
                      <FcCheckmark />
                    </td>
                    <td></td>
                    <td>199,000</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Luxury</td>
                    <td>Premium</td>
                    <td>
                      <FcCheckmark />
                    </td>
                    <td>
                      <FcCheckmark />
                    </td>
                    <td>269,000</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
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
