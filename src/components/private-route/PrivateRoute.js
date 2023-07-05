import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let role = useSelector((state) => state.auth.role);

  // prevent access to features if not log in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  //   restrict access of customer
  if (
    role === "customer" &&
    (props.children.type.name === "Staff" ||
      props.children.type.name === "Manager" ||
      props.children.type.name === "Admin")
  ) {
    return <Navigate to="/access-not-allowed" />;
  }

  // only customer can check booking history
  if (
    role !== "customer" &&
    (props.children.type.name === "ViewHistory" ||
      props.children.type.name === "ManageSender")
  ) {
    return <Navigate to="/access-not-allowed" />;
  }

  // restrict access of staff
  if (
    role === "staff" &&
    (props.children.type.name === "Booking" ||
      props.children.type.name === "BookingSuccess" ||
      props.children.type.name === "Manager" ||
      props.children.type.name === "Admin")
  ) {
    return <Navigate to="/access-not-allowed" />;
  }

  // restrict access of manager
  if (
    role === "manager" &&
    (props.children.type.name === "Booking" ||
      props.children.type.name === "BookingSuccess" ||
      props.children.type.name === "Staff" ||
      props.children.type.name === "Admin")
  ) {
    return <Navigate to="/access-not-allowed" />;
  }

  // restrict access of admin
  if (
    role === "admin" &&
    (props.children.type.name === "Booking" ||
      props.children.type.name === "BookingSuccess" ||
      props.children.type.name === "Staff" ||
      props.children.type.name === "Manager")
  ) {
    return <Navigate to="/access-not-allowed" />;
  }

  return <> {props.children} </>;
};

export default PrivateRoute;
