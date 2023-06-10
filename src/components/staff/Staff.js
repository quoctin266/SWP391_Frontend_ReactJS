import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import StaffSidebar from "./sidebar/StaffSidebar";
import "./Staff.scss";

const Staff = () => {
  return (
    <div className="staff-container">
           <div className="body-container">
        <StaffSidebar />
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

export default Staff;
