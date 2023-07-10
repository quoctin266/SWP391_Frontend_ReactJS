import "./BookingSuccess.scss";
import cele from "../../../assets/image/cele.png";
import cargo from "../../../assets/image/cargo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";

const BookingSuccess = () => {
  const orderID = useSelector((state) => state.book.orderID);
  const estimate = useSelector((state) => state.book.estimate);
  const created = useSelector((state) => state.book.created);

  return (
    <Container className="booking-success-outer">
      <div className="booking-success-container">
        <div className="booking-title">
          <img src={cele} alt="cele icon" className="cele" />
          <div className="title">
            <h2>BOOKING SUCCESS</h2>
          </div>
        </div>
        <div className="booking-success-info">
          <div className="id">
            <div className="transaction-title">Booking ID</div>
            <div className="transaction-info">{orderID}</div>
          </div>
          <div className="Date">
            <div className="date-title">Order Date</div>
            <div className="date-info">
              {moment(created).format("MMM DD YYYY HH:mm")}
            </div>
          </div>
          <div className="estimated-time">
            <div className="estimated-title">Estimated arrival date</div>
            <div className="estimated-info">
              {moment(estimate).format("DD-MM-YYYY")}
            </div>
          </div>
          <div className="pic" style={{ width: "20%", display: "grid" }}>
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
    </Container>
  );
};

export default BookingSuccess;
