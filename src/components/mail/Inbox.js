import "./Inbox.scss";
import {
  getStaffInbox,
  deleteInbox,
  getAllInbox,
  postReplyMail,
} from "../../service/APIservice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ReplyIcon from "@mui/icons-material/Reply";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Inbox = () => {
  const { t } = useTranslation();
  let role = useSelector((state) => state.auth.role);
  let email = useSelector((state) => state.auth.email);
  let username = useSelector((state) => state.auth.username);
  let phone = useSelector((state) => state.auth.phone);
  const [mailList, setMailList] = useState([]);
  const [show, setShow] = useState(false);
  const [mail, setMail] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteMail, setDeleteMail] = useState("");
  const [replyMail, setReplyMail] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [note, setNote] = useState("");
  const [invalidNote, setInvalidNote] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseReply = () => {
    setNote("");
    setInvalidNote(false);
    setReplyMail("");
    setShowReply(false);
  };
  const handleShowReply = (item) => {
    setReplyMail(item);
    setShowReply(true);
    setShow(false);
  };

  const handleChangeNote = (value) => {
    setNote(value);
    setInvalidNote(false);
  };

  const handleReply = async (e) => {
    e.preventDefault();

    if (!note) {
      toast.error(`${t("inbox.toast1")}`);
      setInvalidNote(true);
      return;
    }

    let title = replyMail.title;
    let data = await postReplyMail(
      username,
      email,
      phone,
      note,
      replyMail.sender_email,
      title,
      replyMail.mail_id
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      if (role === "staff") {
        fetchStaffInbox();
      } else fetchAllInbox();

      handleCloseReply();
    } else toast.error(data.EM);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (item) => {
    setDeleteMail(item);
    setShowDelete(true);
  };

  const handleView = (item) => {
    setMail(item);
    handleShow();
  };

  const handleRemoveInbox = async () => {
    let data = await deleteInbox(deleteMail.mail_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      if (role === "staff") {
        fetchStaffInbox();
      } else fetchAllInbox();

      handleCloseDelete();
    } else toast.error(data.EM);
  };

  const fetchStaffInbox = async () => {
    let data = await getStaffInbox(email);
    if (data && data.EC === 0) {
      setMailList(data.DT);
    } else setMailList([]);
  };

  const fetchAllInbox = async () => {
    let data = await getAllInbox(email);
    if (data && data.EC === 0) {
      setMailList(data.DT);
    } else setMailList([]);
  };

  useEffect(() => {
    const fetchStaffInbox = async () => {
      let data = await getStaffInbox(email);
      if (data && data.EC === 0) {
        setMailList(data.DT);
      }
    };

    const fetchAllInbox = async () => {
      let data = await getAllInbox(email);
      if (data && data.EC === 0) {
        setMailList(data.DT);
      }
    };

    if (role === "staff") {
      fetchStaffInbox();
    } else fetchAllInbox();
  }, [role, email]);

  return (
    <div className="inbox-container">
      <div className="title">{t("inbox.header")}</div>
      <div className="mail-list">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "aliceblue",
                }}
              >
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("inbox.field1")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("inbox.field2")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("inbox.field3")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("inbox.field4")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("inbox.field5")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mailList &&
                mailList.length > 0 &&
                mailList.map((row) => (
                  <TableRow
                    hover
                    key={row.mail_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                      {row.sender_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 16 }}>{row.title}</TableCell>
                    <TableCell sx={{ fontSize: 16 }}>
                      {row.created_time}
                    </TableCell>
                    <TableCell sx={{ fontSize: 16 }}>
                      {row.replied
                        ? `${t("inbox.status1")}`
                        : `${t("inbox.status2")}`}
                    </TableCell>
                    <TableCell>
                      <Tooltip title={t("inbox.tip3")}>
                        <IconButton onClick={() => handleShowDelete(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("inbox.tip1")}>
                        <IconButton onClick={() => handleShowReply(row)}>
                          <ReplyIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("inbox.tip2")}>
                        <IconButton onClick={() => handleView(row)}>
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              {mailList && mailList.length === 0 && (
                <TableRow
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: 16 }}
                    colSpan={5}
                  >
                    Empty List...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Re: {mail?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "3% 5%", fontSize: "1.1em" }}>
            <Row className="mb-3" style={{ alignItems: "baseline" }}>
              <Col className="col-2">
                <Form.Label>{t("inbox.label1")}</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={
                    mail?.sender_email
                      ? `${mail.sender_name} <${mail.sender_email}>`
                      : ""
                  }
                  readOnly
                />
              </Col>
            </Row>

            <Row className="mb-3" style={{ alignItems: "baseline" }}>
              <Col className="col-2">
                <Form.Label>{t("inbox.label2")}</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={mail?.sender_phone ? mail.sender_phone : ""}
                  readOnly
                />
              </Col>
            </Row>

            <Row className="mb-3" style={{ alignItems: "baseline" }}>
              <Col className="col-2">
                <Form.Label>{t("inbox.label3")}</Form.Label>
              </Col>
              <Col>
                <Form.Control type="text" value={`Me <${email}>`} readOnly />
              </Col>
            </Row>

            <Col className="mb-3">
              <Form.Control
                as="textarea"
                rows={10}
                value={mail.note ? mail.note : ""}
                readOnly
              />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("inbox.closeBtn")}
            </Button>
            <Button variant="primary" onClick={() => handleShowReply(mail)}>
              {t("inbox.replyBtn")}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showDelete}
          onHide={handleCloseDelete}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("inbox.deleteTitle")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("inbox.deleteNote")} <br />
            <Row className="mt-3">
              <Col className="col-3">{t("inbox.info1")}</Col>
              <Col>
                <b>{deleteMail.sender_name}</b>
              </Col>
            </Row>
            <Row>
              <Col className="col-3">Email:</Col>
              <Col>
                <b> {deleteMail.sender_email} </b>
              </Col>
            </Row>
            <Row>
              <Col className="col-3">{t("inbox.info2")}</Col>
              <Col>
                <b> {deleteMail.created_time} </b>
              </Col>
            </Row>
            <Row>
              <Col className="col-3">{t("inbox.info3")}</Col>
              <Col>
                <b> {deleteMail.title} </b>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              {t("inbox.closeBtn")}
            </Button>
            <Button variant="primary" onClick={handleRemoveInbox}>
              {t("inbox.confirmBtn")}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showReply}
          onHide={handleCloseReply}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("inbox.title")}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleReply}>
            <Modal.Body style={{ padding: "3% 5%", fontSize: "1.1em" }}>
              <Row className="mb-3" style={{ alignItems: "baseline" }}>
                <Col className="col-3">
                  <Form.Label>{t("inbox.label4")}</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    readOnly
                    value={replyMail.sender_email ? replyMail.sender_email : ""}
                  />
                </Col>
              </Row>

              <Row className="mb-3" style={{ alignItems: "baseline" }}>
                <Col className="col-3">
                  <Form.Label>{t("inbox.label5")}</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    readOnly
                    value={replyMail.title ? `Reply: ${replyMail.title}` : ""}
                  />
                </Col>
              </Row>

              <Col>
                <Form.Control
                  as="textarea"
                  rows={10}
                  isInvalid={invalidNote}
                  value={note}
                  onChange={(e) => handleChangeNote(e.target.value)}
                />
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseReply}>
                {t("inbox.cancelBtn")}
              </Button>
              <Button variant="primary" type="submit">
                {t("inbox.sendBtn")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Inbox;
