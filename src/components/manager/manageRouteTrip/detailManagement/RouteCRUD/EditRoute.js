import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  getAllStation,
  putUpdateRoute,
} from "../../../../../service/APIservice";
import { useEffect } from "react";
import { toMinutes, toTime } from "../../../../../utils/reuseFunction";
import EditPoint from "./EditPoint";
import DeletePoint from "./DeletePoint";

const EditRoute = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [stationList, setStationList] = useState([]);

  const [invalidStation, setInvalidStation] = useState(false);
  const [station, setStation] = useState("");
  const [addPreStation, setAddPreStation] = useState("");
  const [addNextStation, setAddNextStation] = useState("");
  const [invalidAddPre, setInvalidAddPre] = useState(false);
  const [preOption, setPreOption] = useState([]);

  const [hour, setHour] = useState("");
  const [invalidHour, setInvalidHour] = useState(false);
  const [day, setDay] = useState("");
  const [invalidDay, setInvalidDay] = useState(false);
  const [minute, setMinute] = useState("");
  const [invalidMinute, setInvalidMinute] = useState(false);
  const [distance, setDistance] = useState("");
  const [invalidDistance, setInvalidDistance] = useState(false);

  const [hourN, setHourN] = useState("");
  const [invalidHourN, setInvalidHourN] = useState(false);
  const [dayN, setDayN] = useState("");
  const [invalidDayN, setInvalidDayN] = useState(false);
  const [minuteN, setMinuteN] = useState("");
  const [invalidMinuteN, setInvalidMinuteN] = useState(false);
  const [distanceN, setDistanceN] = useState("");
  const [invalidDistanceN, setInvalidDistanceN] = useState(false);

  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [firstStation, setFirstStation] = useState(false);
  const [description, setDescription] = useState("");
  const [invalidDescription, setInvalidDescription] = useState(false);

  const [showCancel, setShowCancel] = useState(false);

  const handleCloseAdd = () => {
    setAddNextStation("");
    setAddPreStation("");
    setStation("");
    setDay("");
    setDayN("");
    setHour("");
    setHourN("");
    setMinute("");
    setMinuteN("");
    setDistance("");
    setDistanceN("");
    setShowAdd(false);
    setIsFirst(false);
    setIsLast(false);
    setFirstStation(false);
  };
  const handleShowAdd = () => setShowAdd(true);

  let routeDetail = props.routeDetail;

  const handleCancel = () => {
    props.setShowEdit(false);
  };

  const handleCloseCancel = () => setShowCancel(false);

  useEffect(() => {
    setDescription(props.route.description);
  }, [props.route.description]);

  useEffect(() => {
    const fetchAllStation = async () => {
      let data = await getAllStation();
      if (data && data.EC === 0) {
        let removeArr = [];
        let cloneList = _.cloneDeep(data.DT);
        cloneList.forEach((station) => {
          routeDetail.forEach((item) => {
            if (station.station_id === item.station_id) {
              removeArr.push(station.station_id);
            }
          });
        });
        cloneList = cloneList.filter(
          (item) => !removeArr.includes(item.station_id)
        );
        setStationList(cloneList);
      }
    };
    fetchAllStation();
  }, [routeDetail]);

  useEffect(() => {
    let preOptionList = [
      {
        stationID: "none",
        index: 0,
        name: "None",
      },
    ];

    routeDetail.forEach((item) => {
      preOptionList.push({
        stationID: item.station_id,
        index: item.station_index,
        name: item.name,
      });
    });

    setPreOption(preOptionList);
  }, [routeDetail]);

  const handleChangeStation = (value) => {
    stationList.forEach((station) => {
      if (station.station_id === +value) {
        setStation(station);
      }
    });
    setInvalidStation(false);
  };

  const handleChangeAddPre = (value) => {
    setDistanceN("");
    setDayN("");
    setHourN("");
    setMinuteN("");
    setDistance("");
    setDay("");
    setHour("");
    setMinute("");
    if (value === "none") {
      setIsFirst(true);
      setIsLast(false);
      setDistance(0);
      setDay(0);
      setHour(0);
      setMinute(0);

      setAddPreStation(preOption[0]);
      if (preOption.length > 1) {
        setAddNextStation(preOption[1]);
      } else {
        setDayN(0);
        setHourN(0);
        setMinuteN(0);
        setDistanceN(0);
        setFirstStation(true);
        setAddNextStation("");
      }
      setInvalidAddPre(false);
      return;
    }

    preOption.forEach((station, sIndex) => {
      if (station.stationID === +value) {
        setAddPreStation(station);
        if (station.index === preOption.length - 1) {
          setIsLast(true);
          setIsFirst(false);
          setDistanceN(0);
          setDayN(0);
          setHourN(0);
          setMinuteN(0);
          setAddNextStation(preOption[0]);
        } else {
          setAddNextStation(preOption[sIndex + 1]);
          setIsLast(false);
          setIsFirst(false);
        }
      }
    });
    setInvalidAddPre(false);
  };

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

  const handleChangeDistance = (value) => {
    setDistance(+value);
    setInvalidDistance(false);
  };

  const handleChangeDayN = (value) => {
    setDayN(+value);
    setInvalidDayN(false);
  };

  const handleChangeHourN = (value) => {
    setHourN(+value);
    setInvalidHourN(false);
  };

  const handleChangeMinuteN = (value) => {
    setMinuteN(+value);
    setInvalidMinuteN(false);
  };

  const handleChangeDistanceN = (value) => {
    setDistanceN(+value);
    setInvalidDistanceN(false);
  };

  const handleAddStation = (e) => {
    e.preventDefault();

    if (!station) {
      setInvalidStation(true);
      toast.error("Must select a station.");
      return;
    }

    if (!addPreStation) {
      setInvalidAddPre(true);
      toast.error("Please specify the previous station.");
      return;
    }

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

    if (dayN !== 0) {
      if (!dayN) {
        toast.error("Please specify a valid number.");
        setInvalidDayN(true);
        return;
      }
    }

    if (hourN !== 0) {
      if (!hourN) {
        toast.error("Please specify a valid number.");
        setInvalidHourN(true);
        return;
      }
    }

    if (minuteN !== 0) {
      if (!minuteN) {
        toast.error("Please specify a valid number.");
        setInvalidMinuteN(true);
        return;
      }
    }

    if (distanceN !== 0) {
      if (!distanceN) {
        toast.error("Please specify a valid number.");
        setInvalidDistanceN(true);
        return;
      }
    }

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

    let cloneList = _.cloneDeep(routeDetail);
    let newRouteDetail = [];
    if (addPreStation.stationID === "none") {
      newRouteDetail.push({
        station_id: station.station_id,
        name: station.name,
        station_index: 1,
        driving_time: preMinutes,
        preDrivingTime: preMinutes,
        distance: distance,
        preDistance: distance,
      });

      if (addNextStation) {
        for (let i = 0; i < cloneList.length; i++) {
          if (cloneList[i].station_id === addNextStation.stationID) {
            newRouteDetail.push({
              station_id: cloneList[i].station_id,
              name: cloneList[i].name,
              station_index: cloneList[i].station_index + 1,
              driving_time: nextMinutes + preMinutes,
              preDrivingTime: nextMinutes,
              distance: distance + distanceN,
              preDistance: distanceN,
            });
          } else
            newRouteDetail.push({
              station_id: cloneList[i].station_id,
              name: cloneList[i].name,
              station_index: cloneList[i].station_index + 1,
              driving_time:
                newRouteDetail[i].driving_time + cloneList[i].preDrivingTime,
              preDrivingTime: cloneList[i].preDrivingTime,
              distance: newRouteDetail[i].distance + cloneList[i].preDistance,
              preDistance: cloneList[i].preDistance,
            });
        }
      }
    }

    if (addNextStation.stationID === "none") {
      newRouteDetail = [...cloneList];
      newRouteDetail.push({
        station_id: station.station_id,
        name: station.name,
        station_index:
          newRouteDetail[newRouteDetail.length - 1].station_index + 1,
        driving_time:
          newRouteDetail[newRouteDetail.length - 1].driving_time + preMinutes,
        preDrivingTime: preMinutes,
        distance: newRouteDetail[newRouteDetail.length - 1].distance + distance,
        preDistance: distance,
      });
    }

    if (
      addPreStation.stationID !== "none" &&
      addNextStation.stationID !== "none"
    ) {
      let preIndex = cloneList.findIndex(
        (item) => item.station_id === addPreStation.stationID
      );
      newRouteDetail = [...cloneList];
      newRouteDetail.splice(preIndex + 1, 0, {
        station_id: station.station_id,
        name: station.name,
        station_index: newRouteDetail[preIndex].station_index + 1,
        driving_time: newRouteDetail[preIndex].driving_time + preMinutes,
        preDrivingTime: preMinutes,
        distance: newRouteDetail[preIndex].distance + distance,
        preDistance: distance,
      });

      for (let i = preIndex + 2; i < newRouteDetail.length; i++) {
        if (i === preIndex + 2) {
          newRouteDetail[i].preDrivingTime = nextMinutes;
          newRouteDetail[i].preDistance = distanceN;
        }
        newRouteDetail[i].station_index =
          newRouteDetail[i - 1].station_index + 1;
        newRouteDetail[i].driving_time =
          newRouteDetail[i].preDrivingTime + newRouteDetail[i - 1].driving_time;
        newRouteDetail[i].distance =
          newRouteDetail[i].preDistance + newRouteDetail[i - 1].distance;
      }
    }

    newRouteDetail.forEach((item) => {
      let timeObj = toTime(item.driving_time);
      item.driving_time_text = `${timeObj.day} Days ${timeObj.hour} Hours ${timeObj.minute} Minutes`;
    });

    props.setRouteDetail(newRouteDetail);
    toast.success("Changes have been saved.");
    handleCloseAdd();
  };

  const handleChangeDes = (value) => {
    setDescription(value);
    setInvalidDescription(false);
  };

  const handleSaveChange = async () => {
    if (!description) {
      toast.error("Description must not be empty.");
      setInvalidDescription(true);
      return;
    }

    let data = await putUpdateRoute(
      routeDetail,
      description,
      props.route.route_id
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.setShowEdit(false);
      props.fetchAllRoute();
    } else toast.error(data.EM);
  };

  return (
    <div className="edit-route">
      <div className="edit-route-title">Edit Route Info</div>
      <div className="edit-body">
        <Button
          variant="primary"
          className="add-station-btn"
          onClick={handleShowAdd}
        >
          Add Station
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>Station</th>
              <th>Driving Time From First Station</th>
              <th>Distance From First Station</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routeDetail &&
              routeDetail.length > 0 &&
              routeDetail.map((station) => {
                return (
                  <tr key={station.station_id}>
                    <td>{station.station_index}</td>
                    <td>{station.name}</td>
                    <td>{station.driving_time_text}</td>
                    <td>{station.distance} Km</td>
                    <td>
                      <EditPoint
                        routeDetail={routeDetail}
                        station={station}
                        stationList={stationList}
                        setRouteDetail={props.setRouteDetail}
                      />
                      <DeletePoint
                        routeDetail={routeDetail}
                        station={station}
                        setRouteDetail={props.setRouteDetail}
                      />
                    </td>
                  </tr>
                );
              })}
            {routeDetail && routeDetail.length === 0 && (
              <tr>
                <td colSpan={5}>Not Found...</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Row className="mb-3" style={{ marginTop: "4%" }}>
          <Col>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              isInvalid={invalidDescription}
              value={description}
              onChange={(e) => handleChangeDes(e.target.value)}
            />
          </Col>

          <Col></Col>
        </Row>

        <Modal
          show={showAdd}
          onHide={handleCloseAdd}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Station</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddStation}>
            <Modal.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Select New Station</Form.Label>
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

              <Row className="mb-5">
                <Col>
                  <Form.Label>Previous Station</Form.Label>
                  <Form.Select
                    aria-label="select station"
                    defaultValue=""
                    isInvalid={invalidAddPre}
                    onChange={(e) => handleChangeAddPre(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select station
                    </option>
                    {preOption &&
                      preOption.length > 0 &&
                      preOption.map((station) => {
                        return (
                          <option
                            value={station.stationID}
                            key={station.stationID}
                          >
                            {station.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Label>Next Station</Form.Label>
                  <Form.Control
                    type="text"
                    aria-label="next station"
                    placeholder="Next station"
                    disabled
                    value={addNextStation.name ? addNextStation.name : ""}
                  />
                </Col>
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
                        disabled={isFirst}
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
                        disabled={isFirst}
                        isInvalid={invalidMinute}
                        value={minute}
                        onChange={(e) => handleChangeMinute(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>

                <Form.Group
                  className="mb-3"
                  controlId="formPreDistanceAdd"
                  as={Col}
                >
                  <Form.Label>Distance From Previous Station</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Distance from previous station in Km"
                    min="0"
                    step="0.1"
                    disabled={isFirst}
                    value={distance}
                    isInvalid={invalidDistance}
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
                        isInvalid={invalidDayN}
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
                        isInvalid={invalidHourN}
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
                        isInvalid={invalidMinuteN}
                        value={minuteN}
                        onChange={(e) => handleChangeMinuteN(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>

                <Form.Group
                  className="mb-3"
                  controlId="formNextDistanceAdd"
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
                    isInvalid={invalidDistanceN}
                    onChange={(e) => handleChangeDistanceN(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add Station
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Button variant="primary" className="mt-3" onClick={handleSaveChange}>
          Confirm
        </Button>
        <Button
          variant="secondary"
          className="mx-2 mt-3"
          onClick={() => setShowCancel(true)}
        >
          Cancel
        </Button>

        <Modal
          show={showCancel}
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Cancel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to cancel the current operation? <br />
            All the changes you made will be lost and can't be recovered.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCancel}>
              No, Go back
            </Button>
            <Button variant="primary" onClick={handleCancel}>
              Yes, Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default EditRoute;
