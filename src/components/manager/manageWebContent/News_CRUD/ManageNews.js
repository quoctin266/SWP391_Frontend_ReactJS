import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { postCreateArticle } from "../../../../service/APIservice";
import ReactPaginate from "react-paginate";
import EditArticle from "./EditArticle";
import DeleteArticle from "./DeleteArticle";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import _ from "lodash";
import Image from "react-bootstrap/Image";
import { toBase64 } from "../../../../utils/reuseFunction";

const ManageNews = (props) => {
  const { t } = useTranslation();
  const { newsList } = props;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [intro, setIntro] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidSubtitle, setInvalidSubtitle] = useState(false);
  const [invalidIntro, setInvalidIntro] = useState(false);
  const [invalidConclusion, setInvalidConclusion] = useState(false);
  const [invalidImage, setInvalidImage] = useState(false);

  let initSection = [
    {
      id: uuidv4(),
      title: "",
      content: "",
      isInvalidTitle: false,
      isInvalidContent: false,
    },
  ];
  const [sectionList, setSectionList] = useState(initSection);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const navigate = useNavigate();
  const PAGE_LIMIT = 4;

  const handlePageClick = (event) => {
    const newOffset = (+event.selected * PAGE_LIMIT) % newsList.length;
    setItemOffset(newOffset);
    setCurrentPage(+event.selected + 1);
  };

  const handleClose = () => {
    setIntro("");
    setConclusion("");
    setSubtitle("");
    setTitle("");
    setPreviewImage("");
    setImage("");
    setSectionList(initSection);
    setInvalidIntro(false);
    setInvalidConclusion(false);
    setInvalidSubtitle(false);
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

  const handleChangeSubtitle = (value) => {
    setInvalidSubtitle(false);
    setSubtitle(value);
  };

  const handleChangeIntro = (value) => {
    setInvalidIntro(false);
    setIntro(value);
  };

  const handleChangeConclusion = (value) => {
    setInvalidConclusion(false);
    setConclusion(value);
  };

  const handleAddSection = () => {
    let section = {
      id: uuidv4(),
      title: "",
      content: "",
      isInvalidTitle: false,
      isInvalidContent: false,
    };
    setSectionList([...sectionList, section]);
  };

  const handleRemoveSection = (id) => {
    let sectionClone = _.cloneDeep(sectionList);
    sectionClone = sectionClone.filter((section) => section.id !== id);
    setSectionList(sectionClone);
  };

  const handleChangeSection = (id, value, field) => {
    let sectionClone = _.cloneDeep(sectionList);
    let index = sectionClone.findIndex((item) => item.id === id);

    if (index > -1) {
      switch (field) {
        case "heading":
          sectionClone[index].title = value;
          if (sectionClone[index].title) {
            sectionClone[index].isInvalidTitle = false;
          }
          setSectionList(sectionClone);
          break;
        case "content":
          sectionClone[index].content = value;
          if (sectionClone[index].content) {
            sectionClone[index].isInvalidContent = false;
          }
          setSectionList(sectionClone);
          break;
        default:
          setSectionList(sectionClone);
      }
    }
  };

  const handleOnchangeImage = async (e) => {
    if (e.target.files.length > 0) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));

      let base64img = "";
      if (e.target.files[0]) {
        base64img = await toBase64(e.target.files[0]);
        setImage(base64img);
      }
      setInvalidImage(false);
    }
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    let sectionClone = _.cloneDeep(sectionList);

    if (!title) {
      setInvalidTitle(true);
      toast.error(`${t("manageNews.toast1")}`);
      return;
    }

    if (!subtitle) {
      setInvalidSubtitle(true);
      toast.error(`${t("manageNews.toast2")}`);
      return;
    }

    if (!intro) {
      setInvalidIntro(true);
      toast.error(`${t("manageNews.toast3")}`);
      return;
    }

    let validTitle = sectionClone.every((section) => {
      if (!section.title) {
        toast.error(`${t("manageNews.toast5")}`);
        section.isInvalidTitle = true;
        setSectionList(sectionClone);
        return false;
      } else return true;
    });
    if (!validTitle) return;

    let validContent = sectionClone.every((section) => {
      if (!section.content) {
        toast.error(`${t("manageNews.toast6")}`);
        section.isInvalidContent = true;
        setSectionList(sectionClone);
        return false;
      } else return true;
    });
    if (!validContent) return;

    if (!conclusion) {
      setInvalidConclusion(true);
      toast.error(`${t("manageNews.toast4")}`);
      return;
    }

    if (!image) {
      setInvalidImage(true);
      toast.error(`${t("manageNews.toast7")}`);
      return;
    }

    let data = await postCreateArticle(
      title,
      subtitle,
      intro,
      conclusion,
      image,
      sectionList
    );
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
        {t("manageNews.addBtn")}
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
                  <Card.Text>{item.sub_title}</Card.Text>
                  <Button
                    variant="warning"
                    onClick={() =>
                      navigate(`/blog/${item.id}`, {
                        state: { blog: item },
                      })
                    }
                  >
                    {t("manageNews.viewBtn")}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </div>

      <div className="d-flex justify-content-center mt-5">
        <ReactPaginate
          nextLabel={t("manageNews.next")}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={t("manageNews.pre")}
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
        className="add-article"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("manageNews.addTitle")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddArticle}>
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

            <Col className="mb-3">
              <Form.Label>{t("manageNews.label2")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("manageNews.note2")}
                isInvalid={invalidSubtitle}
                value={subtitle}
                onChange={(e) => handleChangeSubtitle(e.target.value)}
              />
            </Col>

            <Col className="mb-3">
              <Form.Label>{t("manageNews.label3")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                isInvalid={invalidIntro}
                value={intro}
                onChange={(e) => handleChangeIntro(e.target.value)}
              />
            </Col>

            <div className="mb-3">
              <Form.Label>{t("manageNews.label5")}</Form.Label>
              {sectionList &&
                sectionList.length > 0 &&
                sectionList.map((item, index) => {
                  return (
                    <div className="section" key={item.id}>
                      <div className="section-index">
                        {t("manageNews.label6")} {index + 1}
                      </div>
                      <FloatingLabel
                        controlId={`floatingHeading-${item.id}`}
                        label={t("manageNews.note3")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter heading"
                          value={item.title}
                          isInvalid={item.isInvalidTitle}
                          onChange={(e) =>
                            handleChangeSection(
                              item.id,
                              e.target.value,
                              "heading"
                            )
                          }
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId={`floatingContent-${item.id}`}
                        label={t("manageNews.note4")}
                      >
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Enter content"
                          value={item.content}
                          isInvalid={item.isInvalidContent}
                          onChange={(e) =>
                            handleChangeSection(
                              item.id,
                              e.target.value,
                              "content"
                            )
                          }
                        />
                      </FloatingLabel>
                      <div className="section-btn-group">
                        {sectionList && sectionList.length > 1 && (
                          <Tooltip title="Remove">
                            <IconButton
                              onClick={() => handleRemoveSection(item.id)}
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Tooltip title="Add">
                          <IconButton onClick={handleAddSection}>
                            <AddCircleIcon color="success" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
            </div>

            <Col className="mb-3">
              <Form.Label>{t("manageNews.label4")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                isInvalid={invalidConclusion}
                value={conclusion}
                onChange={(e) => handleChangeConclusion(e.target.value)}
              />
            </Col>

            <Col className="mb-3">
              <Form.Label>{t("manageNews.label7")}</Form.Label>
              <Form.Control
                type="file"
                id="file-input"
                isInvalid={invalidImage}
                onChange={(e) => handleOnchangeImage(e)}
              />
              <div className="banner-image-preview mt-3">
                {previewImage ? (
                  <Image src={previewImage} />
                ) : (
                  <span style={{ color: "rgb(180, 177, 177)" }}>Preview</span>
                )}
              </div>
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

export default ManageNews;
