import "./ManagerSidebar.scss";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ManagerSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="manager-sidebar-container">
      <div style={{ display: "flex", height: "83vh", overflow: "hidden" }}>
        <CDBSidebar textColor="#fff" backgroundColor="#3E363F">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <div
              className="text-decoration-none"
              style={{ color: "inherit", cursor: "pointer" }}
              onClick={() => navigate("/staff")}
            >
              Manager
            </div>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink to="/manager/manage-service">
                <CDBSidebarMenuItem icon="taxi">
                  Manage service
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/manager/manage-route-trip">
                <CDBSidebarMenuItem icon="road">
                  Manage route and trip
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/manager/manage-web-content">
                <CDBSidebarMenuItem icon="folder">
                  Manage web content
                </CDBSidebarMenuItem>
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

export default ManagerSidebar;
