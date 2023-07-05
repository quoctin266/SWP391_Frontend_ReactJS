import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { FcCheckmark } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  postCreatePackage,
  getAllPackage,
  putUpdatePackage,
  deletePackage,
} from "../../../service/APIservice";
import { useTranslation } from "react-i18next";

const ManagePackage = () => {
  const { t } = useTranslation();
  const [packageList, setPackageList] = useState([]);
  const [showPackage, setShowPackage] = useState(false);
  const [addName, setAddName] = useState("");
  const [addType, setAddType] = useState("");
  const [addHealth, setAddHealth] = useState("");
  const [addPickup, setAddPickup] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [invalidAddName, setInvalidAddName] = useState(false);
  const [invalidAddType, setInvalidAddType] = useState(false);
  const [invalidAddHealth, setInvalidAddHealth] = useState(false);
  const [invalidAddPickup, setInvalidAddPickup] = useState(false);
  const [invalidAddPrice, setInvalidAddPrice] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editHealth, setEditHealth] = useState("");
  const [editPickup, setEditPickup] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [invalidEditName, setInvalidEditName] = useState(false);
  const [invalidEditPrice, setInvalidEditPrice] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const fetchAllPackage = async () => {
    let data = await getAllPackage();
    if (data && data.EC === 0) {
      setPackageList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllPackage();
  }, []);

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (item) => {
    setDeleteItem(item);
    setShowDelete(true);
  };

  const handleCloseEdit = () => {
    setInvalidEditName(false);
    setInvalidEditPrice(false);
    setShowEdit(false);
  };
  const handleShowEdit = (item) => {
    setEditItem(item);
    setEditName(item.package_name);
    setEditType(item.food_type);
    setEditHealth(item.healthcare);
    setEditPickup(item.home_pickup);
    setEditPrice(item.price);
    setShowEdit(true);
  };

  const handleClosePackage = () => {
    setAddHealth("");
    setAddName("");
    setAddPickup("");
    setAddPrice("");
    setAddType("");
    setInvalidAddHealth(false);
    setInvalidAddName(false);
    setInvalidAddPickup(false);
    setInvalidAddPrice(false);
    setInvalidAddType(false);
    setShowPackage(false);
  };
  const handleShowPackage = () => setShowPackage(true);

  const handleChangeAddName = (value) => {
    setInvalidAddName(false);
    setAddName(value);
  };

  const handleChangeAddType = (value) => {
    setInvalidAddType(false);
    setAddType(value);
  };

  const handleChangeAddHealth = (value) => {
    setInvalidAddHealth(false);
    setAddHealth(value);
  };

  const handleChangeAddPickup = (value) => {
    setInvalidAddPickup(false);
    setAddPickup(value);
  };

  const handleChangeAddPrice = (value) => {
    setInvalidAddPrice(false);
    setAddPrice(value);
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();

    if (!addName) {
      setInvalidAddName(true);
      toast.error(`${t("managePackage.toast1")}`);
      return;
    }

    if (!addType) {
      setInvalidAddType(true);
      toast.error(`${t("managePackage.toast2")}`);
      return;
    }

    if (!addHealth) {
      setInvalidAddHealth(true);
      toast.error(`${t("managePackage.toast3")}`);
      return;
    }

    if (!addPickup) {
      setInvalidAddPickup(true);
      toast.error(`${t("managePackage.toast4")}`);
      return;
    }

    if (!addPrice || +addPrice === 0) {
      setInvalidAddPrice(true);
      toast.error(`${t("managePackage.toast5")}`);
      return;
    }

    let data = await postCreatePackage(
      addName,
      addType,
      addHealth,
      addPickup,
      addPrice
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllPackage();
      handleClosePackage();
    } else toast.error(data.EM);
  };

  const handleChangeEditName = (value) => {
    setInvalidEditName(false);
    setEditName(value);
  };

  const handleChangeEditType = (value) => {
    setEditType(value);
  };

  const handleChangeEditHealth = (value) => {
    setEditHealth(value);
  };

  const handleChangeEditPickup = (value) => {
    setEditPickup(value);
  };

  const handleChangeEditPrice = (value) => {
    setInvalidEditPrice(false);
    setEditPrice(value);
  };

  const handleEditPackage = async (e) => {
    e.preventDefault();

    if (!editName) {
      setInvalidEditName(true);
      toast.error(`${t("managePackage.toast1")}`);
      return;
    }

    if (!editPrice || +editPrice === 0) {
      setInvalidEditPrice(true);
      toast.error(`${t("managePackage.toast5")}`);
      return;
    }

    let data = await putUpdatePackage(
      editName,
      editType,
      editHealth,
      editPickup,
      editPrice,
      editItem.package_id
    );
    if (data.EC === 0) {
      toast.success(data.EM);
      fetchAllPackage();
      handleCloseEdit();
    } else toast.error(data.EM);
  };

  const handleDeletePrice = async () => {
    let data = await deletePackage(deleteItem.package_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllPackage();
      handleCloseDelete();
    } else toast.error(data.EM);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowPackage} className="add-btn">
        {t("managePackage.addBtn")}
      </Button>

      <Modal
        show={showPackage}
        onHide={handleClosePackage}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("managePackage.addTitle")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddPackage}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePackage.label1")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("managePackage.note1")}
                  isInvalid={invalidAddName}
                  value={addName}
                  onChange={(e) => handleChangeAddName(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>{t("managePackage.label2")}</Form.Label>
                <Form.Select
                  aria-label="food type select"
                  defaultValue=""
                  isInvalid={invalidAddType}
                  onChange={(e) => handleChangeAddType(e.target.value)}
                >
                  <option value="" disabled hidden>
                    {t("managePackage.note2")}
                  </option>
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePackage.label3")}</Form.Label>
                <Form.Select
                  aria-label="healthcare select"
                  defaultValue=""
                  isInvalid={invalidAddHealth}
                  onChange={(e) => handleChangeAddHealth(e.target.value)}
                >
                  <option value="" disabled hidden>
                    {t("managePackage.note3")}
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
              </Col>

              <Col>
                <Form.Label>{t("managePackage.label4")}</Form.Label>
                <Form.Select
                  aria-label="pick up select"
                  defaultValue=""
                  isInvalid={invalidAddPickup}
                  onChange={(e) => handleChangeAddPickup(e.target.value)}
                >
                  <option value="" disabled hidden>
                    {t("managePackage.note4")}
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePackage.label5")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePackage.note5")}
                  min="0"
                  isInvalid={invalidAddPrice}
                  value={addPrice}
                  onChange={(e) => handleChangeAddPrice(e.target.value)}
                />
              </Col>

              <Col></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePackage}>
              {t("managePackage.closeBtn")}
            </Button>
            <Button variant="primary" type="submit">
              {t("managePackage.confirmBtn")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t("managePackage.field1")}</th>
            <th>{t("managePackage.field2")}</th>
            <th>{t("managePackage.field3")}</th>
            <th>{t("managePackage.field4")}</th>
            <th>{t("managePackage.field5")}</th>
            <th>{t("managePackage.field6")}</th>
          </tr>
        </thead>
        <tbody>
          {packageList &&
            packageList.length > 0 &&
            packageList.map((item) => {
              return (
                <tr key={item.package_id}>
                  <td>{item.package_name}</td>
                  <td>{item.food_type}</td>
                  <td>{item.healthcare ? <FcCheckmark /> : ""}</td>
                  <td>{item.home_pickup ? <FcCheckmark /> : ""}</td>
                  <td>{new Intl.NumberFormat().format(item.price)} VND</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowEdit(item)}
                    >
                      {t("managePackage.editBtn")}
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => handleShowDelete(item)}
                    >
                      {t("managePackage.deleteBtn")}
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("managePackage.editTitle")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditPackage}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePackage.label1")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("managePackage.note1")}
                  isInvalid={invalidEditName}
                  value={editName}
                  onChange={(e) => handleChangeEditName(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>{t("managePackage.label2")}</Form.Label>
                <Form.Select
                  aria-label="food type select"
                  defaultValue={editType}
                  onChange={(e) => handleChangeEditType(e.target.value)}
                >
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePackage.label3")}</Form.Label>
                <Form.Select
                  aria-label="healthcare select"
                  defaultValue={editHealth}
                  onChange={(e) => handleChangeEditHealth(e.target.value)}
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </Form.Select>
              </Col>

              <Col>
                <Form.Label>{t("managePackage.label4")}</Form.Label>
                <Form.Select
                  aria-label="pick up select"
                  defaultValue={editPickup}
                  onChange={(e) => handleChangeEditPickup(e.target.value)}
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePackage.label5")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePackage.note5")}
                  min="0"
                  isInvalid={invalidEditPrice}
                  value={editPrice}
                  onChange={(e) => handleChangeEditPrice(e.target.value)}
                />
              </Col>

              <Col></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              {t("managePackage.closeBtn")}
            </Button>
            <Button variant="primary" type="submit">
              {t("managePackage.confirmBtn")}
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
          <Modal.Title>{t("managePackage.deleteTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("managePackage.deleteNote")}
          <br />
          {t("managePackage.info1")} <b>{deleteItem.package_name}</b>
          <br />
          {t("managePackage.info2")}{" "}
          <b>{new Intl.NumberFormat().format(deleteItem.price)} VND</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            {t("managePackage.closeBtn")}
          </Button>
          <Button variant="primary" onClick={handleDeletePrice}>
            {t("managePackage.confirmBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManagePackage;
