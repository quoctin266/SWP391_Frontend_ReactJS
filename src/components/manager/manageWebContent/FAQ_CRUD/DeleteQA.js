import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQA } from "../../../../service/APIservice";
import { useTranslation } from "react-i18next";

const DeleteQA = (props) => {
  const { t } = useTranslation();
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
        {t("manageFAQ.deleteBtn")}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("manageFAQ.deleteTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("manageFAQ.deleteNote")} <br />
          {t("manageFAQ.info")} <b>{QA.question}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("manageFAQ.closeBtn")}
          </Button>
          <Button variant="primary" onClick={handleDeleteQA}>
            {t("manageFAQ.confirmBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteQA;
