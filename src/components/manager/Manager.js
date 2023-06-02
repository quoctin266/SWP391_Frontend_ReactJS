import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import ManagerSidebar from "./sidebar/ManagerSidebar";
import "./Manager.scss";

const Manager = () => {
  return (
    <div className="manager-container">
            <div className="body-container">
        <ManagerSidebar />
        <Scrollbars
          style={{ height: "100vh" }}
          autoHide
          // Hide delay in ms
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}
        >
          <Outlet />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Manager;
