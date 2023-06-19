import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import {
  getAllStation,
  postCreateStation,
} from "../../../../service/APIservice";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ManageStation = () => {
  const [show, setShow] = useState(false);
  const [stationList, setStationList] = useState([]);
  const [pageCount, setPageCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const [addName, setAddName] = useState("");
  const [addAddress, setAddAddress] = useState("");
  const [invalidAddName, setInvalidAddName] = useState(false);
  const [invalidAddAddress, setInvalidAddAddress] = useState(false);

  const PAGE_LIMIT = 6;

  const handleChangeAddName = (value) => {
    setInvalidAddName(false);
    setAddName(value);
  };

  const handleChangeAddAddress = (value) => {
    setInvalidAddAddress(false);
    setAddAddress(value);
  };

  const handleAddStation = async (e) => {
    e.preventDefault();

    if (!addName) {
      toast.error("Station name must not be empty.");
      setInvalidAddName(true);
      return;
    }

    if (!addAddress) {
      toast.error("Please specify address.");
      setInvalidAddAddress(true);
      return;
    }

    let data = await postCreateStation(addName, addAddress);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllStation();
      handleClose();
    } else toast.error(data.EM);
  };

  const handlePageClick = (event) => {
    const newOffset = (+event.selected * PAGE_LIMIT) % stationList.length;
    setItemOffset(newOffset);
    setCurrentPage(+event.selected + 1);
  };

  useEffect(() => {
    const endOffset = itemOffset + PAGE_LIMIT;

    setCurrentItems(stationList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(stationList.length / PAGE_LIMIT));
  }, [itemOffset, stationList]);

  const fetchAllStation = async () => {
    let data = await getAllStation();
    if (data && data.EC === 0) {
      setStationList(data.DT);
      let pageCount = Math.ceil(data.DT.length / PAGE_LIMIT);
      setPageCount(pageCount);
    }
  };

  useEffect(() => {
    fetchAllStation();
  }, []);

  const handleClose = () => {
    setAddName("");
    setAddAddress("");
    setInvalidAddAddress(false);
    setInvalidAddName(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="station-title">Station List</div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add new
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Station</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddStation}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicStation">
              <Form.Label>Station</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter station name"
                isInvalid={invalidAddName}
                value={addName}
                onChange={(e) => handleChangeAddName(e.target.value)}
              />
            </Form.Group>

            <Col className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter station address"
                isInvalid={invalidAddAddress}
                value={addAddress}
                onChange={(e) => handleChangeAddAddress(e.target.value)}
              />
            </Col>
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
      <div className="station-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Station</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item, index) => {
                return (
                  <tr key={item.station_id}>
                    <td>{item.station_id}</td>
                    <td>{item.name}</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
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
    </>
  );
};

export default ManageStation;
