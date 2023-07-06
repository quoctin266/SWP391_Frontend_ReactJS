import "./Sent.scss";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { getSentMail, deleteSent } from "../../service/APIservice";

const Sent = () => {
  let email = useSelector((state) => state.auth.email);
  let role = useSelector((state) => state.auth.role);
  const [mailList, setMailList] = useState([]);
  const [show, setShow] = useState(false);
  const [mail, setMail] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteMail, setDeleteMail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (item) => {
    setDeleteMail(item);
    setShowDelete(true);
  };

  const handleRemoveSent = async () => {
    let data = await deleteSent(deleteMail.mail_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchSentMail();
      handleCloseDelete();
    } else toast.error(data.EM);
  };

  const handleView = (item) => {
    setMail(item);
    handleShow();
  };

  const fetchSentMail = async () => {
    let data = await getSentMail(email);
    if (data && data.EC === 0) {
      setMailList(data.DT);
    } else setMailList([]);
  };

  useEffect(() => {
    const fetchSentMail = async () => {
      let data = await getSentMail(email);
      if (data && data.EC === 0) {
        setMailList(data.DT);
      }
    };

    fetchSentMail();
  }, [email]);

  return (
    <div className="sent-container">
      <div className="title">Sent Mail</div>
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
                  Recipient
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
                      {row.receiver_name}
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
                <Form.Label>To:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={
                    mail?.receiver_email
                      ? `${mail.receiver_name} <${mail.receiver_email}>`
                      : role === "customer"
                      ? "All Staff"
                      : ""
                  }
                  readOnly
                />
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
              <Col className="col-3">Recipient:</Col>
              <Col>
                <b>{deleteMail.receiver_name}</b>
              </Col>
            </Row>
            <Row>
              <Col className="col-3">Email:</Col>
              <Col>
                <b>
                  {" "}
                  {role === "customer"
                    ? "All Staff"
                    : deleteMail.receiver_email}{" "}
                </b>
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
            <Button variant="primary" onClick={handleRemoveSent}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Sent;
