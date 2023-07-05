import "./ResetPassword.scss";
import { putResetPassword } from "../../../service/APIservice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const [currentPasswordType, setCurrentPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmNewPasswordType, setConfirmNewPasswordType] =
    useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const account_id = useSelector((state) => state.auth.account_id);

  const togglePassword = (passwordInput) => {
    switch (passwordInput) {
      case "current":
        if (currentPasswordType === "password") {
          setCurrentPasswordType("text");
          return;
        }
        setCurrentPasswordType("password");
        break;
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!oldPassword) {
      toast.error(`${t("resetPW.toast1")}`);
      return;
    }

    if (!newPassword) {
      toast.error(`${t("resetPW.toast2")}`);
      return;
    }

    if (!confirmPW) {
      toast.error(`${t("resetPW.toast3")}`);
      return;
    }

    if (confirmPW !== newPassword) {
      toast.error(`${t("resetPW.toast4")}`);
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
          <h1>{t("resetPW.title")}</h1>
          <div className="Input">
            <label htmlFor="RecentPassword">{t("resetPW.label1")}</label>
            <div className="password-container">
              <input
                type={currentPasswordType}
                id="RecentPassword"
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-]).{8,}$"
                title="Must contain at least one digit, one letter, one special character and at least 8 characters, spacing is not allowed"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                className="password-toogle"
                onClick={() => togglePassword("current")}
              >
                {currentPasswordType === "password" ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>
          <div className="Input">
            <label htmlFor="NewPassword">{t("resetPW.label2")}</label>
            <div className="password-container">
              <input
                type={newPasswordType}
                id="NewPassword"
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-]).{8,}$"
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
            <label htmlFor="ReEnterNewPassword">{t("resetPW.label3")}</label>
            <div className="password-container">
              <input
                type={confirmNewPasswordType}
                id="ReEnterNewPassword"
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-]).{8,}$"
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
            <button
              className="back-btn"
              onClick={() => navigate("/account-detail")}
            >
              {t("resetPW.backBtn")}
            </button>
            <button className="Confirm" type="submit">
              {t("resetPW.confirmBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <ResetPassword />
    </Suspense>
  );
}
