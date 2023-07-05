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
import { useTranslation } from "react-i18next";

const ManageService = () => {
  const { t } = useTranslation();
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
    setEditPayementName(item.method_name ? item.method_name : "");
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
      toast.error(`${t("manageService.toast1")}`);
      setInvalidType(true);
      return;
    }

    if (!paymentName) {
      toast.error(`${t("manageService.toast2")}`);
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
      toast.error(`${t("manageService.toast2")}`);
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
      <div className="title">{t("manageService.header")}</div>
      <div className="service-body">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0" className="manage-payment">
            <Accordion.Header>{t("manageService.title1")}</Accordion.Header>
            <Accordion.Body>
              <Button
                variant="primary"
                onClick={handleShowPayment}
                className="add-btn"
              >
                {t("manageService.addBtn")}
              </Button>

              <Modal
                show={showPayment}
                onHide={handleClosePayment}
                backdrop="static"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{t("manageService.addTitle")}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreatePayment}>
                  <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicType">
                      <Form.Label>{t("manageService.label3")}</Form.Label>
                      <Form.Select
                        aria-label="payment type select"
                        defaultValue=""
                        isInvalid={invalidType}
                        onChange={(e) => handleChangeType(e.target.value)}
                      >
                        <option value="" disabled hidden>
                          {t("manageService.note1")}
                        </option>
                        <option value="COD">COD</option>
                        <option value="Online">Online</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>{t("manageService.label4")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("manageService.note2")}
                        value={paymentName}
                        isInvalid={invalidName}
                        disabled={!paymentType || paymentType === "COD"}
                        onChange={(e) => handleChangeName(e.target.value)}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePayment}>
                      {t("manageService.closeBtn")}
                    </Button>
                    <Button variant="primary" type="submit">
                      {t("manageService.confirmBtn")}
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{t("manageService.field1")}</th>
                    <th>{t("manageService.field2")}</th>
                    <th>{t("manageService.field3")}</th>
                    <th>{t("manageService.field4")}</th>
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
                              {t("manageService.editBtn")}
                            </Button>
                            <Button
                              variant="danger"
                              className="mx-2"
                              onClick={() => handleShowDeletePayment(item)}
                            >
                              {t("manageService.deleteBtn")}
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
                  <Modal.Title>{t("manageService.editTitle")}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditPayment}>
                  <Modal.Body>
                    <Col className="mb-3">
                      <Form.Label>{t("manageService.label1")}</Form.Label>
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
                      <Form.Label>{t("manageService.label2")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("manageService.note2")}
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
                      {t("manageService.closeBtn")}
                    </Button>
                    <Button variant="primary" type="submit">
                      {t("manageService.confirmBtn")}
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
                  <Modal.Title>{t("manageService.deleteTitle")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {t("manageService.deleteNote")}
                  <br />
                  {t("manageService.info1")}{" "}
                  <b>{deletePaymentItem.payment_type}</b>
                  <br />
                  {t("manageService.info2")}{" "}
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
                    {t("manageService.closeBtn")}
                  </Button>
                  <Button variant="primary" onClick={handleDeletePayment}>
                    {t("manageService.confirmBtn")}
                  </Button>
                </Modal.Footer>
              </Modal>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className="manage-price">
            <Accordion.Header>{t("manageService.title2")}</Accordion.Header>
            <Accordion.Body>
              <ManagePrice />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className="manage-package">
            <Accordion.Header>{t("manageService.title3")}</Accordion.Header>
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
