import "./Home.scss";
import { Button, Container } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import ReactPlayer from 'react-player'
import {
  getAllNews,
  getAllServicesIntro,
  getAllShippingCondition,
} from "../../../service/APIservice";
import { useEffect, useState } from "react";
import moment from "moment";
import { BiNews } from "react-icons/bi";
import { FaHandPointRight } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import banner from "../../../assets/image/banner.jpg";
import Image from "react-bootstrap/Image";
import GoogleMapSearch from "./GoogleMapSearch";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Parrot from '../../../assets/image/Parrot.png'
import Mirror from '../../../assets/image/BirdvsMirror.png'

const Home = () => {
  const navigate = useNavigate();
  const [listNews, setListNews] = useState([]);
  const [listServicesIntro, setListServicesIntro] = useState([]);
  const [listCondition, setListCondition] = useState([]);

  const fetchAllNews = async () => {
    let res = await getAllNews();
    if (res?.data && res.data.length > 0) {
      setListNews(res.data);
    }
  };

  const fetchAllServicesIntro = async () => {
    let res = await getAllServicesIntro();
    if (res?.data && res.data.length > 0) {
      setListServicesIntro(res.data);
    }
  };

  const fetchAllShippingCondition = async () => {
    let res = await getAllShippingCondition();
    if (res?.data && res.data.length > 0) {
      setListCondition(res.data);
    }
  };

  useEffect(() => {
    fetchAllNews();
    fetchAllServicesIntro();
    fetchAllShippingCondition();
  }, []);

  return (
    <div className="home-container">
      <Container className="home-content">
        <div className="banner-container">
          <Image src={banner} rounded className="banner-image" />
          <div className="banner-title">
            Looking To Relocate Your Bird?
            <br />
            We Are Here For You.
            <br />
            Your Bird's Comfort Is Our Top Priority!
            <div className="signup-btn">
              <Button variant="dark" onClick={() => navigate("/register")}>
                Join us now
              </Button>
            </div>
          </div>
        </div>
        <Typography className="About">
          <h1>What We Are</h1>
          At Bird Travel, we understand the unique bond between bird owners and their feathered friends. As a company
          dedicated to helping bird owners transport their beloved companions, we offer a range of services designed
          with their needs in mind. Whether you need to relocate your bird to a new home, take them on a vacation with
          you, or simply provide them with a safe and comfortable journey, Bird Travel is here to assist you.
          Our experienced team is well-versed in handling ground transportation, ensuring that your bird receives the
          utmost care and attention throughout the journey. With our expertise and commitment to animal welfare,
          you can trust Bird Travel to provide a stress-free and enjoyable travel experience for both you and your
          feathered companion.
        </Typography>
        <Container className="MoveBird">
          <img src={Parrot} style={{ width: '25%', borderRadius: '50%' }} />
          <Typography className="MoveBird-Text">
            <h1>How we move bird</h1>
            <h2>At Bird Travel, we transport birds with care and expertise. Here's how we can assist you:</h2>
            <p>Specialized Carriers: Our carriers are designed for the safety and comfort of birds during travel.</p>
            <p>Experienced Staff: Our team is trained in handling birds and ensuring their well-being throughout the journey.</p>
            <p>Stress Minimization: We take extra measures to minimize stress for your birds during transit.</p>
            <p>Reliable Logistics: We plan and coordinate transportation routes for timely arrivals.</p>
            <p>Tailored Solutions: We provide personalized plans to meet your specific bird transportation needs.</p>
            <h2>Trust Bird Travel for a smooth and reliable bird transportation experience.</h2>
          </Typography>
        </Container>
        <Container className="WhereMove">
          <img src={Mirror} style={{ width: '25%', borderRadius: '50%' }} />
          <Typography className="WhereMove-Text">
            <h1>Where do we move bird</h1>
            <p>At Bird Travel, we offer bird transportation services to various destinations. Whether you need to
              transport your bird locally, within the country, or even internationally, we can assist you. Our
              services cover a wide range of locations, ensuring that your feathered friend can reach their
              destination safely and comfortably. From short-distance relocations to long-haul journeys, trust
              Bird Travel to transport your bird wherever they need to go.
            </p>
          </Typography>
        </Container>
        <Container className="video">    <ReactPlayer url='https://youtu.be/aTvmJg2AzqM' />
          <Typography className="video-text" ><p>👈🎬Transporting a bird on the ground requires careful planning and attention
            to ensure the safety and comfort of your feathered friend. Here are some essential
            steps to follow when transporting a bird by road or other ground transportation methods:</p></Typography>
        </Container>

        <Typography className="Board-Title">See your bird’s destination</Typography>
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
      </Container>
    </div>
  );
};

export default Home;
