import "./Header.scss";
import logo from "../../assets/image/logo.jpg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <div className="header-container">
      <div className="banner-container">
        <img src={logo} alt="page logo" className="logo-image" />
        <Button variant="success" className="signin-button">
          Sign in
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
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Services</Nav.Link>
                <Nav.Link href="#pricing">Price</Nav.Link>
                <Nav.Link href="#faq">FAQs</Nav.Link>
                <Nav.Link href="#about">About us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <div className="brand-container">
              <Navbar.Brand href="#home">BIRD TRAVEL</Navbar.Brand>
            </div>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
export default Header;
