import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import StaffSidebar from "./sidebar/StaffSidebar";
import "./Staff.scss";
import { Suspense } from "react";
import Language from "../guestAndCustomer/header/Language";

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
          <div className="tool">
            <Language className="language" />
          </div>
          <Outlet />
        </Scrollbars>
      </div>
    </div>
  );
};

export default function WrappedStaff() {
  return (
    <Suspense fallback="...is loading">
      <Staff />
    </Suspense>
  );
}
