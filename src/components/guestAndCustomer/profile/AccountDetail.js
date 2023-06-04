import ProfilePic from "../../../assets/image/User_Icon.jpg";
import GreenCheck from "../../../assets/image/Green-Check.jpg";
import RedCross from "../../../assets/image/Red-X.jpg";
import "./AccountDetails.scss";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const AccountDetail = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <Container className="account-detail-outer">
      <div className="account-detail-container">
        <div className="ProfileOptions">
          <img src={ProfilePic} alt="profile" />
          <button>Edit Profile</button>
          {role === "customer" && (
            <button onClick={() => navigate("/view-history")}>
              View Orders
            </button>
          )}
        </div>
        <form action="" method="get" className="ProfileForm">
          <div className="Input">
            <label>Email</label>
            <input type="email" name="email" />
          </div>
          <div className="Input">
            <label>Full Name</label>
            <input type="text" name="fullname" />
          </div>
          <div className="Input">
            <label>Birthday</label>
            <input type="date" name="birthday" />
          </div>
          <div className="Input">
            <label>Phone</label>
            <input type="tel" name="phone" />
          </div>
          <div className="Input">
            <label>Address</label>
            <input type="text" name="address" />
          </div>
          <div className="ProfileFormSave">
            <a href="/account-detail">
              <img src={GreenCheck} alt="confirm" />
            </a>
            <a href="/account-detail">
              <img src={RedCross} alt="cancel" />
            </a>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AccountDetail;
