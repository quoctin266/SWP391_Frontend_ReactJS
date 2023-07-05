import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import {
  getPricing,
  postCreatePrice,
  putUpdatePrice,
  deletePrice,
} from "../../../service/APIservice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ManagePrice = () => {
  const { t } = useTranslation();
  const [showPrice, setShowPrice] = useState(false);
  const [priceList, setPriceList] = useState([]);
  const [addMin, setAddMin] = useState("");
  const [addMax, setAddMax] = useState("");
  const [addInitCost, setAddInitCost] = useState("");
  const [addAdditional, setAddAdditional] = useState("");
  const [addUnitCost, setAddUnitCost] = useState("");
  const [invalidAddMin, setInvalidAddMin] = useState(false);
  const [invalidAddMax, setInvalidAddMax] = useState(false);
  const [invalidAddInit, setInvalidAddInit] = useState(false);
  const [invalidAddAdditional, setInvalidAddAdditional] = useState(false);
  const [invalidAddUnit, setInvalidAddUnit] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editMin, setEditMin] = useState("");
  const [editMax, setEditMax] = useState("");
  const [editInitCost, setEditInitCost] = useState("");
  const [editAdditional, setEditAdditional] = useState("");
  const [editUnitCost, setEditUnitCost] = useState("");
  const [invalidEditMin, setInvalidEditMin] = useState(false);
  const [invalidEditMax, setInvalidEditMax] = useState(false);
  const [invalidEditInit, setInvalidEditInit] = useState(false);
  const [invalidEditAdditional, setInvalidEditAdditional] = useState(false);
  const [invalidEditUnit, setInvalidEditUnit] = useState(false);
  const [editItem, setEditItem] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const fetchPricing = async () => {
    let data = await getPricing();
    if (data && data.EC === 0) {
      setPriceList(data.DT);
    }
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (item) => {
    setDeleteItem(item);
    setShowDelete(true);
  };

  const handleCloseEdit = () => {
    setInvalidEditAdditional(false);
    setInvalidEditInit(false);
    setInvalidEditMax(false);
    setInvalidEditMin(false);
    setInvalidEditUnit(false);
    setShowEdit(false);
  };
  const handleShowEdit = (item) => {
    setEditItem(item);
    setEditAdditional(item.additional_bird_cost);
    setEditInitCost(item.initial_cost);
    setEditMax(item.max_distance ? item.max_distance : "");
    setEditMin(item.min_distance);
    setEditUnitCost(item.unit_cost);
    setShowEdit(true);
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleClosePrice = () => {
    setAddAdditional("");
    setAddInitCost("");
    setAddMax("");
    setAddMin("");
    setAddUnitCost("");
    setInvalidAddAdditional(false);
    setInvalidAddInit(false);
    setInvalidAddMax(false);
    setInvalidAddMin(false);
    setInvalidAddUnit(false);
    setShowPrice(false);
  };
  const handleShowPrice = () => setShowPrice(true);

  const handleChangeAddMin = (value) => {
    setInvalidAddMin(false);
    setAddMin(value);
  };

  const handleChangeAddMax = (value) => {
    setInvalidAddMax(false);
    setAddMax(value);
  };

  const handleChangeAddInit = (value) => {
    setInvalidAddInit(false);
    setAddInitCost(value);
  };

  const handleChangeAddAdditional = (value) => {
    setInvalidAddAdditional(false);
    setAddAdditional(value);
  };

  const handleChangeAddUnit = (value) => {
    setInvalidAddUnit(false);
    setAddUnitCost(value);
  };

  const handleAddPrice = async (e) => {
    e.preventDefault();

    if (addMin !== 0) {
      if (!addMin) {
        toast.error(`${t("managePrice.toast1")}`);
        setInvalidAddMin(true);
        return;
      }
    }

    if (addMax) {
      if (addMin >= addMax) {
        toast.error(`${t("managePrice.toast2")}`);
        setInvalidAddMax(true);
        return;
      }
    }

    if (!addInitCost) {
      toast.error(`${t("managePrice.toast3")}`);
      setInvalidAddInit(true);
      return;
    }

    if (!addAdditional) {
      toast.error(`${t("managePrice.toast4")}`);
      setInvalidAddAdditional(true);
      return;
    }

    if (!addUnitCost) {
      toast.error(`${t("managePrice.toast5")}`);
      setInvalidAddUnit(true);
      return;
    }

    let data = await postCreatePrice(
      addMin,
      addMax,
      addInitCost,
      addAdditional,
      addUnitCost
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchPricing();
      handleClosePrice();
    } else toast.error(data.EM);
  };

  const handleChangeEditMin = (value) => {
    setInvalidEditMin(false);
    setEditMin(value);
  };

  const handleChangeEditMax = (value) => {
    setInvalidEditMax(false);
    setEditMax(value);
  };

  const handleChangeEditInit = (value) => {
    setInvalidEditInit(false);
    setEditInitCost(value);
  };

  const handleChangeEditAdditional = (value) => {
    setInvalidEditAdditional(false);
    setEditAdditional(value);
  };

  const handleChangeEditUnit = (value) => {
    setInvalidEditUnit(false);
    setEditUnitCost(value);
  };

  const handleEditPrice = async (e) => {
    e.preventDefault();

    if (editMin !== 0) {
      if (!editMin) {
        toast.error(`${t("managePrice.toast1")}`);
        setInvalidEditMin(true);
        return;
      }
    }

    if (editMax) {
      if (editMin >= editMax) {
        toast.error(`${t("managePrice.toast2")}`);
        setInvalidEditMax(true);
        return;
      }
    }

    if (!editInitCost) {
      toast.error(`${t("managePrice.toast3")}`);
      setInvalidEditInit(true);
      return;
    }

    if (!editAdditional) {
      toast.error(`${t("managePrice.toast4")}`);
      setInvalidEditAdditional(true);
      return;
    }

    if (!editUnitCost) {
      toast.error(`${t("managePrice.toast5")}`);
      setInvalidEditUnit(true);
      return;
    }

    let data = await putUpdatePrice(
      editMin,
      editMax,
      editInitCost,
      editAdditional,
      editUnitCost,
      editItem.id
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleCloseEdit();
      fetchPricing();
    } else toast.error(data.EM);
  };

  const handleDeletePrice = async () => {
    let data = await deletePrice(deleteItem.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchPricing();
      handleCloseDelete();
    } else toast.error(data.EM);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowPrice} className="add-btn">
        {t("managePrice.addBtn")}
      </Button>

      <Modal
        show={showPrice}
        onHide={handleClosePrice}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("managePrice.addTitle")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddPrice}>
          <Modal.Body>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicMin" as={Col}>
                <Form.Label>{t("managePrice.label1")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePrice.note1")}
                  min="0"
                  isInvalid={invalidAddMin}
                  value={addMin}
                  onChange={(e) => handleChangeAddMin(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMax" as={Col}>
                <Form.Label>{t("managePrice.label2")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePrice.note2")}
                  min="0"
                  isInvalid={invalidAddMax}
                  value={addMax}
                  onChange={(e) => handleChangeAddMax(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicCost">
              <Form.Label>{t("managePrice.label3")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("managePrice.note3")}
                min="0"
                isInvalid={invalidAddInit}
                value={addInitCost}
                onChange={(e) => handleChangeAddInit(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePrice.label4")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePrice.note3")}
                  min="0"
                  isInvalid={invalidAddAdditional}
                  value={addAdditional}
                  onChange={(e) => handleChangeAddAdditional(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>{t("managePrice.label5")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePrice.note3")}
                  min="0"
                  isInvalid={invalidAddUnit}
                  value={addUnitCost}
                  onChange={(e) => handleChangeAddUnit(e.target.value)}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePrice}>
              {t("managePrice.closeBtn")}
            </Button>
            <Button variant="primary" type="submit">
              {t("managePrice.confirmBtn")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t("managePrice.field1")}</th>
            <th>{t("managePrice.field2")}</th>
            <th>{t("managePrice.field3")}</th>
            <th>{t("managePrice.field4")}</th>
            <th>{t("managePrice.field5")}</th>
          </tr>
        </thead>
        <tbody>
          {priceList &&
            priceList.length > 0 &&
            priceList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    {item.max_distance
                      ? `${new Intl.NumberFormat().format(
                          item.min_distance
                        )} - ${new Intl.NumberFormat().format(
                          item.max_distance
                        )}`
                      : `From ${new Intl.NumberFormat().format(
                          item.min_distance
                        )}`}{" "}
                    Km
                  </td>
                  <td>
                    {new Intl.NumberFormat().format(item.initial_cost)} VND
                  </td>
                  <td>
                    {new Intl.NumberFormat().format(item.additional_bird_cost)}{" "}
                    VND
                  </td>
                  <td>{new Intl.NumberFormat().format(item.unit_cost)} VND</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowEdit(item)}
                    >
                      {t("managePrice.editBtn")}
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => handleShowDelete(item)}
                    >
                      {t("managePrice.deleteBtn")}
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
          <Modal.Title>{t("managePrice.editTitle")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditPrice}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePrice.label1")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePrice.note1")}
                  min="0"
                  isInvalid={invalidEditMin}
                  value={editMin}
                  onChange={(e) => handleChangeEditMin(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>{t("managePrice.label2")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePrice.note2")}
                  min="0"
                  isInvalid={invalidEditMax}
                  value={editMax}
                  onChange={(e) => handleChangeEditMax(e.target.value)}
                />
              </Col>
            </Row>

            <Col className="mb-3">
              <Form.Label>{t("managePrice.label3")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("managePrice.note3")}
                min="0"
                isInvalid={invalidEditInit}
                value={editInitCost}
                onChange={(e) => handleChangeEditInit(e.target.value)}
              />
            </Col>

            <Row className="mb-3">
              <Col>
                <Form.Label>{t("managePrice.label4")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePrice.note3")}
                  min="0"
                  isInvalid={invalidEditAdditional}
                  value={editAdditional}
                  onChange={(e) => handleChangeEditAdditional(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>{t("managePrice.label5")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("managePrice.note3")}
                  min="0"
                  isInvalid={invalidEditUnit}
                  value={editUnitCost}
                  onChange={(e) => handleChangeEditUnit(e.target.value)}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              {t("managePrice.closeBtn")}
            </Button>
            <Button variant="primary" type="submit">
              {t("managePrice.confirmBtn")}
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
          <Modal.Title>{t("managePrice.deleteTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("managePrice.deleteNote")}
          <br />
          {t("managePrice.info1")}{" "}
          <b>
            {deleteItem.max_distance
              ? `${new Intl.NumberFormat().format(
                  deleteItem.min_distance
                )} - ${new Intl.NumberFormat().format(deleteItem.max_distance)}`
              : `From ${new Intl.NumberFormat().format(
                  deleteItem.min_distance
                )}`}{" "}
            Km
          </b>
          <br />
          {t("managePrice.info2")}{" "}
          <b>{new Intl.NumberFormat().format(deleteItem.initial_cost)} VND</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            {t("managePrice.closeBtn")}
          </Button>
          <Button variant="primary" onClick={handleDeletePrice}>
            {t("managePrice.confirmBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManagePrice;
