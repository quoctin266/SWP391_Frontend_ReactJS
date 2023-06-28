import { Container } from "react-bootstrap";
import "./Track.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FaDotCircle } from "react-icons/fa";
import { getTransportStatus } from "../../../service/APIservice";
import { useState } from "react";
import { toast } from "react-toastify";

const Track = () => {
  const [orderID, setOrderID] = useState("");
  const [invalidOrderID, setInvalidOrderID] = useState(false);
  const [statusList, setStatusList] = useState([]);

  const handleChangeOrderID = (e) => {
    setOrderID(e.target.value);
    setInvalidOrderID(false);
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderID) {
      setInvalidOrderID(true);
      toast.error("Please enter order ID.");
      return;
    }

    let data = await getTransportStatus(orderID);
    if (data && data.EC === 0) {
      setStatusList(data.DT);
    } else toast.error(data.EM);
  };

  return (
    <Container className="track-outer">
      <div className="track-container">
        <div className="title">Order Tracking</div>
        <div className="track-body">
          <div className="track-form">
            <Form onSubmit={(e) => handleTrack(e)}>
              <Row className="mb-3">
                <Form.Group as={Col} className="col-10 input-orderID">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Order ID"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="001"
                      min="1"
                      className="orderID-input"
                      onChange={(e) => handleChangeOrderID(e)}
                      isInvalid={invalidOrderID}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col} className="col-2 px-0 track">
                  <Button variant="primary" className="track-btn" type="submit">
                    Track
                  </Button>
                </Form.Group>
              </Row>
            </Form>
            <Row className="mb-3">
              <div className="order-status">
                <div className="condition-title">
                  {statusList && statusList.length > 0 && `Bird's condition:`}
                </div>
                {statusList &&
                  statusList.length > 0 &&
                  statusList.map((status) => {
                    if (status.bird_condition)
                      return (
                        <div className="condition-detail" key={status.id}>
                          <b>{status.date}:</b> &nbsp; {status.bird_condition}
                        </div>
                      );
                    else return "";
                  })}
              </div>
            </Row>
          </div>
          <div className="track-list">
            {statusList &&
              statusList.length > 0 &&
              statusList.map((status, index) => {
                if (index === 0)
                  return (
                    <div className="begin-date" key={status.id}>
                      <FaDotCircle /> {status.date}: {status.order_status}
                    </div>
                  );
                else
                  return (
                    <div className="bar-unit" key={status.id}>
                      <div className="border-left">.</div>
                      <div className="border-left">.</div>
                      <div className="date-info">
                        <FaDotCircle /> {status.date}: {status.order_status}
                      </div>
                    </div>
                  );
              })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Track;
