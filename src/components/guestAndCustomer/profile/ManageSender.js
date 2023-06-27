import "./ManageSender.scss";
import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import {
  postCreateSender,
  getCustomerByAccount,
  deleteSender,
  putUpdateSender,
} from "../../../service/APIservice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";

const ManageSender = () => {
  const [show, setShow] = useState(false);
  const [senderList, setSenderList] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidAddress, setInvalidAddesss] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [invalidEditName, setInvalidEditName] = useState(false);
  const [invalidEditPhone, setInvalidEditPhone] = useState(false);
  const [invalidEditAddress, setInvalidEditAddress] = useState(false);

  const navigate = useNavigate();

  const handleShowEdit = (item) => {
    setEditItem(item);
    setEditName(item.full_name);
    setEditAddress(item.address);
    setEditPhone(item.phone_number);
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setInvalidEditAddress(false);
    setInvalidEditName(false);
    setInvalidEditPhone(false);
    setShowEdit(false);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (item) => {
    setDeleteItem(item);
    setShowDelete(true);
  };

  const account_id = useSelector((state) => state.auth.account_id);

  useEffect(() => {
    const fetchAllSender = async () => {
      let data = await getCustomerByAccount(account_id);
      if (data && data.EC === 0) {
        setSenderList(data.DT);
      }
    };

    fetchAllSender();
  }, [account_id]);

  const handleClose = () => {
    setShow(false);
    setInvalidAddesss(false);
    setInvalidName(false);
    setInvalidPhone(false);
    setSenderAddress("");
    setSenderName("");
    setSenderPhone("");
  };
  const handleShow = () => setShow(true);

  const handleChangeName = (value) => {
    setSenderName(value);
    setInvalidName(false);
  };

  const handleChangePhone = (value) => {
    setSenderPhone(value);
    setInvalidPhone(false);
  };

  const handleChangeAddress = (value) => {
    setSenderAddress(value);
    setInvalidAddesss(false);
  };

  const handleAddSender = async (e) => {
    e.preventDefault();

    if (!senderName) {
      toast.error("Please fill in your name.");
      setInvalidName(true);
      return;
    }

    if (!senderPhone) {
      toast.error("Please fill in your phone.");
      setInvalidPhone(true);
      return;
    }

    if (!senderAddress) {
      toast.error("Please fill in your address.");
      setInvalidAddesss(true);
      return;
    }

    let data = await postCreateSender(
      account_id,
      senderName,
      senderAddress,
      senderPhone
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
    } else toast.error(data.EM);
  };

  const handleDeleteSender = async () => {
    let data = await deleteSender(deleteItem.customer_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      let dataNew = await getCustomerByAccount(account_id);
      if (dataNew && dataNew.EC === 0) {
        setSenderList(dataNew.DT);
      }
      handleCloseDelete();
    } else toast.error(data.EM);
  };

  const handleChangeEditName = (value) => {
    setEditName(value);
    setInvalidEditName(false);
  };

  const handleChangeEditPhone = (value) => {
    setEditPhone(value);
    setInvalidEditPhone(false);
  };

  const handleChangeEditAddress = (value) => {
    setEditAddress(value);
    setInvalidEditAddress(false);
  };

  const handleEditSender = async (e) => {
    e.preventDefault();

    if (!editName) {
      toast.error("Please fill in your name.");
      setInvalidEditName(true);
      return;
    }

    if (!editPhone) {
      toast.error("Please fill in your phone.");
      setInvalidEditPhone(true);
      return;
    }

    if (!editAddress) {
      toast.error("Please fill in your address.");
      setInvalidEditAddress(true);
      return;
    }

    let data = await putUpdateSender(
      editItem.customer_id,
      editName,
      editAddress,
      editPhone
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      let dataNew = await getCustomerByAccount(account_id);
      if (dataNew && dataNew.EC === 0) {
        setSenderList(dataNew.DT);
      }
      handleCloseEdit();
    } else toast.error(data.EM);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete this
    </Tooltip>
  );

  const renderTooltipEdit = (props) => (
    <Tooltip id="edit-tooltip" {...props}>
      Edit this
    </Tooltip>
  );

  return (
    <Container className="sender-outer">
      <div className="manage-sender-container">
        <div className="header">Manage Sender</div>
        <Button variant="success" onClick={handleShow}>
          Add New
        </Button>

        <div className="sender-list">
          {senderList &&
            senderList.length > 0 &&
            senderList.map((item) => {
              return (
                <Card
                  style={{ width: "40%" }}
                  className="mb-5"
                  key={item.customer_id}
                >
                  <Card.Header>
                    {item.full_name}

                    <div className="btn-group">
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipEdit}
                      >
                        <span>
                          <FaEdit
                            className="mx-3"
                            onClick={() => handleShowEdit(item)}
                          />
                        </span>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <span onClick={() => handleShowDelete(item)}>
                          <AiFillDelete />
                        </span>
                      </OverlayTrigger>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="mb-3">Sender Info</Card.Title>

                    <div className="mb-2">
                      <BsFillTelephoneInboundFill /> {item.phone_number}
                    </div>
                    <div>
                      <HiLocationMarker /> {item.address}
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddSender}>
            <Modal.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    value={senderName}
                    isInvalid={invalidName}
                    onChange={(e) => handleChangeName(e.target.value)}
                  />
                </Col>

                <Col>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ex: 0928226767"
                    pattern="[0][0-9]{9}"
                    value={senderPhone}
                    isInvalid={invalidPhone}
                    onChange={(e) => handleChangePhone(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your address"
                    value={senderAddress}
                    isInvalid={invalidAddress}
                    onChange={(e) => handleChangeAddress(e.target.value)}
                  />
                </Col>
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
            Are you sure to remove this sender? <br />
            Name: <b>{deleteItem.full_name}</b> <br />
            Address: <b>{deleteItem.address}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteSender}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showEdit}
          onHide={handleCloseEdit}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Sender Info</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditSender}>
            <Modal.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    value={editName}
                    isInvalid={invalidEditName}
                    onChange={(e) => handleChangeEditName(e.target.value)}
                  />
                </Col>

                <Col>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ex: 0928226767"
                    pattern="[0][0-9]{9}"
                    value={editPhone}
                    isInvalid={invalidEditPhone}
                    onChange={(e) => handleChangeEditPhone(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your address"
                    value={editAddress}
                    isInvalid={invalidEditAddress}
                    onChange={(e) => handleChangeEditAddress(e.target.value)}
                  />
                </Col>
              </Row>
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

        <div className="back-button">
          <Button variant="success" onClick={() => navigate("/account-detail")}>
            Back to Profile
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ManageSender;
