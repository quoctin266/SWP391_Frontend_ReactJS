import "./Header.scss";
import logo from "../../../assets/image/logo.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../../redux/slices/authSlice";
import NavDropdown from "react-bootstrap/NavDropdown";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { validateEmail } from "../../../utils/reuseFunction";
import { toast } from "react-toastify";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Email";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const username = useSelector((state) => state.auth.username);

  const handleClose = () => {
    setInvalidEmail(false);
    setEmail("");
    setShow(false);
  };
  const handleChangeEmail = (value) => {
    setEmail(value);
    setInvalidEmail(false);
  };

  const handleSubscribe = () => {
    if (!email || !validateEmail(email)) {
      toast.error(`${t("header.toast1")}`);
      setInvalidEmail(true);
      return;
    }
    toast.success(`${t("header.toast2")}`);
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="header-container">
      <Container style={{ padding: "0" }}>
        <div className="banner-container">
          <img src={logo} alt="page logo" className="logo-image" />
          <div className="language">
            {isAuthenticated && (
              <Badge
                color="primary"
                className="mail"
                onClick={() => navigate("/mail")}
              >
                <MailIcon color="action" />
              </Badge>
            )}
            <Language />
          </div>

          {isAuthenticated ? (
            <>
              <button
                variant="success"
                className="profile-button"
                onClick={() => navigate("/account-detail")}
              >
                <FaUserCircle />
                <span className="username">{username}</span>
              </button>
              <Button
                variant="success"
                className="logout-button"
                onClick={handleLogout}
              >
                {t("header.logoutBtn")}
              </Button>
            </>
          ) : (
            <Button
              variant="success"
              className="signin-button"
              onClick={() => navigate("/login")}
            >
              {t("header.loginBtn")}
            </Button>
          )}
        </div>
      </Container>
      <div className="navigation-container">
        <Container>
          <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            className="navigation-bar"
          >
            <NavLink to="/" end className="navbar-brand">
              Bird Travel
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/home" className="nav-link home">
                  {t("header.home")}
                </NavLink>
                <NavLink to="/track" className="nav-link">
                  {t("header.track")}
                </NavLink>
                <NavDropdown
                  title={t("header.services")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate("/services")}>
                    {t("header.relocation")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/view-route")}>
                    {t("header.route")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/price")}>
                    {t("header.ground")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setShow(true)}>
                    {t("header.air")}
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title={t("header.support")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate("/faqs")}>
                    {t("header.faqs")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/contact")}>
                    {t("header.contact")}
                  </NavDropdown.Item>
                </NavDropdown>
                <NavLink to="/review" className="nav-link">
                  {t("header.review")}
                </NavLink>
                <NavLink to="/about-us" className="nav-link aboutus">
                  {t("header.about")}
                </NavLink>
              </Nav>
              <div className="book-btn-container">
                {role === "customer" || role === "" ? (
                  <NavLink to="/booking" className="navbar-brand">
                    {t("header.bookBtn")}
                  </NavLink>
                ) : (
                  <NavLink to={`/${role}`} className="navbar-brand">
                    {t("header.workBtn")}
                  </NavLink>
                )}
              </div>
            </Navbar.Collapse>
          </Navbar>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("header.title")}</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body style={{ fontSize: "1.1em" }}>
                {t("header.text1")}
                <br />
                <span style={{ fontWeight: "600" }}>
                  {t("header.text2")}
                </span>{" "}
                {t("header.text3")}
                <Col style={{ margin: "3% 0" }}>
                  <Form.Label>{t("header.label1")}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t("header.note1")}
                    isInvalid={invalidEmail}
                    value={email}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                  />
                </Col>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t("header.closeBtn")}
                </Button>
                <Button variant="primary" onClick={handleSubscribe}>
                  {t("header.subscribeBtn")}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Container>
      </div>
    </div>
  );
};
export default Header;
