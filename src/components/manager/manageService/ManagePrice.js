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

const ManagePrice = () => {
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
        toast.error("Please specify min distance.");
        setInvalidAddMin(true);
        return;
      }
    }

    if (addMax) {
      if (addMin >= addMax) {
        toast.error("Max distance must be larger than min distance.");
        setInvalidAddMax(true);
        return;
      }
    }

    if (!addInitCost) {
      toast.error("Please specify initial cost.");
      setInvalidAddInit(true);
      return;
    }

    if (!addAdditional) {
      toast.error("Please specify additional bird cost.");
      setInvalidAddAdditional(true);
      return;
    }

    if (!addUnitCost) {
      toast.error("Please specify unit cost.");
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
        toast.error("Please specify min distance.");
        setInvalidEditMin(true);
        return;
      }
    }

    if (editMax) {
      if (editMin >= editMax) {
        toast.error("Max distance must be larger than min distance.");
        setInvalidEditMax(true);
        return;
      }
    }

    if (!editInitCost) {
      toast.error("Please specify initial cost.");
      setInvalidEditInit(true);
      return;
    }

    if (!editAdditional) {
      toast.error("Please specify additional bird cost.");
      setInvalidEditAdditional(true);
      return;
    }

    if (!editUnitCost) {
      toast.error("Please specify unit cost.");
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
        Add new
      </Button>

      <Modal
        show={showPrice}
        onHide={handleClosePrice}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Price</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddPrice}>
          <Modal.Body>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicMin" as={Col}>
                <Form.Label>Min Distance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter min distance in Kilometer"
                  min="0"
                  isInvalid={invalidAddMin}
                  value={addMin}
                  onChange={(e) => handleChangeAddMin(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMax" as={Col}>
                <Form.Label>Max Distance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter max distance in Kilometer"
                  min="0"
                  isInvalid={invalidAddMax}
                  value={addMax}
                  onChange={(e) => handleChangeAddMax(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicCost">
              <Form.Label>Initial Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cost in VND"
                min="0"
                isInvalid={invalidAddInit}
                value={addInitCost}
                onChange={(e) => handleChangeAddInit(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Label>Additional Bird Cost</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cost in VND"
                  min="0"
                  isInvalid={invalidAddAdditional}
                  value={addAdditional}
                  onChange={(e) => handleChangeAddAdditional(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>Unit Cost</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cost in VND"
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
            <th>Distance</th>
            <th>Initial Cost</th>
            <th>Each Additional Bird Cost</th>
            <th>Cost/Capacity unit</th>
            <th>Actions</th>
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

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Price</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditPrice}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>Min Distance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter min distance in Kilometer"
                  min="0"
                  isInvalid={invalidEditMin}
                  value={editMin}
                  onChange={(e) => handleChangeEditMin(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>Max Distance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter max distance in Kilometer"
                  min="0"
                  isInvalid={invalidEditMax}
                  value={editMax}
                  onChange={(e) => handleChangeEditMax(e.target.value)}
                />
              </Col>
            </Row>

            <Col className="mb-3">
              <Form.Label>Initial Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cost in VND"
                min="0"
                isInvalid={invalidEditInit}
                value={editInitCost}
                onChange={(e) => handleChangeEditInit(e.target.value)}
              />
            </Col>

            <Row className="mb-3">
              <Col>
                <Form.Label>Additional Bird Cost</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cost in VND"
                  min="0"
                  isInvalid={invalidEditAdditional}
                  value={editAdditional}
                  onChange={(e) => handleChangeEditAdditional(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>Unit Cost</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cost in VND"
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
          Are you sure to delete this item?
          <br />
          Distance:{" "}
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
          Initial Cost:{" "}
          <b>{new Intl.NumberFormat().format(deleteItem.initial_cost)} VND</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletePrice}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManagePrice;
