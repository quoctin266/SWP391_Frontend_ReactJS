import { Container } from "react-bootstrap";
import "./Review.scss";
import Card from "react-bootstrap/Card";
import { getAllFeedback } from "../../../service/APIservice";
import { useState } from "react";
import { useEffect } from "react";
import ProfilePic from "../../../assets/image/User_Icon.jpg";
import Rating from "@mui/material/Rating";
import _ from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Review = () => {
  const { t } = useTranslation();
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchAllFeedback = async () => {
    let data = await getAllFeedback();
    if (data && data.EC === 0) {
      let cloneList = _.cloneDeep(data.DT);
      cloneList.forEach((item) => {
        item.created_time = moment(
          item.created_time,
          "DD-MM-YYYY HH:mm"
        ).format("DD MMM YYYY");
      });
      setFeedbackList(cloneList);
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  return (
    <Container className="review-outer">
      <div className="review-container">
        <div className="Header">{t("review.title")}</div>
        <div className="review-list">
          {feedbackList &&
            feedbackList.length > 0 &&
            feedbackList.map((item) => {
              return (
                <Card key={item.feedback_id}>
                  <Card.Img
                    variant="top"
                    src={item.avatar ? item.avatar : ProfilePic}
                  />

                  <Card.Body>
                    <div className="header">
                      <Card.Title>{item.username}</Card.Title>
                      <div className="time">{item.created_time}</div>
                    </div>
                    <Card.Title>{item.title}</Card.Title>
                    <Rating
                      name="read-only"
                      value={item.rate ? item.rate : 0}
                      readOnly
                    />
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default Review;
