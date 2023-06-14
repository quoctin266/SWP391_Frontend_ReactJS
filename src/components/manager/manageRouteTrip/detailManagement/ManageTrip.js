import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import {
  getAllRoute,
  getRouteDetail,
  getTripList,
  getDriverList,
  getVehicle,
  getAllVehicle,
  getAllDriver,
  postCreateTrip,
} from "../../../../service/APIservice";
import { toast } from "react-toastify";
import { toTime } from "../../../../utils/reuseFunction";
import { FcCheckmark } from "react-icons/fc";
import moment from "moment";

const ManageTrip = () => {
  const [show, setShow] = useState(false);
  const [routeList, setRouteList] = useState([]);
  const [routeDetail, setRouteDetail] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState({
    value: 0,
    label: "Select...",
  });
  const [tripList, setTripList] = useState([]);

  const [showDrivers, setShowDrivers] = useState(false);
  const [driverList, setDriverList] = useState([]);

  const [showVehicle, setShowVehicle] = useState(false);
  const [vehicle, setVehicle] = useState("");

  const [vehicleList, setVehicleList] = useState([]);
  const [assignVehicle, setAssignVehicle] = useState("");
  const [invalidVehicle, setInvalidVehicle] = useState(false);
  const [allDriver, setAllDriver] = useState([]);
  const [mainDriver, setMainDriver] = useState("");
  const [spDriver, setSpDriver] = useState("");
  const [invalidDriver, setInvalidDriver] = useState(false);
  const [invalidSpDriver, setInvalidSpDriver] = useState(false);
  const [spDriverList, setSpDriverList] = useState([]);
  const [selectedMainDriver, setSelectedMainDriver] = useState(false);
  const [depart, setDepart] = useState("");
  const [invalidDepart, setInvalidDepart] = useState(false);

  const [currentTime, setCurrentTime] = useState("");

  const handleClose = () => {
    setSelectedMainDriver(false);
    setInvalidSpDriver(false);
    setInvalidDriver(false);
    setInvalidVehicle(false);
    setAssignVehicle("");
    setShow(false);
    setMainDriver("");
    setSpDriver("");
    setDepart("");
    setInvalidDepart(false);
  };
  const handleShow = () => setShow(true);

  const handleCloseDrivers = () => setShowDrivers(false);
  const handleShowDrivers = async (tripID) => {
    let data = await getDriverList(tripID);
    if (data && data.EC === 0) {
      setDriverList(data.DT);
      setShowDrivers(true);
    } else toast.error(data.EM);
  };

  const handleCloseVehicle = () => setShowVehicle(false);
  const handleViewVehicle = async (vehicle_id) => {
    let data = await getVehicle(vehicle_id);
    if (data && data.EC === 0) {
      setVehicle(data.DT);
      setShowVehicle(true);
    } else toast.error(data.EM);
  };

  const fetchAllRoute = async () => {
    let data = await getAllRoute();
    let routeOption = [];
    if (data && data.EC === 0) {
      data.DT.forEach((route) => {
        routeOption.push({ value: route.route_id, label: route.description });
      });
      setRouteList(routeOption);
    }
  };

  const fetchAllVehicle = async () => {
    let data = await getAllVehicle();
    if (data && data.EC === 0) {
      setVehicleList(data.DT);
    }
  };

  const fetchAllDriver = async () => {
    let data = await getAllDriver();
    if (data && data.EC === 0) {
      setAllDriver(data.DT);
    }
  };

  useEffect(() => {
    let currentTime = moment().format("YYYY-MM-DD[T]HH:mm").toString();
    setCurrentTime(currentTime);

    fetchAllRoute();
    fetchAllVehicle();
    fetchAllDriver();
  }, []);

  useEffect(() => {
    const fetchRouteDetail = async () => {
      let data = await getRouteDetail(selectedRoute.value);
      if (data && data.EC === 0) {
        let sortedArr = data.DT.toSorted(
          (a, b) => a.station_index - b.station_index
        );
        sortedArr.forEach((item) => {
          let timeobj = toTime(item.driving_time);
          item.driving_time_text = `${timeobj.day} Days ${timeobj.hour} Hours ${timeobj.minute} Minutes`;
          item.distance = +item.distance.toFixed(1);
        });
        setRouteDetail(sortedArr);
      }
    };

    const fetchTripsList = async () => {
      let data = await getTripList(selectedRoute.value);
      if (data && data.EC === 0) {
        let tripOption = data.DT.filter((trip) => trip.status === "Standby");

        setTripList(tripOption);
      } else if (data && data.EC === 107) {
        setTripList([]);
      }
    };
    fetchRouteDetail();
    fetchTripsList();
  }, [selectedRoute]);

  const handleChangeVehicle = (value) => {
    setInvalidVehicle(false);
    if (vehicleList?.length > 0) {
      vehicleList.forEach((item) => {
        if (item.vehicle_id === +value) {
          setAssignVehicle(item);
        }
      });
    }
  };

  const handleChangeDriver = (value) => {
    setInvalidDriver(false);
    if (allDriver?.length > 0) {
      allDriver.forEach((item) => {
        if (item.driver_id === +value) {
          setMainDriver(item);
        }
      });
      let cloneList = allDriver.filter((driver) => driver.driver_id !== +value);
      setSpDriverList(cloneList);
      setSelectedMainDriver(true);
    }
  };

  const handleChangeSpDriver = (value) => {
    setInvalidSpDriver(false);
    if (spDriverList?.length > 0) {
      spDriverList.forEach((item) => {
        if (item.driver_id === +value) {
          setSpDriver(item);
        }
      });
    }
  };

  const handleChangeDepart = (value) => {
    setInvalidDepart(false);
    let depart = moment(value).format("YYYY-MM-DD HH:mm:ss").toString();
    setDepart(depart);
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();

    if (!depart) {
      setInvalidDepart(true);
      toast.error("Must choose depart date.");
      return;
    }

    if (!assignVehicle) {
      setInvalidVehicle(true);
      toast.error("Must choose vehicle.");
      return;
    }

    if (!mainDriver) {
      setInvalidDriver(true);
      toast.error("Must choose main driver.");
      return;
    }

    if (!spDriver) {
      setInvalidSpDriver(true);
      toast.error("Must choose support driver.");
      return;
    }

    let driverInfo = [
      {
        driver_id: mainDriver.driver_id,
        main_driver: true,
      },
      {
        driver_id: spDriver.driver_id,
        main_driver: false,
      },
    ];

    let data = await postCreateTrip(
      selectedRoute.value,
      driverInfo,
      depart,
      assignVehicle.vehicle_id
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      let dataNew = await getTripList(selectedRoute.value);
      if (dataNew && dataNew.EC === 0) {
        let tripOption = dataNew.DT.filter((trip) => trip.status === "Standby");

        setTripList(tripOption);
      } else if (dataNew && dataNew.EC === 107) {
        setTripList([]);
      }
    } else toast.error(data.EM);
  };

  return (
    <>
      <div className="route-title">Select Route</div>
      <div className="route-list">
        <Select
          defaultValue={selectedRoute}
          onChange={setSelectedRoute}
          options={routeList}
        />
        <div className="detail-title">Route detail</div>
        <div className="route-detail">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Index</th>
                <th>Station</th>
                <th>Driving time from departure</th>
                <th>Distance from departure</th>
              </tr>
            </thead>
            <tbody>
              {routeDetail &&
                routeDetail.length > 0 &&
                routeDetail.map((item) => {
                  return (
                    <tr key={item.station_id}>
                      <td>{item.station_index}</td>
                      <td>{item.name}</td>
                      <td>{item.driving_time_text}</td>
                      <td>{item.distance} Km</td>
                    </tr>
                  );
                })}
              {routeDetail && routeDetail.length === 0 && (
                <tr>
                  <td colSpan={4}>Select a route...</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="trip-title">Current Trips</div>
      <Button variant="primary" onClick={handleShow} className="add-btn">
        Add new
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Trip</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateTrip}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDate">
                <Form.Label>Departure date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="Enter departure date"
                  min={currentTime}
                  isInvalid={invalidDepart}
                  onChange={(e) => handleChangeDepart(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDriver">
                <Form.Label> Select Main Driver</Form.Label>
                <Form.Select
                  aria-label="driver select"
                  defaultValue=""
                  onChange={(e) => handleChangeDriver(e.target.value)}
                  isInvalid={invalidDriver}
                >
                  <option value="" disabled hidden>
                    Select driver...
                  </option>
                  {allDriver &&
                    allDriver.length > 0 &&
                    allDriver.map((driver) => {
                      return (
                        <option value={driver.driver_id} key={driver.driver_id}>
                          {driver.driver_name} - {driver.phone_number}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formGridVehicle" as={Col}>
                <Form.Label>Select vehicle</Form.Label>
                <Form.Select
                  aria-label="vehicle select"
                  defaultValue=""
                  onChange={(e) => handleChangeVehicle(e.target.value)}
                  isInvalid={invalidVehicle}
                >
                  <option value="" disabled hidden>
                    Select vehicle...
                  </option>
                  {vehicleList &&
                    vehicleList.length > 0 &&
                    vehicleList.map((vehicle) => {
                      return (
                        <option
                          value={vehicle.vehicle_id}
                          key={vehicle.vehicle_id}
                        >
                          {vehicle.vehicle_name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>

              <Col>
                <Form.Label> Select Support Driver</Form.Label>
                <Form.Select
                  aria-label="sp driver select"
                  defaultValue=""
                  isInvalid={invalidSpDriver}
                  disabled={!selectedMainDriver}
                  onChange={(e) => handleChangeSpDriver(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select driver...
                  </option>
                  {spDriverList &&
                    spDriverList.length > 0 &&
                    spDriverList.map((driver) => {
                      return (
                        <option value={driver.driver_id} key={driver.driver_id}>
                          {driver.driver_name} - {driver.phone_number}
                        </option>
                      );
                    })}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formGridCarryLimit" as={Col}>
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Capacity"
                  value={assignVehicle.capacity ? assignVehicle.capacity : ""}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col}></Form.Group>
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
      <div className="trip-list">
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>ID</th>
              <th>Departure date</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tripList &&
              tripList.length > 0 &&
              tripList.map((trip) => {
                return (
                  <tr key={trip.trip_id}>
                    <td>{trip.trip_id}</td>
                    <td>{trip.departure_date}</td>
                    <td>
                      <Button
                        variant="secondary"
                        onClick={() => handleShowDrivers(trip.trip_id)}
                      >
                        View
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        onClick={() => handleViewVehicle(trip.vehicle_id)}
                      >
                        View
                      </Button>
                    </td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            {tripList && tripList.length === 0 && (
              <tr>
                <td colSpan={7}>List is empty...</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Modal
          show={showDrivers}
          onHide={handleCloseDrivers}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Drivers Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Main Driver</th>
                </tr>
              </thead>
              <tbody>
                {driverList &&
                  driverList.length > 0 &&
                  driverList.map((driver, index) => {
                    return (
                      <tr key={driver.driver_id}>
                        <td>{index + 1}</td>
                        <td>{driver.driver_name}</td>
                        <td>{driver.age}</td>
                        <td>{driver.phone_number}</td>
                        <td>
                          {" "}
                          &nbsp; &nbsp;{" "}
                          {driver.main_driver ? <FcCheckmark /> : ""}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDrivers}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showVehicle}
          onHide={handleCloseVehicle}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Vehicle Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-5">
                <Form.Group as={Col} controlId="vehicleName">
                  <Form.Label>Vehicle Name</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={vehicle.vehicle_name}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="vehicleCapacity">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control type="text" disabled value={vehicle.capacity} />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseVehicle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ManageTrip;
