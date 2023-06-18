import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import {
  getAllVehicle,
  postCreateVehicle,
  putUpdateVehicle,
  deleteVehicle,
} from "../../../../service/APIservice";
import { toast } from "react-toastify";
import { Col } from "react-bootstrap";

const ManageVehicle = () => {
  const [show, setShow] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);
  const [addName, setAddName] = useState("");
  const [addCapacity, setAddCapacity] = useState("");
  const [invalidAddName, setInvalidAddName] = useState(false);
  const [invalidAddCapacity, setInvalidAddCapacity] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCapacity, setEditCapacity] = useState("");
  const [invalidEditName, setInvalidEditName] = useState(false);
  const [invalidEditCapacity, setInvalidEditCapacity] = useState(false);
  const [editItem, setEditItem] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (item) => {
    setDeleteItem(item);
    setShowDelete(true);
  };

  const handleCloseEdit = () => {
    setInvalidEditCapacity(false);
    setInvalidEditName(false);
    setShowEdit(false);
  };
  const handleShowEdit = (item) => {
    setEditItem(item);
    setEditName(item.vehicle_name);
    setEditCapacity(item.capacity);
    setShowEdit(true);
  };

  const handleClose = () => {
    setAddName("");
    setAddCapacity("");
    setInvalidAddCapacity(false);
    setInvalidAddName(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChangeAddName = (value) => {
    setInvalidAddName(false);
    setAddName(value);
  };

  const handleChangeAddCapacity = (value) => {
    setInvalidAddCapacity(false);
    setAddCapacity(value);
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    if (!addName) {
      setInvalidAddName(true);
      toast.error("Please fill in vehicle name.");
      return;
    }

    if (!addCapacity || +addCapacity === 0) {
      setInvalidAddCapacity(true);
      toast.error("Invalid vehicle capacity.");
      return;
    }

    let data = await postCreateVehicle(addName, addCapacity);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      fetchAllVehicle();
    } else toast.error(data.EM);
  };

  const handleChangeEditName = (value) => {
    setInvalidEditName(false);
    setEditName(value);
  };

  const handleChangeEditCapacity = (value) => {
    setInvalidEditCapacity(false);
    setEditCapacity(value);
  };

  const handleEditVehicle = async (e) => {
    e.preventDefault();

    if (!editName) {
      setInvalidEditName(true);
      toast.error("Please fill in vehicle name.");
      return;
    }

    if (!editCapacity || +editCapacity === 0) {
      setInvalidEditCapacity(true);
      toast.error("Invalid vehicle capacity.");
      return;
    }

    let data = await putUpdateVehicle(
      editName,
      editCapacity,
      editItem.vehicle_id
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllVehicle();
      handleCloseEdit();
    } else toast.error(data.EM);
  };

  const handleDeleteVehicle = async () => {
    let data = await deleteVehicle(deleteItem.vehicle_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllVehicle();
      handleCloseDelete();
    } else toast.error(data.EM);
  };

  const fetchAllVehicle = async () => {
    let data = await getAllVehicle();
    if (data && data.EC === 0) {
      setVehicleList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllVehicle();
  }, []);

  return (
    <>
      <div className="vehicle-title">Vehicle List</div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add new
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Vehicle</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddVehicle}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicVehicle">
              <Form.Label>Vehicle Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vehicle name"
                isInvalid={invalidAddName}
                value={addName}
                onChange={(e) => handleChangeAddName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCarryLimit">
              <Form.Label>Carry Limit</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter carry limit"
                min="0"
                isInvalid={invalidAddCapacity}
                value={addCapacity}
                onChange={(e) => handleChangeAddCapacity(e.target.value)}
              />
            </Form.Group>
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

      <div className="vehicle-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Carry Limit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicleList &&
              vehicleList.length > 0 &&
              vehicleList.map((item, index) => {
                return (
                  <tr key={item.vehicle_id}>
                    <td>{index + 1}</td>
                    <td>{item.vehicle_name}</td>
                    <td>{item.capacity}</td>
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

        <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit Vehicle Info</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditVehicle}>
            <Modal.Body>
              <Col>
                <Form.Label>Vehicle Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vehicle name"
                  isInvalid={invalidEditName}
                  value={editName}
                  onChange={(e) => handleChangeEditName(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>Carry Limit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter carry limit"
                  min="0"
                  isInvalid={invalidEditCapacity}
                  value={editCapacity}
                  onChange={(e) => handleChangeEditCapacity(e.target.value)}
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
            Are you sure to delete this vehicle?
            <br />
            Vehicle Name: <b>{deleteItem.vehicle_name}</b>
            <br />
            Capacity: <b>{deleteItem.capacity}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteVehicle}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ManageVehicle;
