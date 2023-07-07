import "./MailSidebar.scss";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils/reuseFunction";
import { postCreateMail } from "../../service/APIservice";

const MailSidebar = () => {
  const { t } = useTranslation();
  let role = useSelector((state) => state.auth.role);
  let email = useSelector((state) => state.auth.email);
  let username = useSelector((state) => state.auth.username);
  let phone = useSelector((state) => state.auth.phone);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [invalidRecipient, setInvalidRecipient] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

  const handleClose = () => {
    setRecipient("");
    setTitle("");
    setNote("");
    setInvalidRecipient(false);
    setInvalidTitle(false);
    setInvalidNote(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChangeRecipient = (value) => {
    setRecipient(value);
    setInvalidRecipient(false);
  };

  const handleChangeTitle = (value) => {
    setTitle(value);
    setInvalidTitle(false);
  };

  const handleChangeNote = (value) => {
    setNote(value);
    setInvalidNote(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (role !== "customer") {
      if (!recipient) {
        toast.error("Please specify recipient email.");
        setInvalidRecipient(true);
        return;
      }

      if (!validateEmail(recipient)) {
        toast.error("Invalid email format.");
        setInvalidRecipient(true);
        return;
      }
    }

    if (!title) {
      toast.error("Please fill in subject.");
      setInvalidTitle(true);
      return;
    }

    if (!note) {
      toast.error("Please enter mail content.");
      setInvalidNote(true);
      return;
    }

    let data = null;
    if (role === "customer") {
      data = await postCreateMail(username, email, phone, note, null, title);
    } else {
      data = await postCreateMail(
        username,
        email,
        phone,
        note,
        recipient,
        title
      );
    }

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      navigate("/mail");
    } else toast.error(data.EM);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="mail-sidebar-container">
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <CDBSidebar textColor="#fff" backgroundColor="#3E363F">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <div
              className="text-decoration-none"
              style={{ color: "inherit", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Bird Travel
            </div>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <CDBSidebarMenuItem
                icon="pen"
                className="composeBtn"
                onClick={handleShow}
              >
                Compose
              </CDBSidebarMenuItem>
              <NavLink to="/mail/inbox">
                <CDBSidebarMenuItem icon="inbox">Inbox</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/mail/sent">
                <CDBSidebarMenuItem icon="paper-plane">Sent</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/mail/trash">
                <CDBSidebarMenuItem icon="trash">Trash</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/login">
                <CDBSidebarMenuItem icon="power-off" onClick={handleLogout}>
                  Logout
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              <span className="sidebar-footer" onClick={() => navigate("/")}>
                <AiOutlineHome />
                Bird Travel
              </span>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Message</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSend}>
          <Modal.Body style={{ padding: "3% 5%", fontSize: "1.1em" }}>
            <Row className="mb-3" style={{ alignItems: "baseline" }}>
              <Col className="col-2">
                <Form.Label>Recipient:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Recipient email address"
                  readOnly={role === "customer"}
                  isInvalid={invalidRecipient}
                  value={role === "customer" ? "All Staff" : recipient}
                  onChange={(e) => handleChangeRecipient(e.target.value)}
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
                  isInvalid={invalidTitle}
                  value={title}
                  onChange={(e) => handleChangeTitle(e.target.value)}
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
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MailSidebar;
