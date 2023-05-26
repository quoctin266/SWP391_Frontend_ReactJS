import "./Home.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Scrollbars } from "react-custom-scrollbars-2";
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

const Home = () => {
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
      <Container>
        <div className="search-location-container">
          <div className="title">Search for Bird Transportation</div>
          <div className="search-bar">
            <Form>
              <Row className="search-row">
                <Form.Group
                  className="mb-3"
                  controlId="formStartPoint"
                  as={Col}
                >
                  <Form.Label>Start Point</Form.Label>
                  <Form.Control type="text" placeholder="Enter location" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEndPoint" as={Col}>
                  <Form.Label>End Point</Form.Label>
                  <Form.Control type="text" placeholder="Enter location" />
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  as={Col}
                  className="col-1 search-btn"
                >
                  Search
                </Button>
              </Row>
            </Form>
          </div>
        </div>
        <div className="homepage-info-container">
          <div className="news-container">
            <div className="title">News</div>
            <hr />
            <Scrollbars
              style={{ height: "20vh" }}
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
              style={{ height: "20vh" }}
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
              style={{ height: "20vh" }}
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