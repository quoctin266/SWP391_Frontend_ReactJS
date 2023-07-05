import "./Home.scss";
import { Button, Container } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import ReactPlayer from "react-player";
import {
  getAllNews,
  getAllServicesIntro,
  getAllShippingCondition,
  postCreateFeedback,
} from "../../../service/APIservice";
import { useEffect, useState } from "react";
import moment from "moment";
import { BiNews } from "react-icons/bi";
import { FaHandPointRight } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import GoogleMapSearch from "./GoogleMapSearch";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Parrot from "../../../assets/image/Parrot.png";
import Mirror from "../../../assets/image/BirdvsMirror.png";
import { useSelector } from "react-redux";
import Banner from "../banner/Banner";
import { HomeBanner } from "../banner/HomeBanner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const account_id = useSelector((state) => state.auth.account_id);

  const [listNews, setListNews] = useState([]);
  const [listServicesIntro, setListServicesIntro] = useState([]);
  const [listCondition, setListCondition] = useState([]);
  const [show, setShow] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDes, setFeedbackDes] = useState("");
  const [star, setStar] = useState(0);

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidDes, setInvalidDes] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFeedbackTitle("");
    setFeedbackDes("");
    setStar(0);
    setInvalidTitle(false);
    setInvalidDes(false);
  };

  const handleShow = () => setShow(true);

  const fetchAllNews = async () => {
    let data = await getAllNews();
    if (data && data.length > 0) {
      setListNews(data);
    }
  };

  const fetchAllServicesIntro = async () => {
    let data = await getAllServicesIntro();
    if (data && data.length > 0) {
      setListServicesIntro(data);
    }
  };

  const fetchAllShippingCondition = async () => {
    let data = await getAllShippingCondition();
    if (data && data.length > 0) {
      setListCondition(data);
    }
  };

  useEffect(() => {
    fetchAllNews();
    fetchAllServicesIntro();
    fetchAllShippingCondition();
  }, []);

  const handleChangeTitle = (value) => {
    setFeedbackTitle(value);
    setInvalidTitle(false);
  };

  const handleChangeDes = (value) => {
    setFeedbackDes(value);
    setInvalidDes(false);
  };

  const handleCreateFeedback = async (e) => {
    e.preventDefault();

    if (!feedbackTitle) {
      setInvalidTitle(true);
      toast.error("Please fill in feedback title.");
      return;
    }

    if (!star) {
      toast.error("Please rate us.");
      return;
    }

    if (!feedbackDes) {
      setInvalidDes(true);
      toast.error("Please fill in feedback description.");
      return;
    }

    let createTime = moment().format("YYYY-MM-DD HH:mm:ss").toString();
    let data = await postCreateFeedback(
      account_id,
      feedbackTitle,
      feedbackDes,
      createTime,
      star
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
    } else toast.error(data.EM);
  };

  return (
    <div className="home-container">
      <Container className="home-content">
        <div className="banner-container">
          <Banner Images={HomeBanner} />
          <div className="banner-title">
            {t("home.banner1")}
            <br />
            {t("home.banner2")}
            <br />
            {t("home.banner3")}
            {(role === "customer" || role === "") && (
              <div className="signup-btn">
                {isAuthenticated ? (
                  <Button variant="dark" onClick={() => navigate("/booking")}>
                    {t("home.bookBtn")}
                  </Button>
                ) : (
                  <Button variant="dark" onClick={() => navigate("/register")}>
                    {t("home.registerBtn")}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="About">
          <h1>{t("home.title1")}</h1>
          {t("home.text1")}
        </div>
        <Container className="MoveBird">
          <img
            src={Parrot}
            style={{ width: "25%", borderRadius: "50%" }}
            alt="pic1"
          />
          <div className="MoveBird-Text">
            <h1>{t("home.title2")}</h1>
            <h2>{t("home.text2")}</h2>
            <p>{t("home.text3")}</p>
            <p>{t("home.text4")}</p>
            <p>{t("home.text5")}</p>
            <p>{t("home.text6")}</p>
            <p>{t("home.text7")}</p>
            <h2>{t("home.text8")}</h2>
          </div>
        </Container>
        <Container className="WhereMove">
          <img
            src={Mirror}
            style={{ width: "25%", borderRadius: "50%" }}
            alt="pic2"
          />
          <div className="WhereMove-Text">
            <h1>{t("home.title3")}</h1>
            <p>{t("home.text9")}</p>
          </div>
        </Container>
        <Container className="video">
          <ReactPlayer
            url="https://youtu.be/aTvmJg2AzqM"
            className="youtube-video"
          />
          <div className="video-text">
            <p>👈🎬{t("home.text10")}</p>
          </div>
        </Container>

        <Typography className="Board-Title">{t("home.title4")}</Typography>
        <GoogleMapSearch />
        <div className="homepage-info-container">
          <div className="news-container">
            <div className="title">{t("home.news")}</div>
            <Scrollbars
              style={{ height: "39vh" }}
              autoHide
              // Hide delay in ms
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}
            >
              <div className="content">
                {listNews &&
                  listNews.length > 0 &&
                  listNews.map((item) => {
                    return (
                      <div className="news-item" key={item.id}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="news-link"
                        >
                          <BiNews /> {item.title} &nbsp; &nbsp;
                          <i>{item.source}</i>
                          &nbsp; &nbsp;
                          <i>{moment(item.date).utc().format("DD/MM/YYYY")} </i>
                        </a>
                      </div>
                    );
                  })}
              </div>
            </Scrollbars>
          </div>

          <div className="shipping-services-container">
            <div className="title">{t("home.service")}</div>
            <Scrollbars
              style={{ height: "39vh" }}
              autoHide
              // Hide delay in ms
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}
            >
              <div className="content">
                {listServicesIntro &&
                  listServicesIntro.length > 0 &&
                  listServicesIntro.map((service) => {
                    return (
                      <div className="service-item" key={service.id}>
                        <div className="service-title">{service.title}</div>
                        {service.description &&
                          service.description.length > 0 &&
                          service.description.map((item) => {
                            return (
                              <div className="service-detail" key={item.id}>
                                <FaHandPointRight /> &nbsp; {item.detail}
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
            </Scrollbars>
          </div>

          <div className="shipping-condition-container">
            <div className="title">{t("home.condition")}</div>
            <Scrollbars
              style={{ height: "39vh" }}
              autoHide
              // Hide delay in ms
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}
            >
              <div className="content">
                {listCondition &&
                  listCondition.length > 0 &&
                  listCondition.map((item) => {
                    return (
                      <div className="condition-item" key={item.id}>
                        <MdLabelImportant /> {item.description}
                      </div>
                    );
                  })}
              </div>
            </Scrollbars>
          </div>
        </div>

        {isAuthenticated && role === "customer" && (
          <Button variant="warning" onClick={handleShow}>
            {t("home.feedbackBtn")}
          </Button>
        )}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("home.formTitle")}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleCreateFeedback}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="feedbackTitle">
                <Form.Label>{t("home.titleLabel")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("home.note")}
                  isInvalid={invalidTitle}
                  value={feedbackTitle}
                  onChange={(e) => handleChangeTitle(e.target.value)}
                />
              </Form.Group>

              <Col>
                <Form.Label>{t("home.rate")}</Form.Label> <br />
                <Rating
                  name="simple-controlled"
                  value={star}
                  onChange={(event, newValue) => {
                    setStar(newValue);
                  }}
                />
              </Col>

              <Form.Group className="mb-3" controlId="feedback description">
                <Form.Label>{t("home.des")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  isInvalid={invalidDes}
                  value={feedbackDes}
                  onChange={(e) => handleChangeDes(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t("home.closeBtn")}
              </Button>
              <Button variant="primary" type="submit">
                {t("home.confirmBtn")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default Home;
