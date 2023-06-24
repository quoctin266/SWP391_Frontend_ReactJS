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

const ListOrder = () => {
  const [listOrder, setListOrder] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [tripOption, setTripOption] = useState([]);
  const [selectedTrip, setselectedTrip] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [showCustomer, setShowCustomer] = useState(false);
  const [customer, setCustomer] = useState("");

  const [showDetail, setShowDetail] = useState(false);
  const [order, setOrder] = useState("");
  const [birdList, setBirdList] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [transportList, setTransportList] = useState([]);

  const [updateDepart, setUpdateDepart] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

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
    setShowEdit(false);
    setShowDelete(false);
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
          label: `${trip.departure_date} ${trip.departure} - ${trip.destination}`,
        });
      });
      setTripOption(tripOption);
    }
  };

  useEffect(() => {
    fetchListOrder();
    fetchAllTrip();
  }, []);

  const handleChangeStatus = (value) => {
    let cloneList = _.cloneDeep(listOrder);
    if (value !== "all") {
      cloneList = cloneList.filter((order) => order.status === value);
    }
    setFilterList(cloneList);
    setFilterStatus(value);
  };

  const handleUpdateOrderStatus = async (e) => {
    e.preventDefault();

    let data = await putUpdateOrderStatus(
      order.order_id,
      statusUpdate,
      updateDepart
    );
    if (data && data.EC === 0) {
      fetchListOrder();
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
      toast.error("Please fill in order status.");
      return;
    }

    if (!statusDate) {
      setInvalidStatusDate(true);
      toast.error("Must choose a date.");
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

  const handleClickDelete = (item) => {
    setDeleteStatus(item);
    setShowDelete(true);
    handleCloseEdit();
  };

  const handleDeleteStatus = async () => {
    let data = await deleteTransportStatus(deleteStatus.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchTransportStatus();
      setShowDelete(false);
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
    setShowDelete(false);
  };
  const handleCloseEdit = () => {
    setInvalidEditStatus(false);
    setInvalidEditStatusDate(false);
    setShowEdit(false);
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
      toast.error("Order status must not be empty.");
      return;
    }

    if (!editStatusDate) {
      setInvalidEditStatusDate(true);
      toast.error("Must choose a date.");
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
    } else toast.error(data.EM);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!selectedTrip) {
      toast.error("Please select a trip.");
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
    setFilterStatus("");
  };

  return (
    <div className="list-order-container">
      <div className="title">List Of Orders</div>
      <div className="order-list">
        <Form.Group controlId="formGridStatus">
          <Form.Label className="filter-title">
            Filter by order status
          </Form.Label>
          <Form.Select
            value={filterStatus}
            aria-label="Default select example"
            onChange={(e) => handleChangeStatus(e.target.value)}
          >
            <option value="" disabled hidden>
              Select status
            </option>
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivering">Delivering</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </Form.Select>
        </Form.Group>
        <Form onSubmit={(e) => handleSearch(e)}>
          <Col className="mb-3">
            <Form.Label className="search-title">Search By Trip</Form.Label>
            <Select
              value={selectedTrip}
              onChange={setselectedTrip}
              options={tripOption}
              isClearable={true}
            />
          </Col>
          <Button variant="primary" type="submit">
            Search
          </Button>
          <Button variant="secondary" className="mx-2" onClick={fetchListOrder}>
            Refresh
          </Button>
        </Form>

        <Table striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Departure - Destination</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
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
                      Detail
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleShowUpdate(order.order_id)}
                    >
                      Update
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
            <Modal.Title>Customer Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCustomerName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={customer.full_name}
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={customer.address ? customer.address : ""}
                    disabled
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCustomerPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={customer.phone_number ? customer.phone_number : ""}
                    disabled
                  />
                </Form.Group>

                <Col></Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCustomer}>
              Close
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
            <Modal.Title>Order Detail Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              defaultActiveKey="general"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="general" title="General Info">
                <Form>
                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="formGridStatus">
                      <Form.Label>Order Status</Form.Label>
                      <Form.Control type="text" value={order.status} disabled />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPackage">
                      <Form.Label>Package</Form.Label>
                      <Form.Control
                        type="text"
                        value={order.package_name}
                        disabled
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="formGridPayment">
                      <Form.Label>Payment Method</Form.Label>
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
                      <Form.Label>Total Cost</Form.Label>
                      <Form.Control
                        type="text"
                        value={`${new Intl.NumberFormat().format(
                          order.total_cost
                        )} VND`}
                        disabled
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </Tab>
              <Tab eventKey="date" title="Date And Time">
                <Form>
                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="formGridAnticipate">
                      <Form.Label>Anticipate Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={order.anticipate_date}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDepartureDate">
                      <Form.Label>Departing Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={order.departure_date}
                        disabled
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCreated">
                      <Form.Label>Order Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={order.created_time}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmpty"></Form.Group>
                  </Row>
                </Form>
              </Tab>
              <Tab eventKey="bird" title="Bird Detail">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Bird Name</th>
                      <th>Age</th>
                      <th>Weight</th>
                      <th>Gender</th>
                      <th>Cage</th>
                      <th>Note</th>
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
                                      Note
                                    </Popover.Header>
                                    <Popover.Body>{bird.note}</Popover.Body>
                                  </Popover>
                                }
                              >
                                <Button variant="secondary">View</Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetail}>
              Close
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
            <Modal.Title>Update Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              defaultActiveKey="departAndStatus"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="departAndStatus" title="Order Status">
                <Form onSubmit={(e) => handleUpdateOrderStatus(e)}>
                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="StatusUpdate">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        defaultValue={statusUpdate}
                        onChange={(e) => setStatusUpdate(e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivering">Delivering</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </Form.Select>
                    </Form.Group>

                    <Col></Col>
                  </Row>

                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="departUpdate">
                      <Form.Label>Departing Date</Form.Label>
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
                    <Button type="submit" variant="primary">
                      Confirm
                    </Button>
                  </div>
                </Form>
              </Tab>
              <Tab eventKey="transportStatus" title="Progress Detail">
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
                        <th>Order status</th>
                        <th>Bird condition</th>
                        <th>Actions</th>
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

                  <div className="add-new-status">
                    <div className="add-status-title">Create New Status</div>
                    <Form onSubmit={(e) => handleCreateNewStatus(e)}>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="orderStatus">
                          <Form.Label>Order Status</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter status"
                            value={newStatus}
                            onChange={(e) => handleChangeNewStatus(e)}
                            isInvalid={invalidNewStatus}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="newBirdCondition">
                          <Form.Label>Bird Condition</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter bird condition note"
                            value={birdCondition}
                            onChange={(e) => setBirdCondition(e.target.value)}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="newStatusDate">
                          <Form.Label>Date</Form.Label>
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
                        Confirm
                      </Button>
                    </Form>
                  </div>

                  {showDelete && (
                    <div className="delete-confirm">
                      <div className="delete-title">
                        Are you sure to delete this status?
                      </div>
                      <div className="timestamp">
                        Timestamp: <b>{deleteStatus.date}</b>
                      </div>
                      <Button variant="primary" onClick={handleDeleteStatus}>
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
                    <div className="edit-status">
                      <div className="edit-status-title">
                        Edit Transport Status
                      </div>
                      <Form onSubmit={(e) => handleEditTransportStatus(e)}>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="editOrderStatus">
                            <Form.Label>Order Status</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter status"
                              value={editStatus}
                              isInvalid={invalidEditStatus}
                              onChange={(e) => handleChangeEditStatus(e)}
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="EditBirdCondition">
                            <Form.Label>Bird Condition</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter bird condition note"
                              value={editBirdCondition}
                              onChange={(e) =>
                                setEditBirdCondition(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="EditStatusDate">
                            <Form.Label>Date</Form.Label>
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
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>

        <div className="d-flex justify-content-center mt-5">
          <ReactPaginate
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< Previous"
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
