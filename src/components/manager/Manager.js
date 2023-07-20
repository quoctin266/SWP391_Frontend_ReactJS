import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import ManagerSidebar from "./sidebar/ManagerSidebar";
import "./Manager.scss";
import { Suspense } from "react";
import Language from "../guestAndCustomer/header/Language";

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
          <div className="tool">
            <Language className="language" />
          </div>
          <Outlet />
        </Scrollbars>
      </div>
    </div>
  );
};

export default function WrappedManager() {
  return (
    <Suspense fallback="...is loading">
      <Manager />
    </Suspense>
  );
}
