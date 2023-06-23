import "./Schedule.scss";
import Select from "react-select";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  getAllRoute,
  getRouteDetail,
  getTripList,
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
  getAllStation,
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
import { MdAddCircle } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { GrView } from "react-icons/gr";

const Schedule = () => {
  const [routeList, setRouteList] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState({
    value: 0,
    label: "Select...",
  });
  const [routeDetail, setRouteDetail] = useState([]);
  const [stationList, setStationList] = useState([]);

  const [tripList, setTripList] = useState([]);

  const [showDrivers, setShowDrivers] = useState(false);
  const [driverList, setDriverList] = useState([]);

  const [trip, setTrip] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progressList, setProgressList] = useState([]);

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
  const [totalCapacity, setTotalCapacity] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [listOrder, setListOrder] = useState([]);
  const [showRemove, setShowRemove] = useState(false);
  const [removeOrder, setRemoveOrder] = useState("");

  const [pendingOrderList, setPendingOrderList] = useState([]);

  const [routeEstimate, setRouteEstimate] = useState([]);
  const [assignOrders, setAssignOrders] = useState([]);
  const [manageRouteDetail, setManageRouteDetail] = useState([]);

  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  const [temp4, setTemp4] = useState("");

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
  };
  const handleViewProgress = async (trip) => {
    let data = await getProgressList(trip.trip_id);
    if (data && data.EC === 0) {
      setProgressList(data.DT);
    } else setProgressList([]);

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

    let newProgressDes = `${temp1}${temp2}.${temp3}${temp4}`;
    if (!newProgressDes) {
      toast.error("Description must not be empty.");
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
      setNewProgressDate("");
      setTemp1("");
      setTemp2("");
      setTemp3("");
      setTemp4("");
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
    let sumCapacity = 0;

    let data = await getOrderCapacity(trip.trip_id);
    if (data && data.EC === 0) {
      cloneRoute.forEach((station, index) => {
        data.DT.forEach((order) => {
          if (station.name === order.departure_location) {
            station.pickup += order.total_capacity;
          }
          if (station.name === order.arrival_location) {
            station.dropoff += order.total_capacity;
          }
        });
        if (index !== 0) {
          let sumPickup = 0;
          let sumDropoff = 0;
          for (let i = 0; i < index + 1; i++) {
            sumPickup += cloneRoute[i].pickup;
            sumDropoff += cloneRoute[i].dropoff;
          }
          station.totalUnit = sumPickup - sumDropoff;
        } else station.totalUnit = station.pickup;
      });

      data.DT.forEach((item) => {
        sumCapacity += +item.total_capacity;
      });
      setListOrder(data.DT);
    } else {
      setListOrder([]);
    }
    setTrip(trip);
    setStatusUpdate(trip.status);
    setTotalCapacity(sumCapacity);
    setManageRouteDetail(cloneRoute);
    setShowTripDetail(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();

    let data = await putUpdateTripStatus(trip.trip_id, statusUpdate);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      let dataNew = await getTripList(selectedRoute.value);
      if (dataNew && dataNew.EC === 0) {
        setTripList(dataNew.DT);
      } else if (dataNew && dataNew.EC === 107) {
        setTripList([]);
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

  const fetchAllStation = async () => {
    let data = await getAllStation();
    if (data && data.EC === 0) {
      setStationList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllRoute();
    fetchAllStation();
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
          item.totalUnit = 0;
          item.dropoff = 0;
          item.pickup = 0;
        });
        setRouteDetail(sortedArr);
      }
    };

    const fetchTripsList = async () => {
      let data = await getTripList(selectedRoute.value);
      if (data && data.EC === 0) {
        setTripList(data.DT);
      } else if (data && data.EC === 107) {
        setTripList([]);
      }
    };
    fetchRouteDetail();
    fetchTripsList();
  }, [selectedRoute]);

  useEffect(() => {
    const fetchPendingOrder = async () => {
      // initiate route detail of the selected trip
      let cloneRouteDetail = _.cloneDeep(routeDetail);
      tripList.forEach((item) => {
        if (item.trip_id === trip.trip_id) {
          cloneRouteDetail.forEach((station) => {
            let estimate = moment(item.departure_date, "DD-MM-YYYY HH:mm:ss")
              .add(station.driving_time, "minutes")
              .format("DD-MM-YYYY");

            let estimate_time = moment(
              item.departure_date,
              "DD-MM-YYYY HH:mm:ss"
            )
              .add(station.driving_time, "minutes")
              .format("DD-MM-YYYY HH:mm:ss");

            station.estimate_depart = estimate;
            station.estimate_time = estimate_time;
          });
        }
      });

      // calculate current capacity of each station of the trip
      let dataOrder = await getOrderCapacity(trip.trip_id);
      if (dataOrder && dataOrder.EC === 0) {
        cloneRouteDetail.forEach((station, index) => {
          dataOrder.DT.forEach((order) => {
            if (station.name === order.departure_location) {
              station.pickup += order.total_capacity;
            }
            if (station.name === order.arrival_location) {
              station.dropoff += order.total_capacity;
            }
          });
          if (index !== 0) {
            let sumPickup = 0;
            let sumDropoff = 0;
            for (let i = 0; i < index + 1; i++) {
              sumPickup += cloneRouteDetail[i].pickup;
              sumDropoff += cloneRouteDetail[i].dropoff;
            }
            station.totalUnit = sumPickup - sumDropoff;
          } else station.totalUnit = station.pickup;
        });
      }

      // check departure and date to filter order
      let data = await getPendingOrder();
      if (data && data.EC === 0) {
        let cloneOrder = _.cloneDeep(data.DT);
        let cloneOrder2 = [];
        for (let i = 0; i < cloneRouteDetail.length - 1; i++) {
          cloneOrder.forEach((order) => {
            if (order.departure_location === cloneRouteDetail[i].name) {
              if (
                order.anticipate_date === cloneRouteDetail[i].estimate_depart
              ) {
                cloneOrder2.push(order);
              }
            }
          });
        }

        setPendingOrderList(cloneOrder2);
      } else {
        setPendingOrderList([]);
      }

      setRouteEstimate(cloneRouteDetail);
      setAssignOrders([]);
    };

    fetchPendingOrder();
  }, [routeDetail, trip, tripList]);

  const fetchPendingOrder = async () => {
    // initiate route detail of the selected trip
    let cloneRouteDetail = _.cloneDeep(routeDetail);
    tripList.forEach((item) => {
      if (item.trip_id === trip.trip_id) {
        cloneRouteDetail.forEach((station) => {
          let estimate = moment(item.departure_date, "DD-MM-YYYY HH:mm:ss")
            .add(station.driving_time, "minutes")
            .format("DD-MM-YYYY");

          let estimate_time = moment(item.departure_date, "DD-MM-YYYY HH:mm:ss")
            .add(station.driving_time, "minutes")
            .format("DD-MM-YYYY HH:mm:ss");

          station.estimate_depart = estimate;
          station.estimate_time = estimate_time;
        });
      }
    });

    // calculate current capacity of each station of the trip
    let dataOrder = await getOrderCapacity(trip.trip_id);
    if (dataOrder && dataOrder.EC === 0) {
      cloneRouteDetail.forEach((station, index) => {
        dataOrder.DT.forEach((order) => {
          if (station.name === order.departure_location) {
            station.pickup += order.total_capacity;
          }
          if (station.name === order.arrival_location) {
            station.dropoff += order.total_capacity;
          }
        });
        if (index !== 0) {
          let sumPickup = 0;
          let sumDropoff = 0;
          for (let i = 0; i < index + 1; i++) {
            sumPickup += cloneRouteDetail[i].pickup;
            sumDropoff += cloneRouteDetail[i].dropoff;
          }
          station.totalUnit = sumPickup - sumDropoff;
        } else station.totalUnit = station.pickup;
      });
    }

    // check departure and date to filter order
    let data = await getPendingOrder();
    if (data && data.EC === 0) {
      let cloneOrder = _.cloneDeep(data.DT);
      let cloneOrder2 = [];
      for (let i = 0; i < cloneRouteDetail.length - 1; i++) {
        cloneOrder.forEach((order) => {
          if (order.departure_location === cloneRouteDetail[i].name) {
            if (order.anticipate_date === cloneRouteDetail[i].estimate_depart) {
              let validOrder = assignOrders.every((item) => {
                if (item.order_id === order.order_id) return false;
                return true;
              });
              if (validOrder) cloneOrder2.push(order);
            }
          }
        });
      }

      setPendingOrderList(cloneOrder2);
    } else {
      setPendingOrderList([]);
    }
    setRouteEstimate(cloneRouteDetail);
  };

  const handleAssign = async (e) => {
    if (assignOrders.length === 0) {
      toast.error("Must assign at least 1 order.");
      return;
    }

    let data = await putAssignOrder(assignOrders, trip.trip_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setRouteEstimate([]);
      handleCloseDetailTrip();
    } else toast.error(data.EM);
  };

  const handleTempAdd = async (order) => {
    let vehicleCapacity = trip.capacity;

    let cloneRoute = _.cloneDeep(routeEstimate);
    cloneRoute.forEach((station, index) => {
      if (station.name === order.departure_location) {
        station.pickup += order.total_capacity;
      } else if (station.name === order.arrival_location) {
        station.dropoff += order.total_capacity;
      }
      if (index !== 0) {
        // let sumPickup = 0;
        // let sumDropoff = 0;
        // for (let i = 0; i < index + 1; i++) {
        //   sumPickup += cloneRoute[i].pickup;
        //   sumDropoff += cloneRoute[i].dropoff;
        // }
        // station.totalUnit = sumPickup - sumDropoff;
        station.totalUnit =
          cloneRoute[index - 1].totalUnit + station.pickup - station.dropoff;
      } else station.totalUnit = station.pickup;
    });

    let validAssign = cloneRoute.every((station) => {
      if (station.totalUnit > vehicleCapacity) {
        let remainUnit =
          vehicleCapacity + order.total_capacity - station.totalUnit;
        if (remainUnit !== 0) {
          toast.error(
            `Only ${remainUnit} more capacity unit can be assigned at ${station.name} station.`
          );
        } else {
          toast.error(`${station.name} station has reached maximum capacity.`);
        }
        return false;
      }
      return true;
    });
    if (!validAssign) return;

    let assignList = [...assignOrders];
    assignList.push(order);

    let newPendingList = pendingOrderList.filter(
      (item) => item.order_id !== order.order_id
    );

    setPendingOrderList(newPendingList);
    setAssignOrders(assignList);
    setRouteEstimate(cloneRoute);
  };

  const handleRemoveTemp = (item) => {
    let cloneRoute = _.cloneDeep(routeEstimate);

    cloneRoute.forEach((station, index) => {
      if (station.name === item.departure_location) {
        station.pickup -= item.total_capacity;
      }
      if (station.name === item.arrival_location) {
        station.dropoff -= item.total_capacity;
      }
      if (index !== 0) {
        let sumPickup = 0;
        let sumDropoff = 0;
        for (let i = 0; i < index + 1; i++) {
          sumPickup += cloneRoute[i].pickup;
          sumDropoff += cloneRoute[i].dropoff;
        }
        station.totalUnit = sumPickup - sumDropoff;
      } else station.totalUnit = station.pickup;
    });

    let newAssign = assignOrders.filter(
      (order) => order.order_id !== item.order_id
    );

    let newPendingList = [...pendingOrderList];
    newPendingList.push(item);

    setPendingOrderList(newPendingList);
    setRouteEstimate(cloneRoute);
    setAssignOrders(newAssign);
  };

  const handleChangeRoute = (selectedRoute) => {
    setSelectedRoute(selectedRoute);
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
              onChange={handleChangeRoute}
              options={routeList}
            />
            <div className="detail-title">Route detail</div>
            <div className="route-detail">
              <Table striped hover bordered>
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
            <Table striped hover bordered responsive="sm">
              <thead>
                <tr>
                  <th>Trip ID</th>
                  <th>Departure Date</th>
                  <th>Status</th>
                  <th>Driver</th>
                  <th>Vehicle</th>
                  <th>Capacity</th>
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
                          {trip.driver_name}
                          <span
                            style={{
                              cursor: "pointer",
                              float: "right",
                              marginRight: "7%",
                            }}
                            onClick={() => handleShowDrivers(trip.trip_id)}
                          >
                            <GrView />
                          </span>
                        </td>
                        <td>{trip.vehicle_name}</td>
                        <td>{trip.capacity}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleShowDetailTrip(trip)}
                          >
                            Manage
                          </Button>
                          <Button
                            className="mx-2"
                            variant="warning"
                            onClick={() => handleViewProgress(trip)}
                          >
                            Track
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
                <Table striped hover bordered>
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
                      {progressList && progressList.length === 0 && (
                        <tr>
                          <td colSpan={3}>Not found...</td>
                        </tr>
                      )}
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

                        <Col></Col>
                      </Row>

                      <Row className="mb-3">
                        <Form.Label>Progress Description</Form.Label>
                        <Col>
                          <Form.Select
                            defaultValue=""
                            aria-label="Default des1"
                            onChange={(e) => setTemp1(e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Select template...
                            </option>
                            <option value="">None</option>
                            <option value="Begin delivery">
                              Begin delivery
                            </option>
                            <option value="Departing from ">
                              Departing from
                            </option>
                            <option value="Arrived at ">Arrived at</option>
                          </Form.Select>
                        </Col>

                        <Col>
                          <Form.Select
                            defaultValue=""
                            aria-label="Default des2"
                            onChange={(e) => setTemp2(e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Select station...
                            </option>
                            <option value="">None</option>
                            {stationList &&
                              stationList.length > 0 &&
                              stationList.map((station) => {
                                return (
                                  <option
                                    value={station.name}
                                    key={station.station_id}
                                  >
                                    {station.name}
                                  </option>
                                );
                              })}
                          </Form.Select>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col>
                          <Form.Select
                            defaultValue=""
                            aria-label="Default des3"
                            onChange={(e) => setTemp3(e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Select template...
                            </option>
                            <option value="">None</option>
                            <option value=" Moving to ">Moving to</option>
                            <option value=" Delivery completed">
                              Delivery completed
                            </option>
                          </Form.Select>
                        </Col>

                        <Col>
                          <Form.Select
                            defaultValue=""
                            aria-label="Default des4"
                            onChange={(e) => setTemp4(e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Select station...
                            </option>
                            <option value="">None</option>
                            {stationList &&
                              stationList.length > 0 &&
                              stationList.map((station) => {
                                return (
                                  <option
                                    value={station.name}
                                    key={station.station_id}
                                  >
                                    {station.name}
                                  </option>
                                );
                              })}
                          </Form.Select>
                        </Col>
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
              dialogClassName="my-modal"
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
                    <div className="stations-table">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Index</th>
                            <th>Station</th>
                            <th>Total Capacity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {manageRouteDetail &&
                            manageRouteDetail.length > 0 &&
                            manageRouteDetail.map((station) => {
                              return (
                                <tr key={station.station_id}>
                                  <td>{station.station_index}</td>
                                  <td>{station.name}</td>
                                  <td>{station.totalUnit}</td>
                                </tr>
                              );
                            })}
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
                          Note: <b>Total Capacity</b> at each station must not
                          exceed vehicle capacity
                        </i>
                      </div>
                    </div>
                  </Tab>

                  <Tab eventKey="statusUpdate" title="Update Status">
                    <div className="updt-status">
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

                          <Col>
                            <Button variant="primary" type="submit">
                              Confirm
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Tab>

                  <Tab eventKey="orderList" title="Order List">
                    <div className="trip-orders">
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
                    </div>
                  </Tab>

                  <Tab eventKey="assignOrder" title="Assign Order">
                    <div className="assign-container">
                      <Row>
                        <Col lg={9}>
                          <div className="trip-detail-title">Trip Detail</div>
                          <div>
                            <Table striped hover bordered responsive="md">
                              <thead>
                                <tr>
                                  <th>Index</th>
                                  <th>Station</th>
                                  <th>Estimate Arrival</th>
                                  <th>Current Capacity</th>
                                  <th>Max Capacity</th>
                                  <th>Remaining Capacity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {routeEstimate &&
                                  routeEstimate.length > 0 &&
                                  routeEstimate[0].estimate_time !==
                                    undefined &&
                                  routeEstimate.map((station, index) => {
                                    return (
                                      <tr key={station.station_id}>
                                        <td>{station.station_index}</td>
                                        <td>{station.name}</td>
                                        <td>{station.estimate_time}</td>
                                        <td>{station.totalUnit}</td>
                                        <td>
                                          {index !== routeEstimate.length - 1
                                            ? trip.capacity
                                            : 0}
                                        </td>
                                        <td>
                                          {index !== routeEstimate.length - 1
                                            ? trip.capacity - station.totalUnit
                                            : 0}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                {routeEstimate && routeEstimate.length === 0 ? (
                                  <tr>
                                    <td colSpan={4}>Empty list...</td>
                                  </tr>
                                ) : routeEstimate[0].estimate_time ===
                                  undefined ? (
                                  <tr>
                                    <td colSpan={4}>Empty list...</td>
                                  </tr>
                                ) : (
                                  <></>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <div className="detail-title">Available Orders</div>
                          <div className="order-detail">
                            <Table striped hover bordered responsive="md">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Departure</th>
                                  <th>Destination</th>
                                  <th>Capacity Unit</th>
                                  <th>Total Cost</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {pendingOrderList &&
                                  pendingOrderList.length > 0 &&
                                  pendingOrderList.map((order) => {
                                    return (
                                      <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.departure_location}</td>
                                        <td>{order.arrival_location}</td>
                                        <td>{order.total_capacity}</td>
                                        <td>
                                          {new Intl.NumberFormat().format(
                                            order.total_cost
                                          )}{" "}
                                          VND
                                        </td>
                                        <td>
                                          <span
                                            className="add-order-icon"
                                            onClick={() => handleTempAdd(order)}
                                          >
                                            <MdAddCircle />
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                {pendingOrderList &&
                                  pendingOrderList.length === 0 && (
                                    <tr>
                                      <td colSpan={6}>Empty list...</td>
                                    </tr>
                                  )}
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>

                      <div className="added-container">
                        <div className="added-list-title">Added Orders</div>
                        <div className="added-list">
                          <Table striped hover bordered responsive="md">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Departure</th>
                                <th>Destination</th>
                                <th>Capacity Unit</th>
                                <th>Total Cost</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {assignOrders &&
                                assignOrders.length > 0 &&
                                assignOrders.map((order) => {
                                  return (
                                    <tr key={order.order_id}>
                                      <td>{order.order_id}</td>
                                      <td>{order.departure_location}</td>
                                      <td>{order.arrival_location}</td>
                                      <td>{order.total_capacity}</td>
                                      <td>
                                        {new Intl.NumberFormat().format(
                                          order.total_cost
                                        )}{" "}
                                        VND
                                      </td>
                                      <td>
                                        <span
                                          className="remove-btn"
                                          onClick={() =>
                                            handleRemoveTemp(order)
                                          }
                                        >
                                          <MdRemoveCircle />
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              {assignOrders && assignOrders.length === 0 && (
                                <tr>
                                  <td colSpan={6}>Nothing added yet...</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                      <div className="confirm-container">
                        <Button className="confirm-btn" onClick={handleAssign}>
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: "flex-start" }}>
                <Button variant="secondary" onClick={handleCloseDetailTrip}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
