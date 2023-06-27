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

const CheckCode = () => {
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetCode = useSelector((state) => state.auth.resetCode);
  const recoverEmail = useSelector((state) => state.auth.recoverEmail);

  const handleSubmitCode = (e) => {
    e.preventDefault();

    if (!recoverEmail) {
      toast.error("Please provide an email first.");
      return;
    }

    if (code && +code === resetCode) {
      dispatch(resetPassCode());
      navigate("/change-password");
    } else toast.error("Invalid code.");
  };

  const handleResendCode = async () => {
    if (!recoverEmail) {
      toast.error("Please provide an email first.");
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
          <h1>Recover Password</h1>
          <div className="Input">
            <label htmlFor="passcode">Enter Code</label>
            <div className="password-container">
              <input
                type="number"
                id="passcode"
                min={0}
                placeholder="Enter code for password recovery"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          <div className="note">
            <i>Note that each code can only be used once</i>
            <br />
            <span onClick={handleResendCode}>
              <b>Click here</b>
            </span>{" "}
            to generate a new code
          </div>
          <div className="btn-group">
            <button
              className="back-btn"
              onClick={() => navigate("/forget-password")}
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

export default CheckCode;
