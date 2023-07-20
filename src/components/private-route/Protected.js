import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = (props) => {
  let resetCode = useSelector((state) => state.auth.resetCode);
  let recoverEmail = useSelector((state) => state.auth.recoverEmail);
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (
    !(!resetCode && recoverEmail) &&
    !isAuthenticated &&
    props.children.type.name === "WrappedChangePassword"
  ) {
    return <Navigate to="/login" />;
  }

  if (
    !(!resetCode && recoverEmail) &&
    isAuthenticated &&
    props.children.type.name === "WrappedChangePassword"
  ) {
    return <Navigate to="/" />;
  }

  if (
    isAuthenticated &&
    (props.children.type.name === "WrappedLogin" ||
      props.children.type.name === "WrappedRegister")
  ) {
    return <Navigate to="/" />;
  }

  return <> {props.children} </>;
};

export default Protected;
