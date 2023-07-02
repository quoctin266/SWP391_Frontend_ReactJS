import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { deleteArticle } from "../../../../service/APIservice";

const DeleteArticle = (props) => {
  const [show, setShow] = useState(false);
  const [article, setArticle] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (item) => {
    setArticle(item);
    setShow(true);
  };

  const handleDeleteArticle = async () => {
    let data = await deleteArticle(article.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllNews();
      handleClose();
    } else toast.error(data.EM);
  };
  return (
    <>
      <span onClick={() => handleShow(props.item)}>
        <AiFillDelete />
      </span>

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
          Are you sure to delete this article? <br />
          Title: <b>{article.title}</b>
          <br />
          Author: <b>{article.source}</b>
          <br />
          Date: <b>{article.date}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteArticle}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteArticle;
