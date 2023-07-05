import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import { toast } from "react-toastify";
import { putUpdateArticle } from "../../../../service/APIservice";
import { useTranslation } from "react-i18next";

const EditArticle = (props) => {
  const { t } = useTranslation();
  const [article, setArticle] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidSource, setInvalidSource] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  const handleClose = () => {
    setInvalidDate(false);
    setInvalidLink(false);
    setInvalidSource(false);
    setInvalidTitle(false);
    setShow(false);
  };
  const handleShow = (item) => {
    let dateFormat = moment(new Date(item.date)).format("YYYY-MM-DD");
    setArticle(item);
    setTitle(item.title);
    setSource(item.source);
    setDate(dateFormat);
    setLink(item.link);
    setShow(true);
  };

  const handleChangeTitle = (value) => {
    setInvalidTitle(false);
    setTitle(value);
  };

  const handleChangeSourse = (value) => {
    setInvalidSource(false);
    setSource(value);
  };

  const handleChangeDate = (value) => {
    setInvalidDate(false);
    setDate(value);
  };

  const handleChangeLink = (value) => {
    setInvalidLink(false);
    setLink(value);
  };

  const handleEditArticle = async (e) => {
    e.preventDefault();

    if (!title) {
      setInvalidTitle(true);
      toast.error(`${t("manageNews.toast1")}`);
      return;
    }

    if (!source) {
      setInvalidSource(true);
      toast.error(`${t("manageNews.toast2")}`);
      return;
    }

    if (!date) {
      setInvalidDate(true);
      toast.error(`${t("manageNews.toast3")}`);
      return;
    }

    if (!link) {
      setInvalidLink(true);
      toast.error(`${t("manageNews.toast4")}`);
      return;
    }

    let data = await putUpdateArticle(title, source, date, link, article.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllNews();
      handleClose();
    } else toast.error(data.EM);
  };

  return (
    <>
      <span onClick={() => handleShow(props.item)}>
        <FaEdit className="mx-2" />
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("manageNews.editTitle")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditArticle}>
          <Modal.Body>
            <Col className="mb-3">
              <Form.Label>{t("manageNews.label1")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("manageNews.note1")}
                isInvalid={invalidTitle}
                value={title}
                onChange={(e) => handleChangeTitle(e.target.value)}
              />
            </Col>

            <Row className="mb-3">
              <Col>
                <Form.Label>{t("manageNews.label2")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("manageNews.note2")}
                  isInvalid={invalidSource}
                  value={source}
                  onChange={(e) => handleChangeSourse(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>{t("manageNews.label3")}</Form.Label>
                <Form.Control
                  type="date"
                  min="1975-04-30"
                  isInvalid={invalidDate}
                  value={date}
                  onChange={(e) => handleChangeDate(e.target.value)}
                />
              </Col>
            </Row>

            <Col className="mb-3">
              <Form.Label>{t("manageNews.label4")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                isInvalid={invalidLink}
                value={link}
                onChange={(e) => handleChangeLink(e.target.value)}
              />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("manageNews.closeBtn")}
            </Button>
            <Button variant="primary" type="submit">
              {t("manageNews.confirmBtn")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditArticle;
