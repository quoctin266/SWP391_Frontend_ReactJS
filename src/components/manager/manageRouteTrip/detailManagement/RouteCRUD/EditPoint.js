import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toMinutes, toTime } from "../../../../../utils/reuseFunction";
import { useEffect } from "react";

const EditPoint = (props) => {
  const [show, setShow] = useState(false);
  const [newStation, setNewStation] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { routeDetail, station, stationList } = props;

  const handleChangeStation = (value) => {
    stationList.forEach((station) => {
      if (station.station_id === +value) {
        setNewStation(station);
      }
    });
  };

  useEffect(() => {
    stationList.push({
      name: station.name,
      station_id: station.station_id,
    });
  }, [stationList, station.name, station.station_id]);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Change
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Station</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>Select New Station</Form.Label>
                <Form.Select
                  aria-label="select station"
                  defaultValue={station.station_id ? station.station_id : ""}
                  onChange={(e) => handleChangeStation(e.target.value)}
                >
                  {stationList &&
                    stationList.length > 0 &&
                    stationList.map((station) => {
                      return (
                        <option
                          value={station.station_id}
                          key={station.station_id}
                        >
                          {station.name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Col>

              <Col></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Confirm</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditPoint;
