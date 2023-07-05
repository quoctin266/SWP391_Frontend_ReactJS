import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { postCreateQA } from "../../../../service/APIservice";
import ReactPaginate from "react-paginate";
import EditQA from "./EditQA";
import DeleteQA from "./DeleteQA";
import { useTranslation } from "react-i18next";

const ManageFAQ = (props) => {
  const { t } = useTranslation();
  const { faqList } = props;
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [invalidQuestion, setInvalidQuestion] = useState(false);
  const [invalidAnswer, setInvalidAnswer] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const PAGE_LIMIT = 3;

  const handlePageClick = (event) => {
    const newOffset = (+event.selected * PAGE_LIMIT) % faqList.length;
    setItemOffset(newOffset);
    setCurrentPage(+event.selected + 1);
  };

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    setInvalidAnswer(false);
    setInvalidQuestion(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChangeQuestion = (value) => {
    setInvalidQuestion(false);
    setQuestion(value);
  };

  const handleChangeAnswer = (value) => {
    setInvalidAnswer(false);
    setAnswer(value);
  };

  const handleAddQA = async (e) => {
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

    let data = await postCreateQA(question, answer);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllFAQ();
      handleClose();
    } else toast.error(data.EM);
  };

  useEffect(() => {
    let newPageCount = Math.ceil(faqList.length / PAGE_LIMIT);
    const endOffset = itemOffset + PAGE_LIMIT;
    setCurrentItems(faqList.slice(itemOffset, endOffset));
    setPageCount(newPageCount);
  }, [itemOffset, faqList]);

  useEffect(() => {
    let newPageCount = Math.ceil(faqList.length / PAGE_LIMIT);
    if (newPageCount < pageCount) {
      if (currentPage === pageCount) {
        const newOffset = ((currentPage - 2) * PAGE_LIMIT) % faqList.length;
        const endOffset = newOffset + PAGE_LIMIT;
        setCurrentItems(faqList.slice(newOffset, endOffset));
        setCurrentPage((currentPage) => currentPage - 1);
      }
    }
  }, [currentPage, pageCount, faqList]);

  return (
    <>
      <Button variant="primary" className="my-3" onClick={handleShow}>
        {t("manageFAQ.addBtn")}
      </Button>

      {currentItems &&
        currentItems.length > 0 &&
        currentItems.map((item, index) => {
          return (
            <Card key={item.id} className="mb-5">
              <Card.Header className="question">
                {item.index}. {item.question}
              </Card.Header>
              <Card.Body className="answer">
                <Card.Text>{item.answer}</Card.Text>
                <DeleteQA item={item} fetchAllFAQ={props.fetchAllFAQ} />
                <EditQA item={item} fetchAllFAQ={props.fetchAllFAQ} />
              </Card.Body>
            </Card>
          );
        })}

      <div className="d-flex justify-content-center mt-5">
        <ReactPaginate
          nextLabel={t("manageFAQ.next")}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={t("manageFAQ.pre")}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={pageCount !== 0 ? currentPage - 1 : -1}
        />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("manageFAQ.addTitle")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddQA}>
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

export default ManageFAQ;
