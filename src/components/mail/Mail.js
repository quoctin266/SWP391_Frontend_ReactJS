import "./Mail.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Suspense } from "react";
import MailSidebar from "./MailSidebar";
import Language from "../guestAndCustomer/header/Language";
import { Outlet } from "react-router-dom";

const Mail = () => {
  return (
    <div className="mail-container">
      <div className="body-container">
        <MailSidebar />
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

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <Mail />
    </Suspense>
  );
}
