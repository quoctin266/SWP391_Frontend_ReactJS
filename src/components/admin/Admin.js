import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import AdminHeader from "./header/AdminHeader";

const Admin = () => {
  return (
    <div className="admin-container">
      <Scrollbars
        style={{ height: "100vh" }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <AdminHeader />
        <div className="body-container">
          <Outlet />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Admin;
