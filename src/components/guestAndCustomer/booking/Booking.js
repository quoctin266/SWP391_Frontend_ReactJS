import "./Booking.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";

const Booking = () => {
  const navigate = useNavigate();

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

                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>
                      Do you have travel crates for your bird?
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Yes"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                      />
                    </Col>
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
                  <th>Crate</th>
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
                <Form.Group as={Col}>
                  <Form.Label>Bird's Anticipate Travel Date</Form.Label>
                  <Form.Control type="date" className="mb-3" />
                  <Form.Label>Bird's Departure city</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter departure city"
                    className="mb-3"
                  />
                  <Form.Label>Bird's Arrival city</Form.Label>
                  <Form.Control type="text" placeholder="Enter arrival city" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTransport">
                  <Form.Label>Transport Method</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option value="TransportMethodID1">Ground Travel</option>
                    <option value="TransportMethodID2">Air Travel</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
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

                <Form.Group as={Col}>
                  <Form.Label className="mb-3">Order Summary</Form.Label>
                  <div className="order-summary">
                    <div className="bird-number">
                      Numbers of Bird: <span>1</span>
                    </div>
                    <div className="route">
                      Route: <span>HCM to HN</span>
                    </div>
                    <div className="package">
                      Package: <span>VIP</span>
                    </div>
                    <div className="handling-fee">
                      Total cost: <span>500,000 VND</span>
                    </div>
                  </div>
                </Form.Group>
              </Row>
            </Form>
            <Button
              className="confirm-order-btn"
              onClick={() => navigate("/booking-success")}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Booking;
