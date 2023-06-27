import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = (props) => {
  let resetCode = useSelector((state) => state.auth.resetCode);
  let recoverEmail = useSelector((state) => state.auth.recoverEmail);
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (
    !(!resetCode && recoverEmail) &&
    !isAuthenticated &&
    props.children.type.name === "ChangePassword"
  ) {
    return <Navigate to="/login" />;
  }

  if (
    !(!resetCode && recoverEmail) &&
    isAuthenticated &&
    props.children.type.name === "ChangePassword"
  ) {
    return <Navigate to="/" />;
  }

  if (
    isAuthenticated &&
    (props.children.type.name === "Login" ||
      props.children.type.name === "Register")
  ) {
    return <Navigate to="/" />;
  }

  return <> {props.children} </>;
};

export default Protected;
