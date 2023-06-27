import "./ChangePassword.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { clearEmail } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { putChangePW } from "../../../service/APIservice";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmNewPasswordType, setConfirmNewPasswordType] =
    useState("password");
  const [showCancel, setShowCancel] = useState(false);

  let recoverEmail = useSelector((state) => state.auth.recoverEmail);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowCancel = (e) => {
    e.preventDefault();
    setShowCancel(true);
  };
  const handleCloseCancel = () => setShowCancel(false);

  const handleCancel = () => {
    dispatch(clearEmail());
    navigate("/login");
    handleCloseCancel();
  };

  const togglePassword = (passwordInput) => {
    switch (passwordInput) {
      case "new":
        if (newPasswordType === "password") {
          setNewPasswordType("text");
          return;
        }
        setNewPasswordType("password");
        break;
      case "confirmNew":
        if (confirmNewPasswordType === "password") {
          setConfirmNewPasswordType("text");
          return;
        }
        setConfirmNewPasswordType("password");
        break;
      default:
        return;
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(e);
    if (!newPassword) {
      toast.error("Please enter new password.");
      return;
    }

    if (!confirmPW) {
      toast.error("Please confirm your password.");
      return;
    }

    if (newPassword !== confirmPW) {
      toast.error("Password and confirm password must be the same.");
      return;
    }

    let data = await putChangePW(recoverEmail, newPassword);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      dispatch(clearEmail());
      navigate("/login");
    } else toast.error(data.EM);
  };

  return (
    <div className="changePW-container">
      <div className="ResetPasswordBox">
        <form className="ResetPasswordForm" onSubmit={handleResetPassword}>
          <h1>Reset Password</h1>
          <div className="Input">
            <label htmlFor="NewPassword">New Password</label>
            <div className="password-container">
              <input
                placeholder="Enter new password"
                type={newPasswordType}
                id="NewPassword"
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-])\S{8,}$"
                title="Must contain at least one digit, one letter, one special character and at least 8 characters, spacing is not allowed"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="password-toogle"
                onClick={() => togglePassword("new")}
              >
                {newPasswordType === "password" ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>
          <div className="Input">
            <label htmlFor="ReEnterNewPassword">Re-Enter New Password</label>
            <div className="password-container">
              <input
                placeholder="Confirm new password"
                type={confirmNewPasswordType}
                id="ReEnterNewPassword"
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-])\S{8,}$"
                title="Must contain at least one digit, one letter, one special character and at least 8 characters, spacing is not allowed"
                value={confirmPW}
                onChange={(e) => setConfirmPW(e.target.value)}
              />
              <span
                className="password-toogle"
                onClick={() => togglePassword("confirmNew")}
              >
                {confirmNewPasswordType === "password" ? (
                  <BiShow />
                ) : (
                  <BiHide />
                )}
              </span>
            </div>
          </div>
          <div className="btn-group">
            <button className="back-btn" onClick={handleShowCancel}>
              Cancel
            </button>
            <button className="Confirm" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>

      <Modal
        show={showCancel}
        onHide={handleCloseCancel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to cancel current process and return to login page?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChangePassword;
