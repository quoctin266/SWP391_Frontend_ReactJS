import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQA } from "../../../../service/APIservice";

const DeleteQA = (props) => {
  const [show, setShow] = useState(false);
  const [QA, setQA] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (item) => {
    setQA(item);
    setShow(true);
  };

  const handleDeleteQA = async () => {
    let data = await deleteQA(QA.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllFAQ();
      handleClose();
    } else toast.error(data.EM);
  };

  return (
    <>
      <Button variant="danger" onClick={() => handleShow(props.item)}>
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
          Are you sure to delete this question? <br />
          Title: <b>{QA.question}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteQA}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteQA;
