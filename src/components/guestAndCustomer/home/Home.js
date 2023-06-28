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

const Home = () => {
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

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidDes, setInvalidDes] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFeedbackTitle("");
    setFeedbackDes("");
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
      createTime
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
            Looking To Relocate Your Bird?
            <br />
            We Are Here For You.
            <br />
            Your Bird's Comfort Is Our Top Priority!
            {(role === "customer" || role === "") && (
              <div className="signup-btn">
                {isAuthenticated ? (
                  <Button variant="dark" onClick={() => navigate("/booking")}>
                    Start Booking
                  </Button>
                ) : (
                  <Button variant="dark" onClick={() => navigate("/register")}>
                    Join Us Now
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        <Typography className="About">
          <h1>What We Are</h1>
          At Bird Travel, we understand the unique bond between bird owners and
          their feathered friends. As a company dedicated to helping bird owners
          transport their beloved companions, we offer a range of services
          designed with their needs in mind. Whether you need to relocate your
          bird to a new home, take them on a vacation with you, or simply
          provide them with a safe and comfortable journey, Bird Travel is here
          to assist you. Our experienced team is well-versed in handling ground
          transportation, ensuring that your bird receives the utmost care and
          attention throughout the journey. With our expertise and commitment to
          animal welfare, you can trust Bird Travel to provide a stress-free and
          enjoyable travel experience for both you and your feathered companion.
        </Typography>
        <Container className="MoveBird">
          <img
            src={Parrot}
            style={{ width: "25%", borderRadius: "50%" }}
            alt="pic1"
          />
          <Typography className="MoveBird-Text">
            <h1>How we move bird</h1>
            <h2>
              At Bird Travel, we transport birds with care and expertise. Here's
              how we can assist you:
            </h2>
            <p>
              Specialized Carriers: Our carriers are designed for the safety and
              comfort of birds during travel.
            </p>
            <p>
              Experienced Staff: Our team is trained in handling birds and
              ensuring their well-being throughout the journey.
            </p>
            <p>
              Stress Minimization: We take extra measures to minimize stress for
              your birds during transit.
            </p>
            <p>
              Reliable Logistics: We plan and coordinate transportation routes
              for timely arrivals.
            </p>
            <p>
              Tailored Solutions: We provide personalized plans to meet your
              specific bird transportation needs.
            </p>
            <h2>
              Trust Bird Travel for a smooth and reliable bird transportation
              experience.
            </h2>
          </Typography>
        </Container>
        <Container className="WhereMove">
          <img
            src={Mirror}
            style={{ width: "25%", borderRadius: "50%" }}
            alt="pic2"
          />
          <Typography className="WhereMove-Text">
            <h1>Where do we move bird</h1>
            <p>
              At Bird Travel, we offer bird transportation services to various
              destinations. Whether you need to transport your bird locally,
              within the country, or even internationally, we can assist you.
              Our services cover a wide range of locations, ensuring that your
              feathered friend can reach their destination safely and
              comfortably. From short-distance relocations to long-haul
              journeys, trust Bird Travel to transport your bird wherever they
              need to go.
            </p>
          </Typography>
        </Container>
        <Container className="video">
          <ReactPlayer
            url="https://youtu.be/aTvmJg2AzqM"
            className="youtube-video"
          />
          <Typography className="video-text">
            <p>
              👈🎬Transporting a bird on the ground requires careful planning
              and attention to ensure the safety and comfort of your feathered
              friend. Here are some essential steps to follow when transporting
              a bird by road or other ground transportation methods:
            </p>
          </Typography>
        </Container>

        <Typography className="Board-Title">
          See your bird’s destination
        </Typography>
        <GoogleMapSearch />
        <div className="homepage-info-container">
          <div className="news-container">
            <div className="title">News</div>
            <hr />
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
                        <BiNews /> {item.title} &nbsp; &nbsp;
                        <i>{item.source}</i>
                        &nbsp; &nbsp;
                        <i> {moment(item.date).utc().format("DD/MM/YYYY")} </i>
                      </div>
                    );
                  })}
              </div>
            </Scrollbars>
          </div>

          <div className="shipping-services-container">
            <div className="title">Bird Shipping Services</div>
            <hr />
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
            <div className="title">Shipping Condition</div>
            <hr />
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
            Leave feedback
          </Button>
        )}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Feedback</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleCreateFeedback}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="feedbackTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Feedback title"
                  isInvalid={invalidTitle}
                  value={feedbackTitle}
                  onChange={(e) => handleChangeTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="feedback description">
                <Form.Label>Description</Form.Label>
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
                Close
              </Button>
              <Button variant="primary" type="submit">
                Confirm
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default Home;
