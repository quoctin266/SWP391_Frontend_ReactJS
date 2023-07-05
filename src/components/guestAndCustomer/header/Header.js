import "./Header.scss";
import logo from "../../../assets/image/logo.jpg";
import Button from "react-bootstrap/Button";
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

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const username = useSelector((state) => state.auth.username);

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
                  <NavDropdown.Item onClick={() => navigate("/price")}>
                    {t("header.ground")}
                  </NavDropdown.Item>
                  <NavDropdown.Item>{t("header.air")}</NavDropdown.Item>
                </NavDropdown>
                <NavLink to="/faqs" className="nav-link">
                  {t("header.faqs")}
                </NavLink>
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
        </Container>
      </div>
    </div>
  );
};
export default Header;
