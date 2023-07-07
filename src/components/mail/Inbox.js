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

const Inbox = () => {
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
      toast.error("Please enter mail content.");
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
      <div className="title">Inbox</div>
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
                  Sender
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  Subject
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  Actions
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
                      {row.replied ? "Replied" : "Not Replied"}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleShowDelete(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Reply"
                        onClick={() => handleShowReply(row)}
                      >
                        <IconButton>
                          <ReplyIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View">
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
                <Form.Label>From:</Form.Label>
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
                <Form.Label>Tel:</Form.Label>
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
                <Form.Label>To:</Form.Label>
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
              Close
            </Button>
            <Button variant="primary" onClick={() => handleShowReply(mail)}>
              Reply
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
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to remove this mail? <br />
            <Row className="mt-3">
              <Col className="col-3">Sender:</Col>
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
              <Col className="col-3">Date:</Col>
              <Col>
                <b> {deleteMail.created_time} </b>
              </Col>
            </Row>
            <Row>
              <Col className="col-3">Subject:</Col>
              <Col>
                <b> {deleteMail.title} </b>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRemoveInbox}>
              Confirm
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
            <Modal.Title>Reply Message</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleReply}>
            <Modal.Body style={{ padding: "3% 5%", fontSize: "1.1em" }}>
              <Row className="mb-3" style={{ alignItems: "baseline" }}>
                <Col className="col-2">
                  <Form.Label>Recipient:</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Recipient email address"
                    readOnly
                    value={replyMail.sender_email ? replyMail.sender_email : ""}
                  />
                </Col>
              </Row>

              <Row className="mb-3" style={{ alignItems: "baseline" }}>
                <Col className="col-2">
                  <Form.Label>Subject:</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Subject"
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
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Inbox;
