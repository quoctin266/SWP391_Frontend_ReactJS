import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import {
  getAllStation,
  postCreateStation,
  putUpdateStation,
  deleteStation,
} from "../../../../service/APIservice";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ManageStation = () => {
  const [show, setShow] = useState(false);
  const [stationList, setStationList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const [addName, setAddName] = useState("");
  const [addAddress, setAddAddress] = useState("");
  const [invalidAddName, setInvalidAddName] = useState(false);
  const [invalidAddAddress, setInvalidAddAddress] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [invalidEditName, setInvalidEditName] = useState(false);
  const [invalidEditAddress, setInvalidEditAddress] = useState(false);
  const [editItem, setEditItem] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

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
    let newPageCount = Math.ceil(stationList.length / PAGE_LIMIT);
    const endOffset = itemOffset + PAGE_LIMIT;
    setCurrentItems(stationList.slice(itemOffset, endOffset));
    setPageCount(newPageCount);
  }, [itemOffset, stationList]);

  useEffect(() => {
    let newPageCount = Math.ceil(stationList.length / PAGE_LIMIT);
    if (newPageCount < pageCount) {
      if (currentPage === pageCount) {
        const newOffset = ((currentPage - 2) * PAGE_LIMIT) % stationList.length;
        const endOffset = newOffset + PAGE_LIMIT;
        setCurrentItems(stationList.slice(newOffset, endOffset));
        setCurrentPage((currentPage) => currentPage - 1);
      }
    }
  }, [currentPage, pageCount, stationList]);

  const fetchAllStation = async () => {
    let data = await getAllStation();
    if (data && data.EC === 0) {
      setStationList(data.DT);
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

  const handleCloseEdit = () => {
    setInvalidEditAddress(false);
    setInvalidEditName(false);
    setShowEdit(false);
  };
  const handleShowEdit = (item) => {
    setEditItem(item);
    setEditAddress(item.address ? item.address : "");
    setEditName(item.name);
    setShowEdit(true);
  };

  const handleChangeEditName = (value) => {
    setInvalidEditName(false);
    setEditName(value);
  };

  const handleChangeEditAddress = (value) => {
    setInvalidEditAddress(false);
    setEditAddress(value);
  };

  const handleEditStation = async (e) => {
    e.preventDefault();

    if (!editName) {
      toast.error("Station name must not be empty.");
      setInvalidEditName(true);
      return;
    }

    if (!editAddress) {
      toast.error("Please specify address.");
      setInvalidEditAddress(true);
      return;
    }

    let data = await putUpdateStation(
      editName,
      editAddress,
      editItem.station_id
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllStation();
      handleCloseEdit();
    } else toast.error(data.EM);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (item) => {
    setDeleteItem(item);
    setShowDelete(true);
  };

  const handleDeleteStation = async () => {
    let data = await deleteStation(deleteItem.station_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllStation();
      handleCloseDelete();
    } else toast.error(data.EM);
  };

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
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item) => {
                return (
                  <tr key={item.station_id}>
                    <td>{item.station_id}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleShowEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => handleShowDelete(item)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Station Info</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditStation}>
          <Modal.Body>
            <Col className="mb-3">
              <Form.Label>Station</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter station name"
                isInvalid={invalidEditName}
                value={editName}
                onChange={(e) => handleChangeEditName(e.target.value)}
              />
            </Col>

            <Col className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter station address"
                isInvalid={invalidEditAddress}
                value={editAddress}
                onChange={(e) => handleChangeEditAddress(e.target.value)}
              />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Confirm
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
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to remove this station?
          <br />
          Station Name: <b>{deleteItem.name}</b>
          <br />
          Address: <b>{deleteItem.address}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteStation}>
            Confirm
          </Button>
        </Modal.Footer>
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
    </>
  );
};

export default ManageStation;
