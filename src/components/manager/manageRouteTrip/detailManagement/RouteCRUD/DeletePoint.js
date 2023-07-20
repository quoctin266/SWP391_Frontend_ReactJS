import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toMinutes, toTime } from "../../../../../utils/reuseFunction";
import _ from "lodash";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const DeletePoint = (props) => {
  const { t } = useTranslation();
  let { routeDetail, station } = props;
  const [show, setShow] = useState(false);
  const [removeStation, setRemoveStation] = useState("");
  const [prePoint, setPrePoint] = useState("");
  const [nextPoint, setNextPoint] = useState("");
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const [hour, setHour] = useState("");
  const [invalidHour, setInvalidHour] = useState(false);
  const [day, setDay] = useState("");
  const [invalidDay, setInvalidDay] = useState(false);
  const [minute, setMinute] = useState("");
  const [invalidMinute, setInvalidMinute] = useState(false);
  const [distance, setDistance] = useState("");
  const [invalidDistance, setInvalidDistance] = useState(false);

  const handleClose = () => {
    setDay("");
    setHour("");
    setMinute("");
    setDistance("");
    setShow(false);
    setPrePoint("");
    setNextPoint("");
  };

  const handleShow = () => {
    routeDetail.forEach((item, index) => {
      if (item.station_id === station.station_id) {
        if (item.station_index === 1) {
          setIsFirst(true);
        } else if (item.station_index === routeDetail.length) {
          setIsLast(true);
        } else {
          setPrePoint(routeDetail[index - 1]);
          setNextPoint(routeDetail[index + 1]);
        }
      }
    });
    setRemoveStation(station);
    setShow(true);
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

  const handleRemove = (e) => {
    e.preventDefault();

    if (!isFirst && !isLast) {
      if (day !== 0) {
        if (!day) {
          toast.error(`${t("editRoute.toast3")}`);
          setInvalidDay(true);
          return;
        }
      }

      if (hour !== 0) {
        if (!hour) {
          toast.error(`${t("editRoute.toast3")}`);
          setInvalidHour(true);
          return;
        }
      }

      if (minute !== 0) {
        if (!minute) {
          toast.error(`${t("editRoute.toast3")}`);
          setInvalidMinute(true);
          return;
        }
      }

      if (distance !== 0) {
        if (!distance) {
          toast.error(`${t("editRoute.toast3")}`);
          setInvalidDistance(true);
          return;
        }
      }
    }

    let cloneRoute = _.cloneDeep(routeDetail);
    if (isFirst) {
      cloneRoute.forEach((item, index) => {
        item.station_index = item.station_index - 1;
        if (index === 1) {
          item.driving_time = 0;
          item.preDrivingTime = 0;
          item.preDistance = 0;
          item.distance = 0;
        } else if (index > 1) {
          item.driving_time =
            item.preDrivingTime + cloneRoute[index - 1].driving_time;
          item.distance = item.preDistance + cloneRoute[index - 1].distance;
        }
      });
      cloneRoute.shift();
    }

    if (isLast) {
      cloneRoute.pop();
    }

    if (!isFirst && !isLast) {
      let timeMinutes = toMinutes({
        day: day,
        hour: hour,
        minute: minute,
      });

      cloneRoute.forEach((item, index) => {
        if (item.station_id === removeStation.station_id) {
          cloneRoute[index + 1].preDistance = distance;
          cloneRoute[index + 1].preDrivingTime = timeMinutes;
          cloneRoute[index + 1].distance =
            distance + cloneRoute[index - 1].distance;
          cloneRoute[index + 1].driving_time =
            timeMinutes + cloneRoute[index - 1].driving_time;
          cloneRoute[index + 1].station_index =
            cloneRoute[index + 1].station_index - 1;

          for (let i = index + 2; i < cloneRoute.length; i++) {
            cloneRoute[i].driving_time =
              cloneRoute[i].preDrivingTime + cloneRoute[i - 1].driving_time;
            cloneRoute[i].distance =
              cloneRoute[i].preDistance + cloneRoute[i - 1].distance;
            cloneRoute[i].station_index = cloneRoute[i].station_index - 1;
          }
          cloneRoute.splice(index, 1);
        }
      });
    }

    cloneRoute.forEach((item) => {
      let timeObj = toTime(item.driving_time);
      item.driving_time_text = `${timeObj.day} Days ${timeObj.hour} Hours ${timeObj.minute} Minutes`;
    });

    console.log(cloneRoute);
    props.setRouteDetail(cloneRoute);
    toast.success(`${t("editRoute.toast4")}`);
    handleClose();
  };

  return (
    <>
      <Button variant="danger" className="mx-2" onClick={handleShow}>
        {t("editRoute.removeBtn")}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("editRoute.title3")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRemove}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>{t("editRoute.label8")}</Form.Label>
                <Form.Control
                  type="text"
                  aria-label="remove example"
                  disabled
                  value={removeStation.name ? removeStation.name : ""}
                />
              </Col>

              <Col></Col>
            </Row>
            {!isFirst && !isLast && (
              <>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>{t("editRoute.label10")}</Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="pre example"
                      disabled
                      value={prePoint.name ? prePoint.name : ""}
                    />
                  </Col>

                  <Col>
                    <Form.Label>{t("editRoute.label11")}</Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="next example"
                      disabled
                      value={nextPoint.name ? nextPoint.name : ""}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>{t("editRoute.label12")}</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder={t("editRoute.note3")}
                          min="0"
                          value={day}
                          isInvalid={invalidDay}
                          onChange={(e) => handleChangeDay(e.target.value)}
                        />
                      </Col>

                      <Col>
                        <Form.Control
                          type="number"
                          placeholder={t("editRoute.note4")}
                          min="0"
                          max="24"
                          value={hour}
                          isInvalid={invalidHour}
                          onChange={(e) => handleChangeHour(e.target.value)}
                        />
                      </Col>

                      <Col>
                        <Form.Control
                          type="number"
                          placeholder={t("editRoute.note5")}
                          min="0"
                          max="60"
                          value={minute}
                          isInvalid={invalidMinute}
                          onChange={(e) => handleChangeMinute(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Form.Group
                    className="mb-3"
                    controlId="formPreDistance"
                    as={Col}
                  >
                    <Form.Label>{t("editRoute.label13")}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t("editRoute.note9")}
                      min="0"
                      step="0.1"
                      value={distance}
                      isInvalid={invalidDistance}
                      onChange={(e) => handleChangeDistance(e.target.value)}
                    />
                  </Form.Group>
                </Row>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("editRoute.closeBtn")}
            </Button>
            <Button variant="primary" type="submit">
              {t("editRoute.confirmBtn")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DeletePoint;
