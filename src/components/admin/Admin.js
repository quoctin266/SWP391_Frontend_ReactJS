import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import AdminSidebar from "./sidebar/AdminSidebar";
import "./Admin.scss";
import { Suspense } from "react";
import Language from "../guestAndCustomer/header/Language";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="body-container">
        <AdminSidebar />
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

export default function WrappedAdmin() {
  return (
    <Suspense fallback="...is loading">
      <Admin />
    </Suspense>
  );
}
