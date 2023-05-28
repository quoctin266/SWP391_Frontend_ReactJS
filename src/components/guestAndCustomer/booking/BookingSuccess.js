import "./BookingSuccess.scss";
import cele from "../../../assets/image/cele.png";
import cargo from "../../../assets/image/cargo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
const BookingSuccess = () => {
  return <div className="booking-success-container">
    
      <div className="booking-title">
        <img src={cele} alt="cele icon" className="cele" />
        <div className="title"><h2>BOOKING SUCCESS</h2></div>
      </div>
      <div className="booking-success-info">
        <div className="id">
          <h3>Transaction ID</h3>
          <h4>TransactionId1</h4>
          <h4>TransactionId1</h4>
          <h4>TransactionId1</h4>
        </div>
        <div className="Date">
          <h3>Date</h3>
          <h4>06/06/2023</h4>
          <h4>25/06/2023</h4>
          <h4>30/06/2023</h4>
        </div>
        <div className="estimated-time">
          <h3>Estimated time</h3>
          <h4>22/06/2023</h4>
          <h4>20/06/2023</h4>
          <h4>08/07/2023</h4>

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
                <h3 className="Home"><h3 className="home">Back To Home</h3></h3>

              </NavLink>
              <NavLink to="/track" className="nav-link">
                <h3 className="Track"> <h3 className="track">Track order</h3></h3>

              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    
  </div>;
};

export default BookingSuccess;
