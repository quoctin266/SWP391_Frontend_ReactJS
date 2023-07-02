import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { postCreateArticle } from "../../../../service/APIservice";
import ReactPaginate from "react-paginate";
import Row from "react-bootstrap/Row";
import EditArticle from "./EditArticle";
import DeleteArticle from "./DeleteArticle";

const ManageNews = (props) => {
  const { newsList } = props;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidSource, setInvalidSource] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const PAGE_LIMIT = 4;

  const handlePageClick = (event) => {
    const newOffset = (+event.selected * PAGE_LIMIT) % newsList.length;
    setItemOffset(newOffset);
    setCurrentPage(+event.selected + 1);
  };

  const handleClose = () => {
    setDate("");
    setLink("");
    setSource("");
    setTitle("");
    setInvalidDate(false);
    setInvalidLink(false);
    setInvalidSource(false);
    setInvalidTitle(false);
    setShow(false);
  };
  const handleShow = () => {
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

  const handleAddArticle = async (e) => {
    e.preventDefault();

    if (!title) {
      setInvalidTitle(true);
      toast.error("Title must not be empty.");
      return;
    }

    if (!source) {
      setInvalidSource(true);
      toast.error("Author name must not be empty.");
      return;
    }

    if (!date) {
      setInvalidDate(true);
      toast.error("Please specify a date.");
      return;
    }

    if (!link) {
      setInvalidLink(true);
      toast.error("Please specify the article link.");
      return;
    }

    let data = await postCreateArticle(title, source, date, link);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllNews();
      handleClose();
    } else toast.error(data.EM);
  };

  useEffect(() => {
    let newPageCount = Math.ceil(newsList.length / PAGE_LIMIT);
    const endOffset = itemOffset + PAGE_LIMIT;
    setCurrentItems(newsList.slice(itemOffset, endOffset));
    setPageCount(newPageCount);
  }, [itemOffset, newsList]);

  useEffect(() => {
    let newPageCount = Math.ceil(newsList.length / PAGE_LIMIT);
    if (newPageCount < pageCount) {
      if (currentPage === pageCount) {
        const newOffset = ((currentPage - 2) * PAGE_LIMIT) % newsList.length;
        const endOffset = newOffset + PAGE_LIMIT;
        setCurrentItems(newsList.slice(newOffset, endOffset));
        setCurrentPage((currentPage) => currentPage - 1);
      }
    }
  }, [currentPage, pageCount, newsList]);

  return (
    <>
      <Button variant="primary" className="my-3" onClick={handleShow}>
        Add new
      </Button>

      <div className="news-list">
        {currentItems &&
          currentItems.length > 0 &&
          currentItems.map((item) => {
            return (
              <Card key={item.id} className="mb-5 news">
                <Card.Header className="news-title">
                  {item.title}
                  <div className="btn-group">
                    <EditArticle
                      item={item}
                      fetchAllNews={props.fetchAllNews}
                    />

                    <DeleteArticle
                      item={item}
                      fetchAllNews={props.fetchAllNews}
                    />
                  </div>
                </Card.Header>
                <Card.Body className="news-body">
                  <Card.Title>By {item.source}</Card.Title>
                  <Card.Text>Published {item.date}</Card.Text>
                  <Button variant="warning">
                    <a href={item.link} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </div>

      <div className="d-flex justify-content-center mt-5">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
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
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Article</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddArticle}>
          <Modal.Body>
            <Col className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                isInvalid={invalidTitle}
                value={title}
                onChange={(e) => handleChangeTitle(e.target.value)}
              />
            </Col>

            <Row className="mb-3">
              <Col>
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter author name"
                  isInvalid={invalidSource}
                  value={source}
                  onChange={(e) => handleChangeSourse(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>Date</Form.Label>
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
              <Form.Label>Article Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter link"
                isInvalid={invalidLink}
                value={link}
                onChange={(e) => handleChangeLink(e.target.value)}
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

export default ManageNews;
