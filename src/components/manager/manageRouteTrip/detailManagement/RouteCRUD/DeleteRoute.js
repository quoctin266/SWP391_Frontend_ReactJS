import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteRoute } from "../../../../../service/APIservice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const DeleteRoute = (props) => {
  const { t } = useTranslation();
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
        {t("manageRoute.deleteBtn")}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("manageRoute.deleteTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("manageRoute.deleteNote")} <br />
          {t("manageRoute.info1")} <b>{route.departure}</b> <br />
          {t("manageRoute.info2")} <b>{route.destination}</b> <br />
          {t("manageRoute.info3")} <b>{route.description}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("manageRoute.closeBtn")}
          </Button>
          <Button variant="primary" onClick={handleDeleteRoute}>
            {t("manageRoute.confirmBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteRoute;
