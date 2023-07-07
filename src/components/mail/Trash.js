import "./Trash.scss";
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
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  getStaffTrash,
  putRecoverMail,
  getAllTrash,
} from "../../service/APIservice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Trash = () => {
  const { t } = useTranslation();
  let role = useSelector((state) => state.auth.role);
  let email = useSelector((state) => state.auth.email);
  let username = useSelector((state) => state.auth.username);
  const [mailList, setMailList] = useState([]);
  const [show, setShow] = useState(false);
  const [mail, setMail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleView = (item) => {
    setMail(item);
    handleShow();
  };

  const handleRecover = async () => {
    let data = await putRecoverMail(email, mail.mail_id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      if (role === "staff") {
        fetchStaffTrash();
      } else fetchAllTrash();

      handleClose();
    } else toast.error(data.EM);
  };

  const fetchStaffTrash = async () => {
    let data = await getStaffTrash(email);
    if (data && data.EC === 0) {
      setMailList(data.DT);
    }
  };

  const fetchAllTrash = async () => {
    let data = await getAllTrash(email);
    if (data && data.EC === 0) {
      setMailList(data.DT);
    }
  };

  useEffect(() => {
    const fetchStaffTrash = async () => {
      let data = await getStaffTrash(email);
      if (data && data.EC === 0) {
        setMailList(data.DT);
      }
    };

    const fetchAllTrash = async () => {
      let data = await getAllTrash(email);
      if (data && data.EC === 0) {
        setMailList(data.DT);
      }
    };

    if (role === "staff") {
      fetchStaffTrash();
    } else fetchAllTrash();
  }, [email, role]);

  return (
    <div className="trash-container">
      <div className="title">{t("trash.header")}</div>
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
                  {t("trash.field1")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("trash.field2")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("trash.field3")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("trash.field4")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16 }}>
                  {t("trash.field5")}
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
                      {row.sender_name === username ? "Me" : row.sender_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 16 }}>{row.title}</TableCell>
                    <TableCell sx={{ fontSize: 16 }}>
                      {row.created_time}
                    </TableCell>
                    <TableCell sx={{ fontSize: 16 }}>
                      {row.replied
                        ? `${t("trash.status1")}`
                        : `${t("trash.status2")}`}
                    </TableCell>
                    <TableCell>
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
                <Form.Label>{t("trash.label1")}</Form.Label>
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
                <Form.Label>{t("trash.label2")}</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={
                    !mail.receiver_email
                      ? "All Staff"
                      : mail?.receiver_email === email
                      ? `Me <${mail.receiver_email}>`
                      : `${mail.receiver_name} <${mail.receiver_email}>`
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
              {t("trash.closeBtn")}
            </Button>
            <Button variant="primary" onClick={handleRecover}>
              {t("trash.recoverBtn")}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Trash;
