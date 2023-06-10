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

const Header = () => {
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
                Log out
              </Button>
            </>
          ) : (
            <Button
              variant="success"
              className="signin-button"
              onClick={() => navigate("/login")}
            >
              Log in
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
                {role === "customer" || role === "" ? (
                  <NavLink to="/booking" className="navbar-brand">
                    BOOK NOW
                  </NavLink>
                ) : (
                  <NavLink to={`/${role}`} className="navbar-brand">
                    WORKSPACE
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
