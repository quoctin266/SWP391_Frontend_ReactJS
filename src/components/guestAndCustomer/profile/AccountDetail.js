import ProfilePic from '../../../assets/image/User_Icon.jpg';
import GreenCheck from"../../../assets/image/Green-Check.jpg";
import RedCross from "../../../assets/image/Red-X.jpg"
import "./AccountDetails.scss"

const AccountDetail = () => {
  return (
  <div className="account-detail-container">
    <div className="ProfileOptions">
      <img src={ProfilePic}/>
      <button>Edit Profile</button>
      <button>View History</button>
    </div>
    <form action="" method="get" className="ProfileForm">
      <div class="Input"><label for="email">Email</label><input type="email" name="email"/></div>
      <div class="Input"><label for="fullname">Full Name</label><input type="text" name="fullname"/></div>
      <div class="Input"><label for="birthday">Birthday</label><input type="date" name="birthday"/></div>
      <div class="Input"><label for="phone">Phone</label><input type="tel" name="phone"/></div>
      <div class="Input"><label for="address">Address</label><input type="text" name="address"/></div>
      <div className="ProfileFormSave">
        <a href=""><img src={GreenCheck}/></a>
        <a href=""><img src={RedCross}/></a>
      </div>
    </form>
  </div>
  )
};

export default AccountDetail;
