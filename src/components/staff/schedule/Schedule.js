import "./Schedule.scss";
import Select from "react-select";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  getAllRoute,
  getRouteDetail,
  getTripList,
  getVehicle,
  getDriverList,
  getProgressList,
  postCreateProgress,
  deleteProgressInfo,
  putUpdateProgress,
  getOrderCapacity,
  putUpdateTripStatus,
  putRemoveOrder,
  getPendingOrder,
  putAssignOrder,
} from "../../../service/APIservice";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FcCheckmark } from "react-icons/fc";
import moment from "moment";
import _ from "lodash";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Scrollbars } from "react-custom-scrollbars-2";
import { toTime } from "../../../utils/reuseFunction";

const Schedule = () => {
  const [routeList, setRouteList] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState({
    value: 0,
    label: "Select...",
  });
  const [routeDetail, setRouteDetail] = useState([]);

  const [selectedTrip, setSelectedTrip] = useState("");
  const [tripList, setTripList] = useState([]);
  const [showVehicle, setShowVehicle] = useState(false);
  const [vehicle, setVehicle] = useState("");

  const [showDrivers, setShowDrivers] = useState(false);
  const [driverList, setDriverList] = useState([]);

  const [trip, setTrip] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progressList, setProgressList] = useState([]);

  const [newProgressDes, setNewProgressDes] = useState("");
  const [invalidNewProgressDes, setInvalidNewProgressDes] = useState(false);
  const [newProgressDate, setNewProgressDate] = useState("");
  const [InvalidNewProgressDate, setInvalidNewProgressDate] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState("");

  const [editProgressDes, setEditProgressDes] = useState("");
  const [invalidEditProgressDes, setInvalidEditProgressDes] = useState(false);
  const [editProgressDate, setEditProgressDate] = useState("");
  const [InvalidEditProgressDate, setInvalidEditProgressDate] = useState(false);
  const [progressID, setProgressID] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const [showTripDetail, setShowTripDetail] = useState(false);
  const [sumFreeup, setSumFreeup] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [listOrder, setListOrder] = useState([]);
  const [showRemove, setShowRemove] = useState(false);
  const [removeOrder, setRemoveOrder] = useState("");

  const [tripOption, setTripOption] = useState([]);
  const [pendingOrderList, setPendingOrderList] = useState([]);
  const [orderOption, setOrderOption] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [detailSelectedOrder, setDetailSelectedOrder] = useState("");

  const handleCloseVehicle = () => setShowVehicle(false);
  const handleViewVehicle = async (vehicle_id) => {
    let data = await getVehicle(vehicle_id);
    if (data && data.EC === 0) {
      setVehicle(data.DT);
      setShowVehicle(true);
    } else toast.error(data.EM);
  };

  const handleCloseDrivers = () => setShowDrivers(false);
  const handleShowDrivers = async (tripID) => {
    let data = await getDriverList(tripID);
    if (data && data.EC === 0) {
      setDriverList(data.DT);
      setShowDrivers(true);
    } else toast.error(data.EM);
  };

  const handleCloseProgress = () => {
    setShowProgress(false);
    setShowEdit(false);
    setShowDelete(false);
    setInvalidEditProgressDate(false);
    setInvalidEditProgressDes(false);
    setInvalidNewProgressDate(false);
    setInvalidNewProgressDes(false);
  };
  const handleViewProgress = async (trip) => {
    let data = await getProgressList(trip.trip_id);
    if (data && data.EC === 0) {
      setProgressList(data.DT);
    } else toast.warning(data.EM);

    let cloneTrip = _.cloneDeep(trip);
    cloneTrip.departure_date = moment(
      cloneTrip.departure_date,
      "DD-MM-YYYY HH:mm:ss"
    )
      .format("YYYY-MM-DD[T]HH:mm")
      .toString();

    setShowProgress(true);
    setTrip(cloneTrip);
  };

  const handleChangeNewProgressDate = (e) => {
    setNewProgressDate(e.target.value);
    setInvalidNewProgressDate(false);
  };

  const handleChangeNewDescription = (e) => {
    setNewProgressDes(e.target.value);
    setInvalidNewProgressDes(false);
  };

  const fetchProgressList = async () => {
    let data = await getProgressList(trip.trip_id);
    if (data && data.EC === 0) {
      setProgressList(data.DT);
    } else toast.error(data.EM);
  };

  const handleCreateNewProgress = async (e) => {
    e.preventDefault();
    if (!newProgressDate) {
      setInvalidNewProgressDate(true);
      toast.error("Must choose a date.");
      return;
    }

    if (!newProgressDes) {
      setInvalidNewProgressDes(true);
      toast.error("Please fill in description.");
      return;
    }

    let dateFormat = moment(newProgressDate)
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();
    let data = await postCreateProgress(
      trip.trip_id,
      newProgressDes,
      dateFormat
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchProgressList();
      setNewProgressDes("");
      setNewProgressDate("");
    } else toast.error(data.EM);
  };

  const handleClickDelete = (item) => {
    setDeleteProgress(item);
    setShowDelete(true);
    handleCloseEdit();
  };

  const handleDeleteProgress = async () => {
    let data = await deleteProgressInfo(deleteProgress.progress_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchProgressList();
      setShowDelete(false);
    } else toast.error(data.EM);
  };

  const handleClickEdit = (item) => {
    let dateFormat = moment(item.date, "DD-MM-YYYY HH:mm:ss")
      .format("YYYY-MM-DD[T]HH:mm")
      .toString();
    setEditProgressDate(dateFormat);
    setEditProgressDes(item.description);
    setProgressID(item.progress_id);
    setShowEdit(true);
    setShowDelete(false);
  };
  const handleCloseEdit = () => {
    setInvalidEditProgressDes(false);
    setInvalidEditProgressDate(false);
    setShowEdit(false);
  };

  const handleChangeEditProgressDes = (e) => {
    setEditProgressDes(e.target.value);
    setInvalidEditProgressDes(false);
  };

  const handleChangeEditProgressDate = (e) => {
    setEditProgressDate(e.target.value);
    setInvalidEditProgressDate(false);
  };

  const handleEditProgress = async (e) => {
    e.preventDefault();

    if (!editProgressDes) {
      setInvalidEditProgressDes(true);
      toast.error("Description must not be empty.");
      return;
    }

    if (!editProgressDate) {
      setInvalidEditProgressDate(true);
      toast.error("Must choose a date.");
      return;
    }

    let dateFormat = moment(editProgressDate)
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();

    let data = await putUpdateProgress(progressID, editProgressDes, dateFormat);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchProgressList();
    } else toast.error(data.EM);
  };

  const handleCloseDetailTrip = () => {
    setShowRemove(false);
    setShowTripDetail(false);
  };
  const handleShowDetailTrip = async (trip) => {
    let cloneRoute = _.cloneDeep(routeDetail);
    let sumDropOff = 0;
    let sumCapacity = 0;

    let data = await getOrderCapacity(trip.trip_id);
    if (data && data.EC === 0) {
      let cloneList = _.cloneDeep(data.DT);
      cloneRoute.forEach((station, index) => {
        station.dropOff = 0;
        if (index !== 0 && index !== cloneRoute.length - 1) {
          cloneList.forEach((order) => {
            if (order.arrival_location === station.name) {
              station.dropOff += +order.total_capacity;
            }
          });
        }
        sumDropOff += station.dropOff;
      });

      data.DT.forEach((item) => {
        sumCapacity += +item.total_capacity;
      });
      setListOrder(data.DT);
    } else {
      cloneRoute.forEach((station, index) => {
        station.dropOff = 0;
        sumDropOff += station.dropOff;
      });
      setListOrder([]);
    }
    setTrip(trip);
    setStatusUpdate(trip.status);
    setSumFreeup(sumDropOff);
    setTotalCapacity(sumCapacity);
    setRouteDetail(cloneRoute);
    setShowTripDetail(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();

    let data = await putUpdateTripStatus(trip.trip_id, statusUpdate);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      let dataNew = await getTripList(selectedRoute.value);
      if (dataNew && dataNew.EC === 0) {
        let tripOption = [];

        dataNew.DT.forEach((trip) => {
          if (trip.status === "Standby")
            tripOption.push({
              value: trip.trip_id,
              label: `Trip ID: ${trip.trip_id} >>> Depart on: ${trip.departure_date}`,
            });
        });
        setTripOption(tripOption);
        setTripList(dataNew.DT);
      } else if (dataNew && dataNew.EC === 107) {
        setTripList([]);
        setTripOption([]);
      }
    } else toast.error(data.EM);
  };

  const handleClickRemove = (item) => {
    setRemoveOrder(item);
    setShowRemove(true);
  };

  const handleRemoveOrder = async () => {
    let data = await putRemoveOrder(removeOrder.order_id);
    if (data && data.EC === 0) {
      handleShowDetailTrip(trip);
      fetchPendingOrder();
      toast.success(data.EM);
      setShowRemove(false);
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
    } else toast.error(data.EM);
  };

  useEffect(() => {
    fetchAllRoute();
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
        let tripOption = [];

        data.DT.forEach((trip) => {
          if (trip.status === "Standby")
            tripOption.push({
              value: trip.trip_id,
              label: `Trip ID: ${trip.trip_id} >>> Depart on: ${trip.departure_date}`,
            });
        });
        setTripOption(tripOption);
        setTripList(data.DT);
      } else if (data && data.EC === 107) {
        setTripList([]);
        setTripOption([]);
      }
    };
    fetchRouteDetail();
    fetchTripsList();
  }, [selectedRoute]);

  const fetchPendingOrder = async () => {
    let data = await getPendingOrder();
    if (data && data.EC === 0) {
      let orderOption = [];

      data.DT.forEach((order) => {
        orderOption.push({
          value: order.order_id,
          label: `Order ID: ${order.order_id} >>> ${order.departure_location} - ${order.arrival_location} - Anticipate: ${order.anticipate_date}`,
        });
      });
      setOrderOption(orderOption);
      setPendingOrderList(data.DT);
    } else {
      setPendingOrderList([]);
      setOrderOption([]);
    }
  };

  useEffect(() => {
    fetchPendingOrder();
  }, []);

  const handleChangeOrder = (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    pendingOrderList.forEach((order) => {
      if (order.order_id === selectedOrder?.value) {
        setDetailSelectedOrder(order);
      }
    });
  };

  const handleAssign = async (e) => {
    if (!selectedTrip) {
      toast.error("Must select a trip.");
      return;
    }

    if (!selectedOrder) {
      toast.error("Must select an order.");
      return;
    }

    let data = await putAssignOrder(selectedOrder.value, selectedTrip.value);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchPendingOrder();
      setSelectedOrder(null);
      setSelectedTrip(null);
      setDetailSelectedOrder("");
    } else toast.error(data.EM);
  };

  return (
    <div className="schedule-container">
      <div className="title">Schedule Transportation</div>
      <div className="schedule-body">
        <div className="route-and-trip">
          <div className="route-title">Available Routes</div>
          <div className="route-list">
            <Select
              defaultValue={selectedRoute}
              onChange={setSelectedRoute}
              options={routeList}
            />
            <div className="detail-title">Route detail</div>
            <div className="route-detail">
              <Table striped hover>
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
          <div className="trip-list">
            <Table striped hover responsive="sm">
              <thead>
                <tr>
                  <th>Trip ID</th>
                  <th>Departure Date</th>
                  <th>Status</th>
                  <th>Progress</th>
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
                        <td>{trip.status}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleViewProgress(trip)}
                          >
                            Track
                          </Button>
                        </td>
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
                          <Button
                            variant="warning"
                            onClick={() => handleShowDetailTrip(trip)}
                          >
                            Manage
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                {tripList && tripList.length === 0 && (
                  <tr>
                    <td colSpan={7}>Select a route...</td>
                  </tr>
                )}
              </tbody>
            </Table>

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
                      <Form.Control
                        type="text"
                        disabled
                        value={vehicle.capacity}
                      />
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
              show={showProgress}
              onHide={handleCloseProgress}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Progress Tracking</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Scrollbars
                  style={{ height: "75vh" }}
                  autoHide
                  // Hide delay in ms
                  autoHideTimeout={1000}
                  // Duration for hide animation in ms.
                  autoHideDuration={200}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {progressList &&
                        progressList.length > 0 &&
                        progressList.map((item) => {
                          return (
                            <tr key={item.progress_id}>
                              <td>{item.date}</td>
                              <td>{item.description}</td>
                              <td>
                                <Button
                                  variant="warning"
                                  onClick={() => handleClickEdit(item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  className="mx-2"
                                  onClick={() => handleClickDelete(item)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>

                  <div className="add-new-progress">
                    <div className="add-progress-title">
                      Create Progress Info
                    </div>
                    <Form onSubmit={(e) => handleCreateNewProgress(e)}>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="newProgressDate">
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            min={trip.departure_date}
                            value={newProgressDate}
                            isInvalid={InvalidNewProgressDate}
                            onChange={(e) => handleChangeNewProgressDate(e)}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="progressDes">
                          <Form.Label>Progress Description</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={newProgressDes}
                            onChange={(e) => handleChangeNewDescription(e)}
                            isInvalid={invalidNewProgressDes}
                          />
                        </Form.Group>
                      </Row>
                      <Button variant="primary" type="submit">
                        Confirm
                      </Button>
                    </Form>
                  </div>

                  {showDelete && (
                    <div className="delete-confirm">
                      <div className="delete-title">
                        Are you sure to delete this progress info?
                      </div>
                      <div className="timestamp">
                        Timestamp: <b>{deleteProgress.date}</b>
                      </div>
                      <Button variant="primary" onClick={handleDeleteProgress}>
                        Confirm
                      </Button>
                      <Button
                        variant="secondary"
                        className="mx-2"
                        onClick={() => setShowDelete(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {showEdit && (
                    <div className="edit-progress">
                      <div className="edit-progress-title">Edit Progress</div>
                      <Form onSubmit={(e) => handleEditProgress(e)}>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="EditProgressDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              min={trip.departure_date}
                              value={editProgressDate}
                              isInvalid={InvalidEditProgressDate}
                              onChange={(e) => handleChangeEditProgressDate(e)}
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="editProgressDes">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter description"
                              value={editProgressDes}
                              isInvalid={invalidEditProgressDes}
                              onChange={(e) => handleChangeEditProgressDes(e)}
                            />
                          </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                          Confirm
                        </Button>
                        <Button
                          variant="secondary"
                          className="mx-2"
                          onClick={() => handleCloseEdit()}
                        >
                          Cancel
                        </Button>
                      </Form>
                    </div>
                  )}
                </Scrollbars>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseProgress}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showTripDetail}
              onHide={handleCloseDetailTrip}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Trip Detail</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tabs
                  defaultActiveKey="detailStation"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  justify
                >
                  <Tab eventKey="detailStation" title="Station">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Index</th>
                          <th>Station</th>
                          <th>Maximum Free up capacity unit</th>
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
                                <td>
                                  {station.dropOff ? station.dropOff : "-"}
                                </td>
                              </tr>
                            );
                          })}
                        {routeDetail && routeDetail.length > 0 && (
                          <tr>
                            <td colSpan={2} style={{ textAlign: "center" }}>
                              <b>Sum Free Up</b>
                            </td>
                            <td>{sumFreeup}</td>
                          </tr>
                        )}
                        <tr>
                          <td colSpan={2} style={{ textAlign: "center" }}>
                            <b>Total Capacity</b>
                          </td>
                          <td>{totalCapacity}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <div style={{ marginTop: "5%" }}>
                      <i>
                        Note: <b>Total Capacity - Sum Free Up</b> must not
                        exceed vehicle capacity
                      </i>
                    </div>
                  </Tab>
                  <Tab eventKey="statusUpdate" title="Update Status">
                    <Form onSubmit={(e) => handleUpdateStatus(e)}>
                      <Row className="mb-5">
                        <Form.Group as={Col} controlId="selectStatus">
                          <Form.Label>Trip Status</Form.Label>
                          <Form.Select
                            defaultValue={statusUpdate}
                            aria-label="Default select example"
                            onChange={(e) => setStatusUpdate(e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Select status
                            </option>
                            <option value="Standby">Standby</option>
                            <option value="Departed">Departed</option>
                            <option value="Completed">Completed</option>
                          </Form.Select>
                        </Form.Group>

                        <Col></Col>
                      </Row>
                      <Button variant="primary" type="submit">
                        Confirm
                      </Button>
                    </Form>
                  </Tab>
                  <Tab eventKey="orderList" title="Order List">
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Departure</th>
                          <th>Destination</th>
                          <th>Bird Quantity</th>
                          <th>Capacity Unit</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listOrder &&
                          listOrder.length > 0 &&
                          listOrder.map((order) => {
                            return (
                              <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.departure_location}</td>
                                <td>{order.arrival_location}</td>
                                <td>{order.bird_quantity}</td>
                                <td>{order.total_capacity}</td>
                                <td>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleClickRemove(order)}
                                  >
                                    Remove
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        {listOrder && listOrder.length === 0 && (
                          <tr>
                            <td colSpan={6}>List is empty...</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>

                    {showRemove && (
                      <div className="delete-confirm">
                        <div className="delete-title">
                          Are you sure to remove this order from curent trip?
                        </div>
                        <div className="timestamp">
                          <Row>
                            <Col className="col-2">Order ID:</Col>
                            <Col>
                              <b>{removeOrder.order_id}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="col-2">From:</Col>
                            <Col>
                              <b>{removeOrder.departure_location}</b>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="col-2">To:</Col>
                            <Col>
                              <b>{removeOrder.arrival_location}</b>
                            </Col>
                          </Row>
                        </div>
                        <Button variant="primary" onClick={handleRemoveOrder}>
                          Confirm
                        </Button>
                        <Button
                          variant="secondary"
                          className="mx-2"
                          onClick={() => setShowRemove(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Tab>
                </Tabs>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetailTrip}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <div className="assign-container">
          <div className="assign-title">Assign Order To Trip</div>
          <div className="select-container">
            <div className="select-trip-content">
              <div className="select-trip-title">Select Trip</div>
              <div className="select-trip">
                <Select
                  value={selectedTrip}
                  onChange={setSelectedTrip}
                  options={tripOption}
                  isClearable={true}
                />
              </div>
            </div>
            <div className="select-order-content">
              <div className="select-order-title">Select Order</div>
              <div className="select-order">
                <Select
                  value={selectedOrder}
                  onChange={handleChangeOrder}
                  options={orderOption}
                  isClearable={true}
                />
              </div>
            </div>
          </div>

          <div className="detail-title">Order Detail</div>
          <div className="order-detail">
            <Table striped hover responsive="md">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Departure</th>
                  <th>Destination</th>
                  <th>Ancicipate Date</th>
                  <th>Bird Quantity</th>
                  <th>Capacity Unit</th>
                </tr>
              </thead>
              <tbody>
                {detailSelectedOrder && !_.isEmpty(detailSelectedOrder) ? (
                  <tr>
                    <td>{detailSelectedOrder.order_id}</td>
                    <td>{detailSelectedOrder.departure_location}</td>
                    <td>{detailSelectedOrder.arrival_location}</td>
                    <td>{detailSelectedOrder.anticipate_date}</td>
                    <td>{detailSelectedOrder.bird_quantity}</td>
                    <td>{detailSelectedOrder.total_capacity}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={6}>Select an order...</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Button className="confirm-btn" onClick={handleAssign}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
