import "./Header.scss";
import logo from "../../assets/image/logo.jpg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="banner-container">
        <img src={logo} alt="page logo" className="logo-image" />
        <Button variant="success" className="signin-button">
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
            <Navbar.Brand href="#home">Bird Travel</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/home" className="nav-link">
                  Home
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
                <Navbar.Brand href="#book">BOOK NOW</Navbar.Brand>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
export default Header;
