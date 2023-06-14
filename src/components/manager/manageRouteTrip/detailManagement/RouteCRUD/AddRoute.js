import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import {
  getAllStation,
  postCreateRoute,
} from "../../../../../service/APIservice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toMinutes, toTime } from "../../../../../utils/reuseFunction";

const AddRoute = (props) => {
  const [show, setShow] = useState(false);

  const [stationList, setStationList] = useState([]);
  const [station, setStation] = useState("");
  const [invalidStation, setInvalidStation] = useState(false);
  const [hour, setHour] = useState("");
  const [invalidHour, setInvalidHour] = useState(false);
  const [day, setDay] = useState("");
  const [invalidDay, setInvalidDay] = useState(false);
  const [minute, setMinute] = useState("");
  const [invalidMinute, setInvalidMinute] = useState(false);
  const [distance, setDistance] = useState("");
  const [invalidDistance, setInvalidDistance] = useState(false);

  const [routeDetail, setRouteDetail] = useState([]);
  const [description, setDescription] = useState("");
  const [invalidDes, setInvalidDes] = useState(false);

  const handleClose = () => {
    setDay("");
    setHour("");
    setMinute("");
    setDistance("");
    setRouteDetail([]);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const fetchAllStation = async () => {
    let data = await getAllStation();
    if (data && data.EC === 0) {
      setStationList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllStation();
  }, []);

  const handleChangeDay = (value) => {
    setDay(+value);
    setInvalidDay(false);
  };

  const handleChangeHour = (value) => {
    setHour(+value);
    setInvalidHour(false);
  };

  const handleChangeMinute = (value) => {
    setMinute(+value);
    setInvalidMinute(false);
  };

  const handleChangeStation = (value) => {
    stationList.forEach((station) => {
      if (station.station_id === +value) {
        setStation(station);
      }
    });
    setInvalidStation(false);
  };

  const handleChangeDistance = (value) => {
    setDistance(+value);
    setInvalidDistance(false);
  };

  const handleAddStation = (e) => {
    e.preventDefault();

    if (!station) {
      toast.error("Must select a station.");
      setInvalidStation(true);
      return;
    }

    let duplicateStation = false;
    if (routeDetail.length > 0) {
      routeDetail.forEach((item) => {
        if (item.stationID === station.station_id) {
          toast.warning("Duplicated station detected.");
          setInvalidStation(true);
          duplicateStation = true;
        }
      });
    }

    if (duplicateStation) return;

    if (day !== 0) {
      if (!day) {
        toast.error("Please specify a valid number.");
        setInvalidDay(true);
        return;
      }
    }

    if (hour !== 0) {
      if (!hour) {
        toast.error("Please specify a valid number.");
        setInvalidHour(true);
        return;
      }
    }

    if (minute !== 0) {
      if (!minute) {
        toast.error("Please specify a valid number.");
        setInvalidMinute(true);
        return;
      }
    }

    if (distance !== 0) {
      if (!distance) {
        toast.error("Please specify a valid number.");
        setInvalidDistance(true);
        return;
      }
    }

    let preTimeMinutes = toMinutes({
      day: day,
      hour: hour,
      minute: minute,
    });

    let newRouteDetail = [...routeDetail];
    if (newRouteDetail.length === 0) {
      newRouteDetail.push({
        stationID: station.station_id,
        name: station.name,
        station_index: 1,
        originTimeMinute: preTimeMinutes,
        originTime: `${day} Days ${hour} Hours ${minute} Minutes`,
        preTimeMinute: preTimeMinutes,
        originDistance: distance,
        preDistance: distance,
      });
    } else {
      let newOriginTimeMinute =
        newRouteDetail[newRouteDetail.length - 1].originTimeMinute +
        preTimeMinutes;
      let newOriginTimeObj = toTime(newOriginTimeMinute);
      let newOriginDistance =
        newRouteDetail[newRouteDetail.length - 1].originDistance + distance;
      let index = newRouteDetail[newRouteDetail.length - 1].station_index + 1;

      newRouteDetail.push({
        stationID: station.station_id,
        name: station.name,
        station_index: index,
        originTimeMinute: newOriginTimeMinute,
        originTime: `${newOriginTimeObj.day} Days ${newOriginTimeObj.hour} Hours ${newOriginTimeObj.minute} Minutes`,
        preTimeMinute: preTimeMinutes,
        originDistance: newOriginDistance,
        preDistance: distance,
      });
    }
    setRouteDetail(newRouteDetail);
  };

  const handleChangeDes = (value) => {
    setDescription(value);
    setInvalidDes(false);
  };

  const handleCreateRoute = async () => {
    if (routeDetail.length < 2) {
      toast.error("Route must contain more than 1 station.");
      return;
    }

    if (!description) {
      toast.error("Description must not be empty.");
      return;
    }

    let data = await postCreateRoute(routeDetail, description);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllRoute();
      handleClose();
    } else toast.error(data.EM);
  };

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
          <Form.Group className="mb-3" controlId="formBasicStation">
            <Form.Label>Add Station</Form.Label>
            <Form.Select
              aria-label="select station"
              defaultValue=""
              isInvalid={invalidStation}
              onChange={(e) => handleChangeStation(e.target.value)}
            >
              <option value="" disabled hidden>
                Select station
              </option>
              {stationList &&
                stationList.length > 0 &&
                stationList.map((station) => {
                  return (
                    <option value={station.station_id} key={station.station_id}>
                      {station.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>

          <Form>
            <Row>
              <Col>
                <Form.Label>Driving Time From Previous Station</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Days"
                      min="0"
                      value={day}
                      isInvalid={invalidDay}
                      onChange={(e) => handleChangeDay(e.target.value)}
                    />
                  </Col>

                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Hours"
                      min="0"
                      max="24"
                      isInvalid={invalidHour}
                      value={hour}
                      onChange={(e) => handleChangeHour(e.target.value)}
                    />
                  </Col>

                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Minutes"
                      min="0"
                      max="60"
                      isInvalid={invalidMinute}
                      value={minute}
                      onChange={(e) => handleChangeMinute(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>

              <Form.Group
                className="mb-3"
                controlId="formBasicDistance"
                as={Col}
              >
                <Form.Label>Distance From Previous Station</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Distance from previous station in Km"
                  min="0"
                  step="0.1"
                  value={distance}
                  isInvalid={invalidDistance}
                  onChange={(e) => handleChangeDistance(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Button
              variant="warning"
              className="mb-4"
              type="submit"
              onClick={(e) => handleAddStation(e)}
            >
              Add station
            </Button>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Station</th>
                <th>Driving Time From First Station</th>
                <th>Distance From First Station</th>
              </tr>
            </thead>
            <tbody>
              {routeDetail &&
                routeDetail.length > 0 &&
                routeDetail.map((item, index) => {
                  return (
                    <tr key={item.stationID}>
                      <td>
                        {index === 0
                          ? "Departure"
                          : index === routeDetail.length - 1
                          ? "Destination"
                          : ""}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.originTime}</td>
                      <td>{item.originDistance} Km</td>
                    </tr>
                  );
                })}
              {routeDetail && routeDetail.length === 0 && (
                <tr>
                  <td colSpan={4}>No station added yet...</td>
                </tr>
              )}
            </tbody>
          </Table>

          <Form.Group
            className="mt-5 mb-3"
            controlId="formBasicDescription"
            as={Col}
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter route description"
              value={description}
              isInvalid={invalidDes}
              onChange={(e) => handleChangeDes(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateRoute}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRoute;
