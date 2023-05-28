import "./Header.scss";
import logo from "../../../assets/image/logo.jpg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="banner-container">
        <img src={logo} alt="page logo" className="logo-image" />
        <Button
          variant="success"
          className="signin-button"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      </div>
      <div className="navigation-container">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="navigation-bar"
        >
          <Container>
            <NavLink to="/" end className="navbar-brand">
              Bird Travel
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/track" className="nav-link">
                  Track
                </NavLink>
                <NavLink to="/services" className="nav-link">
                  Services
                </NavLink>
                <NavLink to="/price" className="nav-link">
                  Price
                </NavLink>
                <NavLink to="/faqs" className="nav-link">
                  FAQs
                </NavLink>
                <NavLink to="/about-us" className="nav-link">
                  About us
                </NavLink>
              </Nav>
              <div className="book-btn-container">
                <NavLink to="/booking" className="navbar-brand">
                  BOOK NOW
                </NavLink>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
export default Header;
