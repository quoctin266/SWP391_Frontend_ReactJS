import { Container } from "react-bootstrap";
import "./Track.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Track = () => {
  return (
    <Container>
      <div className="track-container">
        <div className="title">Order Tracking</div>
        <div className="track-body">
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
            <div className="order-status"></div>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Track;
