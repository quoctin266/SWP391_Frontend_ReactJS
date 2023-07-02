import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { putUpdateQA } from "../../../../service/APIservice";

const EditQA = (props) => {
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
      toast.error("Must be at least 20 characters.");
      return;
    }

    if (answer.length < 10) {
      setInvalidAnswer(true);
      toast.error("Must be at least 10 characters.");
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
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit QA</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditQA}>
          <Modal.Body>
            <Col className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                isInvalid={invalidQuestion}
                value={question}
                onChange={(e) => handleChangeQuestion(e.target.value)}
              />
            </Col>

            <Col className="mb-3">
              <Form.Label>Answer</Form.Label>
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
              Close
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditQA;
