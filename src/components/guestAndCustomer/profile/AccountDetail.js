import ProfilePic from "../../../assets/image/User_Icon.jpg";
import GreenCheck from "../../../assets/image/Green-Check.jpg";
import RedCross from "../../../assets/image/Red-X.jpg";
import "./AccountDetails.scss";
import { useNavigate } from "react-router-dom";

const AccountDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="account-detail-container">
      <div className="ProfileOptions">
        <img src={ProfilePic} alt="profile" />
        <button>Edit Profile</button>
        <button onClick={() => navigate("/view-history")}>View History</button>
      </div>
      <form action="" method="get" className="ProfileForm">
        <div class="Input">
          <label for="email">Email</label>
          <input type="email" name="email" />
        </div>
        <div class="Input">
          <label for="fullname">Full Name</label>
          <input type="text" name="fullname" />
        </div>
        <div class="Input">
          <label for="birthday">Birthday</label>
          <input type="date" name="birthday" />
        </div>
        <div class="Input">
          <label for="phone">Phone</label>
          <input type="tel" name="phone" />
        </div>
        <div class="Input">
          <label for="address">Address</label>
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
  );
};

export default AccountDetail;
