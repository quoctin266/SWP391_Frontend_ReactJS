import "./Booking.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

const Booking = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCuqONgc2cx1SjnrYO4s9AZayDyqMHauZ4",
    // googleMapsApiKey: "AIzaSyAOd56WYDxHrJAhOvngce5eaEIcryQ-ZBE",
    libraries: libraries,
  });

  const navigate = useNavigate();
  const originRef = useRef();
  const destinationRef = useRef();
  const [distance, setDistance] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const handleCloseSummary = () => setShowSummary(false);
  const handleShowSummary = () => {
    calculateRoute();
    setTimeout(() => {
      setShowSummary(true);
    }, 1000);
  };

  const calculateRoute = async (event) => {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDistance(results.routes[0].legs[0].distance.text);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="booking-outer">
      <div className="booking-container">
        <div className="title">BIRD TRAVEL</div>
        <div className="booking-body">
          <div className="bird-customer-body">
            <div className="customer-info">
              <div className="customer-title">Your Information</div>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="1234 street..." />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="xxxx-xxx-xxx"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                    />
                  </Form.Group>
                </Row>
              </Form>
            </div>
            <div className="bird-info">
              <div className="bird-title">Bird Information</div>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>Gender of Bird</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Bird name</Form.Label>
                    <Form.Control type="text" placeholder="Your bird's name" />
                  </Form.Group>
                </Row>
                <Row className="mb-5">
                  <Form.Group as={Col} controlId="formGridAge">
                    <Form.Label>Bird Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your bird's age in year"
                      min="1"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridWeight">
                    <Form.Label>Bird Weight</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your bird's weight in Kilogram"
                      min="0"
                      step="0.1"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    as={Col}
                  >
                    <Form.Label>Note</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3 btn-outer">
                    <Button className="add-bird-btn">Add another bird</Button>
                  </Form.Group>
                </Row>
              </Form>
            </div>
          </div>
          <div className="package-body">
            <div className="package-title">Service Package</div>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Water</th>
                  <th>Food</th>
                  <th>Healthcare</th>
                  <th>Home pick up/deliver</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard</td>
                  <td>
                    <FcCheckmark />
                  </td>
                  <td>Regular</td>
                  <td></td>
                  <td></td>
                  <td>99,000</td>
                </tr>
                <tr>
                  <td>VIP</td>
                  <td>
                    <FcCheckmark />
                  </td>
                  <td>Premium</td>
                  <td>
                    <FcCheckmark />
                  </td>
                  <td></td>
                  <td>199,000</td>
                </tr>
                <tr>
                  <td>Luxury</td>
                  <td>
                    <FcCheckmark />
                  </td>
                  <td>Premium</td>
                  <td>
                    <FcCheckmark />
                  </td>
                  <td>
                    <FcCheckmark />
                  </td>
                  <td>269,000</td>
                </tr>
              </tbody>
            </Table>
            <Form.Group as={Col}>
              <Form.Label>Choose your package</Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Standard"
                  name="servicePackage"
                  value="standard"
                  id="standard"
                />
                <Form.Check
                  type="radio"
                  label="VIP"
                  name="servicePackage"
                  value="vip"
                  id="vip"
                />
                <Form.Check
                  type="radio"
                  label="Luxury"
                  name="servicePackage"
                  value="luxury"
                  id="luxury"
                />
              </Col>
            </Form.Group>
          </div>
          <div className="transport-body">
            <div className="transport-title">Transport Information</div>
            <Form>
              <Row className="mb-5">
                <Form.Group as={Col} className="col-6">
                  <Form.Label>Bird's Anticipate Travel Date</Form.Label>
                  <Form.Control type="date" className="mb-3" />

                  <Form.Label>Bird's Departure city</Form.Label>
                  <Form.Select
                    aria-label="depart select"
                    className="mb-3"
                    ref={originRef}
                  >
                    <option value="Ca Mau">Ca Mau</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Ha Noi">Ha Noi</option>
                  </Form.Select>

                  <Form.Label>Bird's Arrival city</Form.Label>
                  <Form.Select
                    aria-label="destination select"
                    ref={destinationRef}
                  >
                    <option value="Ca Mau">Ca Mau</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Ha Noi">Ha Noi</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} className="col-4">
                  <Form.Label>Payment method</Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="COD"
                      name="paymentmethod"
                      value="method1"
                      id="cod"
                    />
                    <Form.Check
                      type="radio"
                      label="VNPAY/MOMO"
                      name="paymentmethod"
                      value="method2"
                      id="vnpay/momo"
                    />
                    <Form.Check
                      type="radio"
                      label="Paypal"
                      name="paymentmethod"
                      value="method3"
                      id="paypal"
                    />
                  </Col>
                </Form.Group>
              </Row>

              <Modal show={showSummary} onHide={handleCloseSummary}>
                <Modal.Header closeButton>
                  <Modal.Title>Order Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="order-summary">
                    <div className="bird-number">
                      Numbers of Bird: <span>1</span>
                    </div>
                    <div className="route">
                      Route: <span>HCM to HN</span>
                    </div>
                    <div className="distance">
                      Distance: <span>{distance}</span>
                    </div>
                    <div className="package">
                      Package: <span>VIP</span>
                    </div>
                    <div className="handling-fee">
                      Total cost: <span>500,000 VND</span>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseSummary}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/booking-success")}
                  >
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form>
            <Button className="confirm-order-btn" onClick={handleShowSummary}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Booking;
