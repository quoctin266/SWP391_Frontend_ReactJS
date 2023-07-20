import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { deleteArticle } from "../../../../service/APIservice";
import { useTranslation } from "react-i18next";

const DeleteArticle = (props) => {
  const { t } = useTranslation();
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
          <Modal.Title>{t("manageNews.deleteTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("manageNews.deleteNote")} <br />
          {t("manageNews.info1")} <b>{article.title}</b>
          <br />
          {t("manageNews.info2")} <b>{article.sub_title}</b>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("manageNews.closeBtn")}
          </Button>
          <Button variant="primary" onClick={handleDeleteArticle}>
            {t("manageNews.confirmBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteArticle;
