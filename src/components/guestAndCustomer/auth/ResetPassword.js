import "./ResetPassword.scss";
import { putResetPassword } from "../../../service/APIservice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const account_id = useSelector((state) => state.auth.account_id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!oldPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter your new password.");
      return;
    }

    if (!confirmPW) {
      toast.error("Must confirm new password.");
      return;
    }

    if (confirmPW !== newPassword) {
      toast.error("Confirm password and new password must be the same.");
      return;
    }

    let data = await putResetPassword(account_id, oldPassword, newPassword);
    if (data?.DT) {
      dispatch(updatePassword(data.DT));
      toast.success(data.EM);
      navigate("/account-detail");
    } else toast.error(data.EM);
  };

  return (
    <div className="reset-password-container">
      <div className="ResetPasswordBox">
        <form className="ResetPasswordForm" onSubmit={(e) => handleSubmit(e)}>
          <h1>Reset Password</h1>
          <div className="Input">
            <label htmlFor="RecentPassword">Recent Password</label>
            <input
              type="password"
              id="RecentPassword"
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-]).{8,}$"
              title="Must contain at least one digit, one letter, one special character and at least 8 characters, spacing is not allowed"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="Input">
            <label htmlFor="NewPassword">New Password</label>
            <input
              type="password"
              id="NewPassword"
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-]).{8,}$"
              title="Must contain at least one digit, one letter, one special character and at least 8 characters, spacing is not allowed"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="Input">
            <label htmlFor="ReEnterNewPassword">Re-Enter New Password</label>
            <input
              type="password"
              id="ReEnterNewPassword"
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-]).{8,}$"
              title="Must contain at least one digit, one letter, one special character and at least 8 characters, spacing is not allowed"
              value={confirmPW}
              onChange={(e) => setConfirmPW(e.target.value)}
            />
          </div>
          <div className="btn-group">
            <button
              className="back-btn"
              onClick={() => navigate("/account-detail")}
            >
              Back
            </button>
            <button className="Confirm" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
