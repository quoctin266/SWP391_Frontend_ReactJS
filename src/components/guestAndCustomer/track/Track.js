import { Container } from "react-bootstrap";
import "./Track.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FaDotCircle } from "react-icons/fa";

const Track = () => {
  return (
    <Container className="track-outer">
      <div className="track-container">
        <div className="title">Order Tracking</div>
        <div className="track-body">
          <div className="track-form">
            <Row className="mb-3">
              <Form.Group as={Col} className="col-10">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Order ID"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="001"
                    min="0"
                    className="orderID-input"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} className="col-2 px-0">
                <Button variant="primary" className="track-btn">
                  Track
                </Button>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="order-status">
                <div className="condition-title">Bird's condition:</div>
                <div className="condition-detail">
                  <b>24/05/2023:</b> Bird eats and drinks normally, there is
                  nothing worth noting about his/her health.
                </div>
                <div className="condition-detail">
                  <b>25/05/2023:</b> Bird eats and drinks normally, there is
                  nothing worth noting about his/her health.
                </div>
              </div>
            </Row>
          </div>
          <div className="track-list">
            <div className="begin-date">
              <FaDotCircle /> 20/05/2023: Order received
            </div>
            <div className="bar-unit">
              <div className="border-left">invisible text</div>
              <div className="border-left">invisible text</div>
              <div className="date-info">
                <FaDotCircle /> 21/05/2023: Order confirmed
              </div>
            </div>
            <div className="bar-unit">
              <div className="border-left">invisible text</div>
              <div className="border-left">invisible text</div>
              <div className="date-info">
                <FaDotCircle /> 23/05/2023: Begin delivery
              </div>
            </div>
            <div className="bar-unit">
              <div className="border-left">invisible text</div>
              <div className="border-left">invisible text</div>
              <div className="date-info">
                <FaDotCircle /> 26/05/2023: Order has arrived in Vũng Tàu
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Track;
