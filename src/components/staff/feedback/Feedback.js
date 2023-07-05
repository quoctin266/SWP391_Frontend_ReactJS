import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Feedback.scss";
import { getAllFeedback, deleteFeedback } from "../../../service/APIservice";
import { useState } from "react";
import { useEffect } from "react";
import ProfilePic from "../../../assets/image/User_Icon.jpg";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Feedback = () => {
  const { t } = useTranslation();
  const [feedbackList, setFeedbackList] = useState([]);
  const [show, setShow] = useState(false);
  const [removeItem, setRemoveItem] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setRemoveItem(item);
    setShow(true);
  };

  const handleRemove = async () => {
    let data = await deleteFeedback(removeItem.feedback_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllFeedback();
      handleClose();
    } else toast.error(data.EM);
  };

  const fetchAllFeedback = async () => {
    let data = await getAllFeedback();
    if (data && data.EC === 0) {
      setFeedbackList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  return (
    <div className="feedback-container">
      <div className="feedback-title">{t("feedback.header")}</div>
      <div className="Box">
        <TableContainer component={Paper} sx={{ borderRadius: "2rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#839e77" }}>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  {t("feedback.field1")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  {t("feedback.field2")}&nbsp;
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  {t("feedback.field3")}&nbsp;
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  {t("feedback.field4")}&nbsp;
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  {t("feedback.field5")}&nbsp;
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  {t("feedback.field6")}&nbsp;
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  {t("feedback.field7")}&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackList &&
                feedbackList.length > 0 &&
                feedbackList.map((row) => (
                  <TableRow
                    key={row.feedback_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      width={5}
                      sx={{ border: "0" }}
                      className="IconCell"
                    >
                      <img
                        className="Icon"
                        src={row.avatar ? row.avatar : ProfilePic}
                        alt="avatar"
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      width={3}
                      className="Name"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      {row.username}
                    </TableCell>
                    <TableCell
                      align="center"
                      width={3}
                      className="time"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      {row.created_time}
                    </TableCell>
                    <TableCell
                      align="center"
                      width={3}
                      className="title"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      align="center"
                      width={3}
                      className="rate"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      <span style={{ fontSize: "1.1em" }}>{row.rate}</span>{" "}
                      <span>
                        <StarIcon fontSize="small" />
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      width={3}
                      className="Feedback"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={3}
                      className="remove"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      <Button variant="danger" onClick={() => handleShow(row)}>
                        {t("feedback.removeBtn")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("feedback.removeTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("feedback.removeNote")} <br />
          {t("feedback.info1")} <b>{removeItem.username}</b> <br />
          {t("feedback.info2")} <b>{removeItem.title}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("feedback.closeBtn")}
          </Button>
          <Button variant="primary" onClick={handleRemove}>
            {t("feedback.confirmBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Feedback;
