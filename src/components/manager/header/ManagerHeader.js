import "./ManagerHeader.scss";
import Button from "react-bootstrap/Button";
import logo from "../../../assets/image/logo.jpg";
import { VscAccount } from "react-icons/vsc";

const ManagerHeader = () => {
  return (
    <div className="manager-header-container">
      <div className="banner-container">
        <img src={logo} alt="page logo" className="logo-image" />
        <div className="btn-group">
          <Button variant="success" className="profile-button">
            <VscAccount className="profile-icon" />
            Manager
          </Button>
          <div className="logout">Log out</div>
        </div>
      </div>
    </div>
  );
};

export default ManagerHeader;
