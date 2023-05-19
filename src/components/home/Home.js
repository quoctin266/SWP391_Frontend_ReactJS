import "./Home.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Scrollbars } from "react-custom-scrollbars-2";
import { getAllNews } from "../../service/APIservice";
import { useEffect, useState } from "react";
import moment from "moment";
import { BiNews } from "react-icons/bi";

const Home = () => {
  const [listNews, setListNews] = useState([]);

  const fetchAllNews = async () => {
    let res = await getAllNews();
    if (res?.data && res.data.length > 0) {
      setListNews(res.data);
    }
  };

  useEffect(() => {
    fetchAllNews();
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
            <div className="content">Coming soon...</div>
          </div>
          <div className="shipping-condition-container">
            <div className="title">Shipping Condition</div>
            <div className="content">Coming soon...</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
