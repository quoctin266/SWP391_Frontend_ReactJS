import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "./ViewHistory.scss";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getCustomerOrder,
  getCustomer,
  getBirdList,
  putCancelOrder,
} from "../../../service/APIservice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { GrView } from "react-icons/gr";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BootstrapTable from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

const ViewHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const [isSortNewest, setIsSortNewest] = useState(true);
  const [filterList, setFilterList] = useState([]);
  const [sender, setSender] = useState("");
  const [showSender, setShowSender] = useState(false);
  const [detailOrder, setDetailOrder] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [birdList, setBirdList] = useState([]);
  const [cancelItem, setCancelItem] = useState("");
  const [showCancel, setShowCancel] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_LIMIT = 6;
  const navigate = useNavigate();

  const account_id = useSelector((state) => state.auth.account_id);

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

  const sortNewest = () => {
    let cloneList = _.cloneDeep(filterList);

    cloneList = cloneList.sort((a, b) =>
      moment(b.created_time, "DD-MM-YYYY HH:mm").diff(
        moment(a.created_time, "DD-MM-YYYY HH:mm")
      )
    );
    setIsSortNewest(false);
    setFilterList(cloneList);
  };

  const sortOldest = () => {
    let cloneList = _.cloneDeep(filterList);

    cloneList = cloneList.sort((a, b) =>
      moment(a.created_time, "DD-MM-YYYY HH:mm").diff(
        moment(b.created_time, "DD-MM-YYYY HH:mm")
      )
    );
    setIsSortNewest(true);
    setFilterList(cloneList);
  };

  const handleChangeStatus = (value) => {
    let cloneList = _.cloneDeep(orderList);
    if (value !== "all") {
      cloneList = cloneList.filter((order) => order.status === value);
    }
    setFilterList(cloneList);
  };

  const handleCloseSender = () => setShowSender(false);
  const handleViewSender = async (item) => {
    let data = await getCustomer(item.order_id);
    if (data && data.EC === 0) {
      setSender(data.DT);
      setShowSender(true);
    } else toast.error(data.EM);
  };

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = async (item) => {
    let dataBird = await getBirdList(item.order_id);
    if (dataBird && dataBird.EC === 0) {
      setBirdList(dataBird.DT);
    }
    setShowDetail(true);
    setDetailOrder(item);
  };

  const handleShowCancel = (item) => {
    setShowCancel(true);
    setCancelItem(item);
  };
  const handleCloseCancel = () => setShowCancel(false);

  const handleCancelOrder = async () => {
    let data = await putCancelOrder(cancelItem.order_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleCloseCancel();

      let newData = await getCustomerOrder(account_id);
      if (newData && newData.EC === 0) {
        setOrderList(newData.DT);
        setFilterList(newData.DT);
      }
    } else toast.error(data.EM);
  };

  useEffect(() => {
    const fetchAllOrder = async () => {
      let data = await getCustomerOrder(account_id);
      if (data && data.EC === 0) {
        setOrderList(data.DT);
        setFilterList(data.DT);
      }
    };
    fetchAllOrder();
  }, [account_id]);

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

  return (
    <Container className="history-outer">
      <div className="view-history-container">
        <div className="Header">
          <h2 className="title">Your Orders</h2>
        </div>

        <Col className="col-4 mt-5 title-filter">
          <Form.Label style={{ fontSize: "1.2em" }}>
            Filter by order status
          </Form.Label>
          <Form.Select
            defaultValue=""
            aria-label="Default select example"
            className="mt-2"
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
        </Col>

        {isSortNewest ? (
          <Button
            variant="success"
            className="mt-4 mb-5"
            onClick={() => sortNewest()}
          >
            Sort by newest
          </Button>
        ) : (
          <Button
            variant="success"
            className="mt-4 mb-5"
            onClick={() => sortOldest()}
          >
            Sort by oldest
          </Button>
        )}

        <div className="history-table">
          <TableContainer component={Paper} sx={{ borderRadius: "2rem" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#839e77" }}>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "bolder",
                      border: "0",
                    }}
                  >
                    Order ID
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "bolder",
                      border: "0",
                    }}
                  >
                    Sender
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "bolder",
                      border: "0",
                    }}
                  >
                    Order Date&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "bolder",
                      border: "0",
                    }}
                  >
                    Payment Method&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "bolder",
                      border: "0",
                    }}
                  >
                    Status&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "bolder",
                      border: "0",
                    }}
                  >
                    Total Cost&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: "bolder",
                      border: "0",
                    }}
                  >
                    Actions&nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems &&
                  currentItems.length > 0 &&
                  currentItems.map((item) => {
                    return (
                      <TableRow
                        key={item.order_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          width={5}
                          sx={{ border: "0" }}
                          className="tableCell"
                        >
                          {item.order_id}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          width={5}
                          sx={{ border: "0" }}
                          className="sender"
                        >
                          {item.full_name}{" "}
                          <span
                            onClick={() => handleViewSender(item)}
                            style={{
                              cursor: "pointer",
                              float: "right",
                              marginRight: "7%",
                            }}
                          >
                            <GrView />
                          </span>
                        </TableCell>
                        <TableCell
                          style={{ width: "15%" }}
                          align="center"
                          width={3}
                          className="created-time"
                          sx={{ border: "0" }}
                        >
                          {item.created_time}
                        </TableCell>
                        <TableCell
                          style={{ width: "15%" }}
                          align="center"
                          width={3}
                          className="tableCell"
                          sx={{ border: "0" }}
                        >
                          {item.method_name
                            ? item.method_name
                            : item.payment_type}
                        </TableCell>
                        <TableCell
                          align="center"
                          width={3}
                          className="tableCell"
                          sx={{ border: "0" }}
                        >
                          {item.status}
                        </TableCell>
                        <TableCell
                          style={{ width: "15%" }}
                          align="center"
                          width={3}
                          className="tableCell"
                          sx={{ border: "0" }}
                        >
                          {new Intl.NumberFormat().format(item.total_cost)} VND
                        </TableCell>
                        <TableCell
                          align="left"
                          width={3}
                          className="button-group"
                          sx={{ border: "0" }}
                        >
                          <Button
                            variant="secondary"
                            onClick={() => handleShowDetail(item)}
                          >
                            Detail
                          </Button>
                          {item.status === "Pending" && (
                            <Button
                              variant="danger"
                              className="mx-2"
                              onClick={() => handleShowCancel(item)}
                            >
                              Cancel
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {currentItems && currentItems.length === 0 && (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      colSpan={6}
                      component="th"
                      scope="row"
                      sx={{ border: "0" }}
                      className="tableCell"
                    >
                      Not found...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal
            show={showSender}
            onHide={handleCloseSender}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Sender Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={sender.full_name}
                      disabled
                    />
                  </Col>

                  <Col>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={sender.address} disabled />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={sender.phone_number}
                      disabled
                    />
                  </Col>

                  <Col></Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseSender}>
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
                      <Col>
                        <Form.Label>Departure</Form.Label>
                        <Form.Control
                          type="text"
                          value={detailOrder.departure_location}
                          disabled
                        />
                      </Col>

                      <Col>
                        <Form.Label>Destination</Form.Label>
                        <Form.Control
                          type="text"
                          value={detailOrder.arrival_location}
                          disabled
                        />
                      </Col>
                    </Row>

                    <Row className="mb-5">
                      <Col>
                        <Form.Label>Package</Form.Label>
                        <Form.Control
                          type="text"
                          value={detailOrder.package_name}
                          disabled
                        />
                      </Col>

                      <Col></Col>
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
                          value={detailOrder.anticipate_date}
                          disabled
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Estimated Arrival</Form.Label>
                        <Form.Control
                          type="text"
                          value={detailOrder.estimated_arrival}
                          disabled
                        />
                      </Col>
                    </Row>
                  </Form>
                </Tab>

                <Tab eventKey="bird" title="Bird Detail">
                  <BootstrapTable striped bordered hover>
                    <thead>
                      <tr>
                        <th>Bird Name</th>
                        <th>Age</th>
                        <th>Weight</th>
                        <th>Gender</th>
                        <th>Cage</th>
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
                            </tr>
                          );
                        })}
                    </tbody>
                  </BootstrapTable>
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
            show={showCancel}
            onHide={handleCloseCancel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Cancel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure to cancel this order?
              <br />
              Order ID: <b>{cancelItem.order_id}</b>
              <br />
              Sender: <b>{cancelItem.full_name}</b>
              <br />
              Departure: <b>{cancelItem.departure_location}</b>
              <br />
              Destination: <b>{cancelItem.arrival_location}</b>
              <br />
              Travel Date: <b>{cancelItem.anticipate_date}</b>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCancel}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCancelOrder}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

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

        <div className="back-button">
          <Button variant="success" onClick={() => navigate("/account-detail")}>
            Back to Profile
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ViewHistory;
