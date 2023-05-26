import "./StaffSidebar.scss";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const StaffSidebar = () => {
  return (
    <div className="staff-sidebar-container">
      <div style={{ display: "flex", height: "83vh", overflow: "hidden" }}>
        <CDBSidebar textColor="#fff" backgroundColor="#3E363F">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <div className="text-decoration-none" style={{ color: "inherit" }}>
              Staff
            </div>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink to="/staff/list-order">
                <CDBSidebarMenuItem icon="columns">
                  Booking order
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/staff/schedule">
                <CDBSidebarMenuItem icon="table">Schedule</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/staff/feedback">
                <CDBSidebarMenuItem icon="user">Feedback</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              Bird Travel
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default StaffSidebar;
