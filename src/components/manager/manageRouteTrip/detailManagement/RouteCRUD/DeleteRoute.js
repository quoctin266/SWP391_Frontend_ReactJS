import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteRoute } from "../../../../../service/APIservice";
import { toast } from "react-toastify";

const DeleteRoute = (props) => {
  const [show, setShow] = useState(false);

  const { route } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteRoute = async () => {
    let data = await deleteRoute(route.route_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllRoute();
      handleClose();
    } else toast.error(data.EM);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this route? <br />
          Departure: <b>{route.departure}</b> <br />
          Destination: <b>{route.destination}</b> <br />
          Detail: <b>{route.description}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteRoute}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteRoute;
