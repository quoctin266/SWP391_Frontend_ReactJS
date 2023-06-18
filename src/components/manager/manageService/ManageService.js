import "./ManageService.scss";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  postCreatePayment,
  getAllPayment,
  putUpdatePayment,
  deletePayment,
} from "../../../service/APIservice";
import { useEffect } from "react";
import ManagePrice from "./ManagePrice";
import ManagePackage from "./ManagePackage";

const ManageService = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [paymentName, setPaymentName] = useState("");
  const [invalidType, setInvalidType] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [showEditPayment, setShowEditPayment] = useState(false);
  const [EditPaymentType, setEditPaymentType] = useState("");
  const [EditPaymentName, setEditPayementName] = useState("");
  const [InvalidEditPaymentName, setInvalidEditPaymentName] = useState(false);
  const [editPayment, setEditPayment] = useState("");
  const [showDeletePayment, setShowDeletePayment] = useState(false);
  const [deletePaymentItem, setDeletePaymentItem] = useState("");

  const handleCloseDeletePayment = () => {
    setShowDeletePayment(false);
  };
  const handleShowDeletePayment = (item) => {
    setDeletePaymentItem(item);
    setShowDeletePayment(true);
  };
  const handleClosePayment = () => {
    setShowPayment(false);
    setInvalidType(false);
    setInvalidName(false);
    setPaymentName("");
    setPaymentType("");
  };
  const handleShowPayment = () => setShowPayment(true);
  const handleCloseEditPayment = () => {
    setInvalidEditPaymentName(false);
    setShowEditPayment(false);
  };
  const handleShowEditPayment = (item) => {
    setEditPaymentType(item.payment_type);
    setEditPayementName(item.method_name);
    setEditPayment(item);
    setShowEditPayment(true);
  };

  const handleChangeType = (value) => {
    setInvalidType(false);
    setPaymentType(value);
  };

  const handleChangeName = (value) => {
    setInvalidName(false);
    setPaymentName(value);
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();

    if (!paymentType) {
      toast.error("Must choose payment type.");
      setInvalidType(true);
      return;
    }

    if (!paymentName) {
      toast.error("Please fill in payment method name.");
      setInvalidName(true);
      return;
    }

    let data = await postCreatePayment(paymentType, paymentName);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClosePayment();
      fetchAllPayment();
    } else toast.error(data.EM);
  };

  const handleChangeEditPaymentName = (value) => {
    setInvalidEditPaymentName(false);
    setEditPayementName(value);
  };

  const handleEditPayment = async (e) => {
    e.preventDefault();

    if (!EditPaymentName) {
      toast.error("Please fill in payment method name.");
      setInvalidEditPaymentName(true);
      return;
    }

    let data = await putUpdatePayment(
      editPayment.id,
      EditPaymentName,
      EditPaymentType
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleCloseEditPayment();
      fetchAllPayment();
    } else toast.error(data.EM);
  };

  const handleDeletePayment = async () => {
    let data = await deletePayment(deletePaymentItem.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllPayment();
      handleCloseDeletePayment();
    } else toast.error(data.EM);
  };

  const fetchAllPayment = async () => {
    let data = await getAllPayment();
    if (data && data.EC === 0) {
      setPaymentList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllPayment();
  }, []);

  return (
    <div className="manage-service-container">
      <div className="title">Manage Price & Payment</div>
      <div className="service-body">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0" className="manage-payment">
            <Accordion.Header>Manage Payment Method</Accordion.Header>
            <Accordion.Body>
              <Button
                variant="primary"
                onClick={handleShowPayment}
                className="add-btn"
              >
                Add new
              </Button>

              <Modal
                show={showPayment}
                onHide={handleClosePayment}
                backdrop="static"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add New Payment Method</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreatePayment}>
                  <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicType">
                      <Form.Label>Payment Type</Form.Label>
                      <Form.Select
                        aria-label="payment type select"
                        defaultValue=""
                        isInvalid={invalidType}
                        onChange={(e) => handleChangeType(e.target.value)}
                      >
                        <option value="" disabled hidden>
                          Select payment type
                        </option>
                        <option value="COD">COD</option>
                        <option value="Online">Online</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Payment method name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter payment method name"
                        value={paymentName}
                        isInvalid={invalidName}
                        disabled={!paymentType || paymentType === "COD"}
                        onChange={(e) => handleChangeName(e.target.value)}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePayment}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Payment type</th>
                    <th>Payment method</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentList &&
                    paymentList.length > 0 &&
                    paymentList.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.payment_type}</td>
                          <td>
                            {item.method_name
                              ? item.method_name
                              : item.payment_type}
                          </td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleShowEditPayment(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="mx-2"
                              onClick={() => handleShowDeletePayment(item)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>

              <Modal
                show={showEditPayment}
                onHide={handleCloseEditPayment}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit payment info</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditPayment}>
                  <Modal.Body>
                    <Col className="mb-3">
                      <Form.Label>Payment Type</Form.Label>
                      <Form.Select
                        aria-label="payment type select"
                        defaultValue={EditPaymentType}
                        onChange={(e) => setEditPaymentType(e.target.value)}
                      >
                        <option value="COD">COD</option>
                        <option value="Online">Online</option>
                      </Form.Select>
                    </Col>

                    <Col className="mb-3">
                      <Form.Label>Payment method name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter payment method name"
                        value={EditPaymentName}
                        isInvalid={InvalidEditPaymentName}
                        disabled={EditPaymentType === "COD"}
                        onChange={(e) =>
                          handleChangeEditPaymentName(e.target.value)
                        }
                      />
                    </Col>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleCloseEditPayment}
                    >
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>

              <Modal
                show={showDeletePayment}
                onHide={handleCloseDeletePayment}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure to delete this item?
                  <br />
                  Payment type: <b>{deletePaymentItem.payment_type}</b>
                  <br />
                  Name:{" "}
                  <b>
                    {deletePaymentItem.method_name
                      ? deletePaymentItem.method_name
                      : deletePaymentItem.payment_type}
                  </b>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleCloseDeletePayment}
                  >
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleDeletePayment}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className="manage-price">
            <Accordion.Header>Manage Price</Accordion.Header>
            <Accordion.Body>
              <ManagePrice />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className="manage-package">
            <Accordion.Header>Manage Package</Accordion.Header>
            <Accordion.Body>
              <ManagePackage />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default ManageService;
