import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import ManagerHeader from "./header/ManagerHeader";

const Manager = () => {
  return (
    <div className="manager-container">
      <Scrollbars
        style={{ height: "100vh" }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <ManagerHeader />
        <div className="body-container">
          <Outlet />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Manager;
