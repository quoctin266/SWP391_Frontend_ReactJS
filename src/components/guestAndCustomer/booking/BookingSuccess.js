import "./BookingSuccess.scss";
import cele from "../../../assets/image/cele.png";
import cargo from "../../../assets/image/cargo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const BookingSuccess = () => {
  return (
    <div className="booking-success-container">
      <div className="booking-title">
        <img src={cele} alt="cele icon" className="cele" />
        <div className="title">
          <h2>BOOKING SUCCESS</h2>
        </div>
      </div>
      <div className="booking-success-info">
        <div className="id">
          <div className="transaction-title">Transaction ID</div>
          <div className="transaction-info">TransactionId1</div>
        </div>
        <div className="Date">
          <div className="date-title">Date</div>
          <div className="date-info">06/06/2023</div>
        </div>
        <div className="estimated-time">
          <div className="estimated-title">Estimated arrival time</div>
          <div className="estimated-info">22/06/2023</div>
        </div>
        <div className="pic">
          <img src={cargo} alt="cargo icon" className="cargo" />
        </div>
      </div>
      <div className="footer">
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="footer-bar"
        >
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="butt">
              <NavLink to="/home" className="nav-link">
                <div className="Home">
                  <h3 className="home">Back To Home</h3>
                </div>
              </NavLink>
              <NavLink to="/track" className="nav-link">
                <div className="Track">
                  <h3 className="track">Track order</h3>
                </div>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default BookingSuccess;
