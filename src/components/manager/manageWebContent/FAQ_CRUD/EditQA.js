import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { putUpdateQA } from "../../../../service/APIservice";
import { useTranslation } from "react-i18next";

const EditQA = (props) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [QA, setQA] = useState("");
  const [invalidQuestion, setInvalidQuestion] = useState(false);
  const [invalidAnswer, setInvalidAnswer] = useState(false);

  const handleClose = () => {
    setInvalidAnswer(false);
    setInvalidQuestion(false);
    setShow(false);
  };
  const handleShow = (item) => {
    setQA(item);
    setQuestion(item.question);
    setAnswer(item.answer);
    setShow(true);
  };

  const handleChangeQuestion = (value) => {
    setInvalidQuestion(false);
    setQuestion(value);
  };

  const handleChangeAnswer = (value) => {
    setInvalidAnswer(false);
    setAnswer(value);
  };

  const handleEditQA = async (e) => {
    e.preventDefault();

    if (question.length < 20) {
      setInvalidQuestion(true);
      toast.error(`${t("manageFAQ.toast1")}`);
      return;
    }

    if (answer.length < 10) {
      setInvalidAnswer(true);
      toast.error(`${t("manageFAQ.toast2")}`);
      return;
    }

    let data = await putUpdateQA(question, answer, QA.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllFAQ();
      handleClose();
    } else toast.error(data.EM);
  };

  return (
    <>
      <Button
        variant="warning"
        className="mx-2"
        onClick={() => handleShow(props.item)}
      >
        {t("manageFAQ.editBtn")}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("manageFAQ.editTitle")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditQA}>
          <Modal.Body>
            <Col className="mb-3">
              <Form.Label>{t("manageFAQ.label1")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("manageFAQ.note1")}
                isInvalid={invalidQuestion}
                value={question}
                onChange={(e) => handleChangeQuestion(e.target.value)}
              />
            </Col>

            <Col className="mb-3">
              <Form.Label>{t("manageFAQ.label2")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                isInvalid={invalidAnswer}
                value={answer}
                onChange={(e) => handleChangeAnswer(e.target.value)}
              />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("manageFAQ.closeBtn")}
            </Button>
            <Button variant="primary" type="submit">
              {t("manageFAQ.confirmBtn")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditQA;
