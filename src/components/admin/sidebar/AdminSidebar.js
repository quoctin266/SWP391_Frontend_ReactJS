import "./AdminSidebar.scss";
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

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="admin-sidebar-container">
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <CDBSidebar textColor="#fff" backgroundColor="#3E363F">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <div
              className="text-decoration-none"
              style={{ color: "inherit", cursor: "pointer" }}
              onClick={() => navigate("/admin")}
            >
              Admin
            </div>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink to="/admin/dashboard">
                <CDBSidebarMenuItem icon="chart-bar">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/admin/manage-account">
                <CDBSidebarMenuItem icon="users">
                  Manage Account
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

export default AdminSidebar;
