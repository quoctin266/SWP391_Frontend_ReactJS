import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import {
  putUpdateArticle,
  getNewsContent,
} from "../../../../service/APIservice";
import { useTranslation } from "react-i18next";
import Image from "react-bootstrap/Image";
import { toBase64 } from "../../../../utils/reuseFunction";
import { v4 as uuidv4 } from "uuid";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import _ from "lodash";

const EditArticle = (props) => {
  const { t } = useTranslation();
  const [article, setArticle] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [intro, setIntro] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [sectionList, setSectionList] = useState([]);

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidSubtitle, setInvalidSubtitle] = useState(false);
  const [invalidIntro, setInvalidIntro] = useState(false);
  const [invalidConclusion, setInvalidConclusion] = useState(false);

  const handleClose = () => {
    setInvalidSubtitle(false);
    setInvalidIntro(false);
    setInvalidConclusion(false);
    setInvalidTitle(false);
    setShow(false);
  };
  const handleShow = (item) => {
    setArticle(item);
    setTitle(item.title);
    setSubtitle(item.sub_title);
    setIntro(item.intro);
    setConclusion(item.conclusion);
    setPreviewImage(item.banner);
    setImage(item.banner);
    fetchNewsContent();
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

  const handleOnchangeImage = async (e) => {
    if (e.target.files.length > 0) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));

      let base64img = "";
      if (e.target.files[0]) {
        base64img = await toBase64(e.target.files[0]);
        setImage(base64img);
      }
    }
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

  const handleEditArticle = async (e) => {
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

    let data = await putUpdateArticle(
      title,
      subtitle,
      intro,
      conclusion,
      image,
      sectionList,
      article.id
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      props.fetchAllNews();
      handleClose();
    } else toast.error(data.EM);
  };

  const fetchNewsContent = async () => {
    let data = await getNewsContent(props.item.id);
    if (data && data.EC === 0) {
      let initSection = data.DT.map((item) => {
        return {
          id: uuidv4(),
          title: item.content_title,
          content: item.content_body,
          isInvalidTitle: false,
          isInvalidContent: false,
        };
      });

      setSectionList(initSection);
    }
  };

  useEffect(() => {
    fetchNewsContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        className="edit-article"
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

export default EditArticle;
