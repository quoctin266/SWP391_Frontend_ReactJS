import "./StaffHeader.scss";
import logo from "../../../assets/image/logo.jpg";
import { VscAccount } from "react-icons/vsc";

const StaffHeader = () => {
  return (
    <div className="staff-header-container">
      <div className="banner-container">
        <img src={logo} alt="page logo" className="logo-image" />
        <div className="btn-group">
          <button className="profile-button">
            <VscAccount className="profile-icon" />
            Staff
          </button>
          <div className="logout">Log out</div>
        </div>
      </div>
    </div>
  );
};

export default StaffHeader;
