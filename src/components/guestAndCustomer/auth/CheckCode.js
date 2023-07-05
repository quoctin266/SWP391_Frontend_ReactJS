import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./CheckCode.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassCode,
  recoverPassword,
} from "../../../redux/slices/authSlice";
import { postRecoverPW } from "../../../service/APIservice";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

const CheckCode = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetCode = useSelector((state) => state.auth.resetCode);
  const recoverEmail = useSelector((state) => state.auth.recoverEmail);

  const handleSubmitCode = (e) => {
    e.preventDefault();

    if (!recoverEmail) {
      toast.error(`${t("checkcode.toast1")}`);
      return;
    }

    if (code && +code === resetCode) {
      dispatch(resetPassCode());
      navigate("/change-password");
    } else toast.error(`${t("checkcode.toast2")}`);
  };

  const handleResendCode = async () => {
    if (!recoverEmail) {
      toast.error(`${t("checkcode.toast1")}`);
      return;
    }

    let data = await postRecoverPW(recoverEmail);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      dispatch(recoverPassword(data.DT));
    } else toast.error(data.EM);
  };

  return (
    <div className="check-code-container">
      <div className="ResetPasswordBox">
        <form className="ResetPasswordForm" onSubmit={handleSubmitCode}>
          <h1>{t("checkcode.title")}</h1>
          <div className="Input">
            <label htmlFor="passcode">{t("checkcode.label")}</label>
            <div className="password-container">
              <input
                type="number"
                id="passcode"
                min={0}
                placeholder={t("checkcode.note1")}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          <div className="note">
            <i>{t("checkcode.note2")}</i>
            <br />
            <span onClick={handleResendCode}>
              <b>{t("checkcode.click")}</b>
            </span>{" "}
            {t("checkcode.new")}
          </div>
          <div className="btn-group">
            <button
              className="back-btn"
              onClick={() => navigate("/forget-password")}
            >
              {t("checkcode.backBtn")}
            </button>
            <button className="Confirm" type="submit">
              {t("checkcode.confirmBtn")}
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
      <CheckCode />
    </Suspense>
  );
}
