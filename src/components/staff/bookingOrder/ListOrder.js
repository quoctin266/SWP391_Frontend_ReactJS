import "./ListOrder.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  getListOrder,
  getCustomer,
  getBirdList,
  getTransportStatus,
  putUpdateOrderStatus,
  postCreateTransportStatus,
  deleteTransportStatus,
  putUpdateTransportStatus,
  getOrderByTrip,
  getAllTrip,
  getRouteDetail,
  putUpdateOrderList,
} from "../../../service/APIservice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import _ from "lodash";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GrView } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const ListOrder = () => {
  const { t } = useTranslation();
  const [listOrder, setListOrder] = useState([]);
  const [tripList, setTripList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [tripOption, setTripOption] = useState([]);
  const [selectedTrip, setselectedTrip] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDes, setFilterDes] = useState("");
  const [desList, setDesList] = useState([]);

  const [showCustomer, setShowCustomer] = useState(false);
  const [customer, setCustomer] = useState("");

  const [showDetail, setShowDetail] = useState(false);
  const [order, setOrder] = useState("");
  const [birdList, setBirdList] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [transportList, setTransportList] = useState([]);

  const [updateDepart, setUpdateDepart] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [anticipate, setAnticipate] = useState("");

  const [newStatus, setNewStatus] = useState("");
  const [invalidNewStatus, setInvalidNewStatus] = useState(false);
  const [birdCondition, setBirdCondition] = useState("");
  const [statusDate, setStatusDate] = useState("");
  const [invalidStatusDate, setInvalidStatusDate] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("");

  const [editStatus, setEditStatus] = useState("");
  const [invalidEditStatus, setInvalidEditStatus] = useState(false);
  const [editBirdCondition, setEditBirdCondition] = useState("");
  const [editStatusDate, setEditStatusDate] = useState("");
  const [InvalidEditStatusDate, setInvalidEditStatusDate] = useState(false);
  const [statusID, setStatusID] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_LIMIT = 6;

  const handlePageClick = (event) => {
    const newOffset = (+event.selected * PAGE_LIMIT) % filterList.length;
    setItemOffset(newOffset);
    setCurrentPage(+event.selected + 1);
  };

  useEffect(() => {
    let newPageCount = Math.ceil(filterList.length / PAGE_LIMIT);
    const endOffset = itemOffset + PAGE_LIMIT;
    setCurrentItems(filterList.slice(itemOffset, endOffset));
    setPageCount(newPageCount);
  }, [itemOffset, filterList]);

  useEffect(() => {
    let newPageCount = Math.ceil(filterList.length / PAGE_LIMIT);
    if (newPageCount < pageCount) {
      const newOffset = 0;
      const endOffset = newOffset + PAGE_LIMIT;
      setCurrentItems(filterList.slice(newOffset, endOffset));
      setItemOffset(newOffset);
      setCurrentPage(1);
    }
  }, [currentPage, pageCount, filterList]);

  const handleCloseCustomer = () => setShowCustomer(false);
  const handleShowCustomer = async (orderID) => {
    let data = await getCustomer(orderID);
    if (data && data.EC === 0) {
      setCustomer(data.DT);
      setShowCustomer(true);
    } else toast.error(data.EM);
  };

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = async (orderID) => {
    let cloneOrderList = _.cloneDeep(listOrder);
    cloneOrderList.forEach((order) => {
      if (order.order_id === orderID) {
        order.anticipate_date = moment(order.anticipate_date).format(
          "DD-MM-YYYY"
        );
        order.departure_date = order.departure_date
          ? moment(order.departure_date).format("DD-MM-YYYY").toString()
          : "Not yet";
        order.created_time = moment(order.created_time)
          .format("DD-MM-YYYY HH:mm")
          .toString();
        order.estimated_arrival = moment(order.estimated_arrival)
          .format("DD-MM-YYYY")
          .toString();
        setOrder(order);
      }
    });

    let dataBird = await getBirdList(orderID);
    if (dataBird && dataBird.EC === 0) {
      setBirdList(dataBird.DT);
    }
    setShowDetail(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setInvalidEditStatus(false);
    setInvalidEditStatusDate(false);
    setInvalidNewStatus(false);
    setInvalidStatusDate(false);
  };
  const handleShowUpdate = async (orderID) => {
    let cloneOrderList = _.cloneDeep(listOrder);
    cloneOrderList.forEach((order) => {
      if (order.order_id === orderID) {
        order.created_time = moment(order.created_time)
          .format("YYYY-MM-DD[T]HH:mm")
          .toString();
        order.anticipate_date = moment(order.anticipate_date)
          .format("YYYY-MM-DD")
          .toString();
        order.departure_date = order.departure_date
          ? moment(order.departure_date).format("YYYY-MM-DD").toString()
          : "";
        setOrder(order);
        setAnticipate(order.anticipate_date);
        setUpdateDepart(order.departure_date);
        setStatusUpdate(order.status);
      }
    });

    let transportData = await getTransportStatus(orderID);
    if (transportData && transportData.EC === 0) {
      setTransportList(transportData.DT);
    }
    setShowUpdate(true);
  };

  const fetchListOrder = async () => {
    let data = await getListOrder();
    if (data && data.EC === 0) {
      setListOrder(data.DT);
      setFilterList(data.DT);
      setFilterStatus("");
      setFilterDes("");
      setselectedTrip(null);
    }
  };

  const fetchAllTrip = async () => {
    let data = await getAllTrip();
    if (data && data.EC === 0) {
      let tripOption = [];
      data.DT.forEach((trip) => {
        tripOption.push({
          value: trip.trip_id,
          label: `${trip.departure_date} >>> ${trip.departure} - ${trip.destination} <<< Trip ID: ${trip.trip_id}`,
        });
      });
      setTripOption(tripOption);
      setTripList(data.DT);
    }
  };

  useEffect(() => {
    fetchListOrder();
    fetchAllTrip();
  }, []);

  const handleChangeTrip = (selectedTrip) => {
    setselectedTrip(selectedTrip);
    setFilterList([]);
    setDesList([]);
    setFilterDes("");
  };

  const handleChangeStatus = (value) => {
    let cloneList = _.cloneDeep(listOrder);
    if (value !== "all") {
      cloneList = cloneList.filter((order) => order.status === value);
    }
    setFilterList(cloneList);
    setFilterStatus(value);
  };

  const handleChangeDes = (value) => {
    if (!selectedTrip) {
      toast.error("Please select a trip first.");
      return;
    }
    let cloneList = _.cloneDeep(listOrder);
    cloneList = cloneList.filter((order) => order.arrival_location === value);
    setFilterList(cloneList);
    setFilterDes(value);
  };

  const handleUpdateOrderStatus = async (e) => {
    e.preventDefault();

    if (statusUpdate === "Completed") {
      if (order.status !== "Delivering" && order.status !== statusUpdate) {
        toast.error("Order is still pending or has been canceled.");
        return;
      }

      let valid = tripList.every((trip) => {
        if (trip.trip_id === order.trip_id) {
          if (trip.status === "Standby") {
            toast.error("Trip has not departed yet.");
            return false;
          }
        }
        return true;
      });

      if (!valid) return;
    }

    if (statusUpdate === "Canceled") {
      if (order.status !== "Delivering" && order.status !== statusUpdate) {
        toast.error("Order is still pending or has completed.");
        return;
      }
    }

    if (!anticipate) {
      toast.error("Anticipate date can not be empty.");
      return;
    }

    let data = await putUpdateOrderStatus(
      order.order_id,
      statusUpdate,
      updateDepart,
      anticipate
    );
    if (data && data.EC === 0) {
      if (selectedTrip) {
        let dataNew = await getOrderByTrip(selectedTrip?.value);
        if (dataNew && dataNew.EC === 0) {
          setListOrder(dataNew.DT);
          setFilterList(dataNew.DT);
        } else {
          setListOrder([]);
          setFilterList([]);
        }
        setFilterStatus("");
        setFilterDes("");
      } else fetchListOrder();

      toast.success(data.EM);
      setShowUpdate(false);
    } else toast.error(data.EM);
  };

  const handleChangeNewStatus = (e) => {
    setNewStatus(e.target.value);
    setInvalidNewStatus(false);
  };

  const handleChangeStatusDate = (e) => {
    setStatusDate(e.target.value);
    setInvalidStatusDate(false);
  };

  const fetchTransportStatus = async () => {
    let transportData = await getTransportStatus(order.order_id);
    if (transportData && transportData.EC === 0) {
      setTransportList(transportData.DT);
    }
  };

  const handleCreateNewStatus = async (e) => {
    e.preventDefault();

    if (!newStatus) {
      setInvalidNewStatus(true);
      toast.error(`${t("orderList.toast1")}`);
      return;
    }

    if (!statusDate) {
      setInvalidStatusDate(true);
      toast.error(`${t("orderList.toast2")}`);
      return;
    }

    let dateFormat = moment(statusDate)
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();
    let data = await postCreateTransportStatus(
      order.order_id,
      newStatus,
      birdCondition,
      dateFormat
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchTransportStatus();
      setNewStatus("");
      setBirdCondition("");
      setStatusDate("");
    } else toast.error(data.EM);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    handleShowUpdate(order.order_id);
  };
  const handleClickDelete = (item) => {
    setDeleteStatus(item);
    setShowDelete(true);
    handleCloseUpdate();
  };

  const handleDeleteStatus = async () => {
    let data = await deleteTransportStatus(deleteStatus.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchTransportStatus();
      handleCloseDelete();
    } else toast.error(data.EM);
  };

  const handleClickEdit = (item) => {
    let dateFormat = moment(item.date, "DD-MM-YYYY HH:mm:ss")
      .format("YYYY-MM-DD[T]HH:mm")
      .toString();
    setEditStatusDate(dateFormat);
    setEditStatus(item.order_status);
    setEditBirdCondition(item.bird_condition ? item.bird_condition : "");
    setStatusID(item.id);
    setShowEdit(true);
    handleCloseUpdate();
  };
  const handleCloseEdit = () => {
    setInvalidEditStatus(false);
    setInvalidEditStatusDate(false);
    setShowEdit(false);
    handleShowUpdate(order.order_id);
  };
  const handleChangeEditStatus = (e) => {
    setEditStatus(e.target.value);
    setInvalidEditStatus(false);
  };

  const handleChangeEditDate = (e) => {
    setEditStatusDate(e.target.value);
    setInvalidEditStatusDate(false);
  };

  const handleEditTransportStatus = async (e) => {
    e.preventDefault();

    if (!editStatus) {
      setInvalidEditStatus(true);
      toast.error(`${t("orderList.toast1")}`);
      return;
    }

    if (!editStatusDate) {
      setInvalidEditStatusDate(true);
      toast.error(`${t("orderList.toast2")}`);
      return;
    }

    let dateFormat = moment(editStatusDate)
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();

    let data = await putUpdateTransportStatus(
      statusID,
      editStatus,
      editBirdCondition,
      dateFormat
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchTransportStatus();
      handleCloseEdit();
    } else toast.error(data.EM);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!selectedTrip) {
      toast.error(`${t("orderList.toast3")}`);
      return;
    }

    let data = await getOrderByTrip(selectedTrip?.value);
    if (data && data.EC === 0) {
      setListOrder(data.DT);
      setFilterList(data.DT);
    } else {
      setListOrder([]);
      setFilterList([]);
      toast.error(data.EM);
    }

    let routeID = null;
    tripList.forEach((trip) => {
      if (trip.trip_id === selectedTrip?.value) routeID = trip.route_id;
    });

    let dataNew = await getRouteDetail(routeID);
    if (dataNew && dataNew.EC === 0) {
      let destinationList = dataNew.DT.filter(
        (item) => item.station_index !== 1
      );
      setDesList(destinationList);
    } else setDesList([]);
    setFilterStatus("");
    setFilterDes("");
  };

  const handleUpdateList = async () => {
    if (!selectedTrip) {
      toast.error("Please select a trip first.");
      return;
    }

    if (!filterDes) {
      toast.error("Please select a destination.");
      return;
    }

    if (filterList.length === 0) {
      toast.error("Empty order list.");
      return;
    }

    let valid = tripList.every((trip) => {
      if (trip.trip_id === selectedTrip?.value) {
        if (trip.status === "Standby") {
          toast.error("Trip has not departed yet.");
          return false;
        }
      }
      return true;
    });

    if (!valid) return;

    let data = await putUpdateOrderList(filterList);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      if (selectedTrip) {
        let dataNew = await getOrderByTrip(selectedTrip?.value);
        if (dataNew && dataNew.EC === 0) {
          setListOrder(dataNew.DT);
          let cloneList = dataNew.DT.filter(
            (order) => order.arrival_location === filterDes
          );
          setFilterList(cloneList);
        } else {
          setListOrder([]);
          setFilterList([]);
        }
        setFilterStatus("");
      } else fetchListOrder();
    } else toast.error(data.EM);
  };

  return (
    <div className="list-order-container">
      <div className="title">{t("orderList.header")}</div>
      <div className="order-list">
        <Form.Group controlId="formGridStatus">
          <Form.Label className="filter-title">
            {t("orderList.title1")}
          </Form.Label>
          <Form.Select
            className="filter-status"
            value={filterStatus}
            aria-label="Default select example"
            onChange={(e) => handleChangeStatus(e.target.value)}
          >
            <option value="" disabled hidden>
              {t("orderList.note1")}
            </option>
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivering">Delivering</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </Form.Select>
        </Form.Group>
        <Form onSubmit={(e) => handleSearch(e)}>
          <Row className="mb-3" style={{ alignItems: "flex-end" }}>
            <Col>
              <Form.Label className="search-title">
                {t("orderList.title2")}
              </Form.Label>
              <Select
                value={selectedTrip}
                onChange={handleChangeTrip}
                options={tripOption}
                isClearable={true}
              />
            </Col>

            <Col>
              <Form.Label className="search-title">
                {t("orderList.title3")}
              </Form.Label>
              <Form.Select
                value={filterDes}
                aria-label="Default select example"
                onChange={(e) => handleChangeDes(e.target.value)}
              >
                <option value="" disabled hidden>
                  {t("orderList.note6")}
                </option>
                {desList &&
                  desList.length > 0 &&
                  desList.map((item) => {
                    return (
                      <option value={item.name} key={item.station_id}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Col>

            <Col className="col-2">
              <Button variant="warning" onClick={handleUpdateList}>
                Complete
              </Button>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            {t("orderList.searchBtn")}
          </Button>
          <Button variant="secondary" className="mx-2" onClick={fetchListOrder}>
            {t("orderList.refreshBtn")}
          </Button>
        </Form>

        <Table striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>{t("orderList.field1")}</th>
              <th>{t("orderList.field2")}</th>
              <th>{t("orderList.field3")}</th>
              <th>{t("orderList.field4")}</th>
              <th>{t("orderList.field5")}</th>
              <th>{t("orderList.field6")}</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>
                    {order.full_name}{" "}
                    <span
                      style={{
                        cursor: "pointer",
                        float: "right",
                        marginRight: "7%",
                      }}
                      onClick={() => handleShowCustomer(order.order_id)}
                    >
                      <GrView />
                    </span>
                  </td>
                  <td>
                    {order.departure_location} - {order.arrival_location}
                  </td>
                  <td>
                    {moment(order.created_time)
                      .format("DD-MM-YYYY HH:mm")
                      .toString()}
                  </td>
                  <td>{order.status}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="mx-2"
                      onClick={() => handleShowDetail(order.order_id)}
                    >
                      {t("orderList.detailBtn")}
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleShowUpdate(order.order_id)}
                    >
                      {t("orderList.updateBtn")}
                    </Button>
                  </td>
                </tr>
              ))}
            {currentItems && currentItems.length === 0 && (
              <tr>
                <td colSpan={6}>List is Empty...</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Modal
          show={showCustomer}
          onHide={handleCloseCustomer}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("orderList.customerTitle")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCustomerName">
                  <Form.Label>{t("orderList.label1")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={customer.full_name}
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCustomerPhone">
                  <Form.Label>{t("orderList.label3")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={customer.phone_number ? customer.phone_number : ""}
                    disabled
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress">
                  <Form.Label>{t("orderList.label2")}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={customer.address ? customer.address : ""}
                    disabled
                  />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCustomer}>
              {t("orderList.closeBtn")}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showDetail}
          onHide={handleCloseDetail}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("orderList.detail")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>{t("orderList.label4")}</Form.Label>
                  <Form.Control type="text" value={order.status} disabled />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCreated">
                  <Form.Label>{t("orderList.label5")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={order.created_time}
                    disabled
                  />
                </Form.Group>

                <Col></Col>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAnticipate">
                  <Form.Label>{t("orderList.label6")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={order.anticipate_date}
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDepartureDate">
                  <Form.Label>{t("orderList.label7")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={order.departure_date}
                    disabled
                  />
                </Form.Group>

                <Col></Col>
              </Row>

              <Row className="mb-5">
                <Form.Group as={Col} controlId="formGridPackage">
                  <Form.Label>{t("orderList.label8")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={order.package_name}
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPayment">
                  <Form.Label>{t("orderList.label9")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      order.method_name
                        ? `${order.payment_type} - ${order.method_name}`
                        : `${order.payment_type}`
                    }
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCost">
                  <Form.Label>{t("orderList.label10")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${new Intl.NumberFormat().format(
                      order.total_cost
                    )} VND`}
                    disabled
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3" style={{ padding: "0 2%" }}>
                <div className="mb-3">
                  <b>{t("orderList.bird")}</b>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>{t("orderList.bird1")}</th>
                      <th>{t("orderList.bird2")}</th>
                      <th>{t("orderList.bird3")}</th>
                      <th>{t("orderList.bird4")}</th>
                      <th>{t("orderList.bird5")}</th>
                      <th>{t("orderList.bird6")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {birdList &&
                      birdList.length > 0 &&
                      birdList.map((bird) => {
                        return (
                          <tr key={bird.bird_id}>
                            <td>{bird.bird_name}</td>
                            <td>{bird.age}</td>
                            <td>{bird.weight.toFixed(1)} kg</td>
                            <td>{bird.gender === "F" ? "Female" : "Male"}</td>
                            <td>{bird.dimension} cm</td>
                            <td>
                              <OverlayTrigger
                                trigger="focus"
                                placement="right"
                                overlay={
                                  <Popover id={`popover-positioned-right`}>
                                    <Popover.Header as="h3">
                                      {t("orderList.bird6")}
                                    </Popover.Header>
                                    <Popover.Body>{bird.note}</Popover.Body>
                                  </Popover>
                                }
                              >
                                <Button variant="secondary">
                                  {t("orderList.viewBtn")}
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetail}>
              {t("orderList.closeBtn")}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("orderList.updateTitle")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              defaultActiveKey="departAndStatus"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="departAndStatus" title={t("orderList.tab1")}>
                <Form onSubmit={(e) => handleUpdateOrderStatus(e)}>
                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="StatusUpdate">
                      <Form.Label>{t("orderList.label11")}</Form.Label>
                      <Form.Select
                        defaultValue={order.status}
                        onChange={(e) => setStatusUpdate(e.target.value)}
                      >
                        {order.status === "Completed" ||
                        order.status === "Canceled" ? (
                          ""
                        ) : (
                          <option value={order.status}>{order.status}</option>
                        )}
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </Form.Select>
                    </Form.Group>

                    <Col>
                      <Form.Label>Anticipate Date</Form.Label>
                      <Form.Control
                        type="date"
                        readOnly={order.status !== "Pending"}
                        value={anticipate}
                        onChange={(e) => setAnticipate(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="departUpdate">
                      <Form.Label>{t("orderList.label12")}</Form.Label>
                      <Form.Control
                        type="date"
                        value={updateDepart}
                        min={order.anticipate_date}
                        onChange={(e) => setUpdateDepart(e.target.value)}
                      />
                    </Form.Group>

                    <Col></Col>
                  </Row>
                  <hr />
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={
                        order.status === "Completed" ||
                        order.status === "Canceled"
                      }
                    >
                      {t("orderList.confirmBtn")}
                    </Button>
                  </div>
                </Form>
              </Tab>

              <Tab eventKey="transportStatus" title={t("orderList.tab2")}>
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
                        <th>{t("orderList.field7")}</th>
                        <th>{t("orderList.field8")}</th>
                        <th>{t("orderList.field9")}</th>
                        <th>{t("orderList.field10")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transportList &&
                        transportList.length > 0 &&
                        transportList.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.date}</td>
                              <td>{item.order_status}</td>
                              <td>{item.bird_condition}</td>
                              <td>
                                <Button
                                  variant="warning"
                                  onClick={() => handleClickEdit(item)}
                                >
                                  {t("orderList.editBtn")}
                                </Button>
                                <Button
                                  variant="danger"
                                  className="mx-2"
                                  onClick={() => handleClickDelete(item)}
                                >
                                  {t("orderList.deleteBtn")}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>

                  <div className="add-new-status">
                    <div className="add-status-title">
                      {t("orderList.addTitle")}
                    </div>
                    <Form onSubmit={(e) => handleCreateNewStatus(e)}>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="orderStatus">
                          <Form.Label>{t("orderList.label13")}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={t("orderList.note2")}
                            value={newStatus}
                            onChange={(e) => handleChangeNewStatus(e)}
                            isInvalid={invalidNewStatus}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="newBirdCondition">
                          <Form.Label>{t("orderList.label14")}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={t("orderList.note3")}
                            value={birdCondition}
                            onChange={(e) => setBirdCondition(e.target.value)}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="newStatusDate">
                          <Form.Label>{t("orderList.label15")}</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            min={order.created_time}
                            value={statusDate}
                            isInvalid={invalidStatusDate}
                            onChange={(e) => handleChangeStatusDate(e)}
                          />
                        </Form.Group>

                        <Col></Col>
                      </Row>
                      <Button variant="primary" type="submit">
                        {t("orderList.confirmBtn")}
                      </Button>
                    </Form>
                  </div>
                </Scrollbars>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>

        <Modal
          show={showEdit}
          onHide={handleCloseEdit}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("orderList.editTitle")}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => handleEditTransportStatus(e)}>
            <Modal.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="editOrderStatus">
                  <Form.Label>{t("orderList.label16")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("orderList.note4")}
                    value={editStatus}
                    isInvalid={invalidEditStatus}
                    onChange={(e) => handleChangeEditStatus(e)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="EditBirdCondition">
                  <Form.Label>{t("orderList.label17")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("orderList.note5")}
                    value={editBirdCondition}
                    onChange={(e) => setEditBirdCondition(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="EditStatusDate">
                  <Form.Label>{t("orderList.label18")}</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    min={order.created_time}
                    value={editStatusDate}
                    isInvalid={InvalidEditStatusDate}
                    onChange={(e) => handleChangeEditDate(e)}
                  />
                </Form.Group>

                <Col></Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                {t("orderList.closeBtn")}
              </Button>
              <Button variant="primary" type="submit">
                {t("orderList.confirmBtn")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal
          show={showDelete}
          onHide={handleCloseDelete}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("orderList.deleteTitle")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="delete-title">{t("orderList.deleteNote")}</div>
            <div className="timestamp">
              {t("orderList.info")} <b>{deleteStatus.date}</b>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              {t("orderList.closeBtn")}
            </Button>
            <Button variant="primary" onClick={handleDeleteStatus}>
              {t("orderList.confirmBtn")}
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="d-flex justify-content-center mt-5">
          <ReactPaginate
            nextLabel={t("orderList.next")}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={t("orderList.pre")}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={pageCount !== 0 ? currentPage - 1 : -1} //if there is user data to be fetch, display current page as active
          />
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
