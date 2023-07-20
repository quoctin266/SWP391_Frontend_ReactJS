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
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

const ChangePassword = () => {
  const { t } = useTranslation();
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
      toast.error(`${t("changePW.toast1")}`);
      return;
    }

    if (!confirmPW) {
      toast.error(`${t("changePW.toast2")}`);
      return;
    }

    if (newPassword !== confirmPW) {
      toast.error(`${t("changePW.toast3")}`);
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
          <h1>{t("changePW.title")}</h1>
          <div className="Input">
            <label htmlFor="NewPassword">{t("changePW.label1")}</label>
            <div className="password-container">
              <input
                placeholder={t("changePW.note1")}
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
            <label htmlFor="ReEnterNewPassword">{t("changePW.label2")}</label>
            <div className="password-container">
              <input
                placeholder={t("changePW.note2")}
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
              {t("changePW.cancelBtn")}
            </button>
            <button className="Confirm" type="submit">
              {t("changePW.confirmBtn1")}
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
          <Modal.Title>{t("changePW.cancelTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("changePW.cancelNote")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancel}>
            {t("changePW.closeBtn")}
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            {t("changePW.confirmBtn2")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default function WrappedChangePassword() {
  return (
    <Suspense fallback="...is loading">
      <ChangePassword />
    </Suspense>
  );
}
