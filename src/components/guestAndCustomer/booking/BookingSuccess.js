import "./BookingSuccess.scss";
import cele from "../../../assets/image/cele.png";
import cargo from "../../../assets/image/cargo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useParams, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect } from "react";
import { postSendBill } from "../../../service/APIservice";
import { toast } from "react-toastify";
import { removeBookingData } from "../../../redux/slices/bookSlice";

const BookingSuccess = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const orderID = useSelector((state) => state.book.orderID);
  const estimate = useSelector((state) => state.book.estimate);
  const created = useSelector((state) => state.book.created);
  const name = useSelector((state) => state.book.name);
  const phone = useSelector((state) => state.book.phone);
  const address = useSelector((state) => state.book.address);
  const initCost = useSelector((state) => state.book.initCost);
  const extraBirdCost = useSelector((state) => state.book.extraBirdCost);
  const unitCost = useSelector((state) => state.book.unitCost);
  const packageCost = useSelector((state) => state.book.packageCost);
  const totalCost = useSelector((state) => state.book.totalCost);
  const distance = useSelector((state) => state.book.distance);
  const extraBird = useSelector((state) => state.book.extraBird);
  const capacityUnit = useSelector((state) => state.book.capacityUnit);
  const packageName = useSelector((state) => state.book.package);
  const invoiceSent = useSelector((state) => state.book.invoiceSent);

  let { status } = useParams();

  let costSummary = {
    initCost: initCost,
    extraBirdCost: extraBirdCost,
    unitCost: unitCost,
    packageCost: packageCost,
    totalCost: totalCost,
    distance: distance,
    extraBird: extraBird,
    capacityUnit: capacityUnit,
    packageName: packageName,
  };

  let customerInfo = {
    name: name,
    phone: phone,
    address: address,
  };

  useEffect(() => {
    const sendBill = async () => {
      let data = await postSendBill(
        costSummary,
        customerInfo,
        orderID,
        created,
        email
      );
      if (data && data.EC === 0) {
        toast.success(data.EM);
        dispatch(removeBookingData());
      } else toast.error(data.EM);
    };
    if (status === "ok" && !invoiceSent) {
      sendBill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status !== "ok") {
    return <Navigate to="/" />;
  }

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
