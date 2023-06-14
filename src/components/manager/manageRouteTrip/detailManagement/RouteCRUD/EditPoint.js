import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toMinutes, toTime } from "../../../../../utils/reuseFunction";
import _ from "lodash";
import { toast } from "react-toastify";

const EditPoint = (props) => {
  const [show, setShow] = useState(false);
  const [newStation, setNewStation] = useState("");
  const [stationListClone, setStationListClone] = useState([]);

  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");
  const [minute, setMinute] = useState("");
  const [distance, setDistance] = useState("");

  const [hourN, setHourN] = useState("");
  const [dayN, setDayN] = useState("");
  const [minuteN, setMinuteN] = useState("");
  const [distanceN, setDistanceN] = useState("");

  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [firstStation, setFirstStation] = useState(false);

  const handleClose = () => {
    setIsFirst(false);
    setIsLast(false);
    setShow(false);
    setFirstStation(false);
  };
  const handleShow = () => {
    routeDetail.forEach((item, index) => {
      if (item.station_id === station.station_id) {
        if (item.station_index === 1) {
          setIsFirst(true);
          setDistance(0);
          setDay(0);
          setHour(0);
          setMinute(0);

          if (routeDetail.length > 1) {
            setDistanceN(routeDetail[index + 1].preDistance);
            let timeObjN = toTime(routeDetail[index + 1].preDrivingTime);
            setDayN(timeObjN.day);
            setHourN(timeObjN.hour);
            setMinuteN(timeObjN.minute);
          } else {
            setDistanceN(0);
            setDayN(0);
            setHourN(0);
            setMinuteN(0);
            setFirstStation(true);
          }
        } else if (item.station_index === routeDetail.length) {
          setIsLast(true);
          setDistance(item.preDistance);
          let timeObjP = toTime(item.preDrivingTime);
          setDay(timeObjP.day);
          setHour(timeObjP.hour);
          setMinute(timeObjP.minute);

          setDistanceN(0);
          setDayN(0);
          setHourN(0);
          setMinuteN(0);
        } else {
          setDistanceN(routeDetail[index + 1].preDistance);
          let timeObjN = toTime(routeDetail[index + 1].preDrivingTime);
          setDayN(timeObjN.day);
          setHourN(timeObjN.hour);
          setMinuteN(timeObjN.minute);

          setDistance(item.preDistance);
          let timeObjP = toTime(item.preDrivingTime);
          setDay(timeObjP.day);
          setHour(timeObjP.hour);
          setMinute(timeObjP.minute);
        }
      }
    });
    let cloneList = _.cloneDeep(stationList);
    cloneList.push({
      name: station.name,
      station_id: station.station_id,
    });
    setNewStation(station);
    setStationListClone(cloneList);
    setShow(true);
  };

  let { routeDetail, station, stationList } = props;

  const handleChangeStation = (value) => {
    stationListClone.forEach((station) => {
      if (station.station_id === +value) {
        setNewStation(station);
      }
    });
  };

  const handleChangeDay = (value) => {
    setDay(+value);
  };

  const handleChangeHour = (value) => {
    setHour(+value);
  };

  const handleChangeMinute = (value) => {
    setMinute(+value);
  };

  const handleChangeDistance = (value) => {
    setDistance(+value);
  };

  const handleChangeDayN = (value) => {
    setDayN(+value);
  };

  const handleChangeHourN = (value) => {
    setHourN(+value);
  };

  const handleChangeMinuteN = (value) => {
    setMinuteN(+value);
  };

  const handleChangeDistanceN = (value) => {
    setDistanceN(+value);
  };

  const handleEditPoint = (e) => {
    e.preventDefault();
    let cloneRoute = _.cloneDeep(routeDetail);

    let preMinutes = toMinutes({
      day: day,
      hour: hour,
      minute: minute,
    });

    let nextMinutes = toMinutes({
      day: dayN,
      hour: hourN,
      minute: minuteN,
    });

    if (isFirst) {
      cloneRoute.forEach((item, index) => {
        if (index === 0) {
          item.station_id = newStation.station_id;
          item.name = newStation.name;
          item.distance = 0;
          item.driving_time = 0;
          item.preDistance = distance;
          item.preDrivingTime = preMinutes;
        } else if (index === 1) {
          item.distance = distanceN + distance;
          item.driving_time = nextMinutes + preMinutes;
          item.preDistance = distanceN;
          item.preDrivingTime = nextMinutes;
        } else {
          item.distance = item.preDistance + cloneRoute[index - 1].distance;
          item.driving_time =
            item.preDrivingTime + cloneRoute[index - 1].driving_time;
        }
      });
    }

    if (isLast) {
      cloneRoute.forEach((item, index) => {
        if (index === cloneRoute.length - 1) {
          item.station_id = newStation.station_id;
          item.name = newStation.name;
          item.preDistance = distance;
          item.preDrivingTime = preMinutes;
          item.distance = distance + cloneRoute[index - 1].distance;
          item.driving_time = preMinutes + cloneRoute[index - 1].driving_time;
        }
      });
    }

    if (!isFirst && !isLast) {
      cloneRoute.forEach((item, index) => {
        if (item.station_id === station.station_id) {
          item.station_id = newStation.station_id;
          item.name = newStation.name;
          item.preDrivingTime = preMinutes;
          item.preDistance = distance;
          item.driving_time = preMinutes + cloneRoute[index - 1].driving_time;
          item.distance = distance + cloneRoute[index - 1].distance;

          cloneRoute[index + 1].preDrivingTime = nextMinutes;
          cloneRoute[index + 1].preDistance = distanceN;
          cloneRoute[index + 1].driving_time = item.driving_time + nextMinutes;
          cloneRoute[index + 1].distance = item.distance + distanceN;

          for (let i = index + 2; i < cloneRoute.length; i++) {
            cloneRoute[i].driving_time =
              cloneRoute[i].preDrivingTime + cloneRoute[i - 1].driving_time;
            cloneRoute[i].distance =
              cloneRoute[i].preDistance + cloneRoute[i - 1].distance;
          }
        }
      });
    }

    cloneRoute.forEach((item) => {
      let timeObj = toTime(item.driving_time);
      item.driving_time_text = `${timeObj.day} Days ${timeObj.hour} Hours ${timeObj.minute} Minutes`;
    });
    props.setRouteDetail(cloneRoute);
    toast.success("Changes have been saved.");
    handleClose();
  };

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
        <Form onSubmit={handleEditPoint}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>Select New Station</Form.Label>
                <Form.Select
                  aria-label="select station"
                  defaultValue={
                    newStation.station_id ? newStation.station_id : ""
                  }
                  onChange={(e) => handleChangeStation(e.target.value)}
                >
                  {stationListClone &&
                    stationListClone.length > 0 &&
                    stationListClone.map((station) => {
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

            <Row>
              <Col>
                <Form.Label>Driving Time From Previous Station</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Days"
                      min="0"
                      disabled={isFirst}
                      value={day}
                      onChange={(e) => handleChangeDay(e.target.value)}
                    />
                  </Col>

                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Hours"
                      min="0"
                      max="24"
                      disabled={isFirst}
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
                      disabled={isFirst}
                      value={minute}
                      onChange={(e) => handleChangeMinute(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>

              <Form.Group className="mb-3" controlId="formPreDistance" as={Col}>
                <Form.Label>Distance From Previous Station</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Distance from previous station in Km"
                  min="0"
                  step="0.1"
                  disabled={isFirst}
                  value={distance}
                  onChange={(e) => handleChangeDistance(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <Form.Label>Driving Time To Next Station</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Days"
                      min="0"
                      disabled={isLast || firstStation}
                      value={dayN}
                      onChange={(e) => handleChangeDayN(e.target.value)}
                    />
                  </Col>

                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Hours"
                      min="0"
                      max="24"
                      disabled={isLast || firstStation}
                      value={hourN}
                      onChange={(e) => handleChangeHourN(e.target.value)}
                    />
                  </Col>

                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Minutes"
                      min="0"
                      max="60"
                      disabled={isLast || firstStation}
                      value={minuteN}
                      onChange={(e) => handleChangeMinuteN(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>

              <Form.Group
                className="mb-3"
                controlId="formNextDistance"
                as={Col}
              >
                <Form.Label>Distance To Next Station</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Distance to next station in Km"
                  min="0"
                  step="0.1"
                  disabled={isLast || firstStation}
                  value={distanceN}
                  onChange={(e) => handleChangeDistanceN(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditPoint;
