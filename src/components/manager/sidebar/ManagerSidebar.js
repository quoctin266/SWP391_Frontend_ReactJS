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
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

const ManagerSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="manager-sidebar-container">
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <CDBSidebar textColor="#fff" backgroundColor="#3E363F">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <div
              className="text-decoration-none"
              style={{ color: "inherit", cursor: "pointer" }}
              onClick={() => navigate("/manager")}
            >
              Manager
            </div>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink to="/manager/manage-service">
                <CDBSidebarMenuItem icon="money-check">
                  Manage price and payment
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/manager/manage-route-trip">
                <CDBSidebarMenuItem icon="road">
                  Manage transportation
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/manager/manage-web-content">
                <CDBSidebarMenuItem icon="folder">
                  Manage web content
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/login">
                <CDBSidebarMenuItem icon="power-off" onClick={handleLogout}>
                  Logout
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
              <span className="sidebar-footer" onClick={() => navigate("/")}>
                <AiOutlineHome />
                Bird Travel
              </span>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default ManagerSidebar;
