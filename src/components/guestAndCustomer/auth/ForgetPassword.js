import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ForgetPassword.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import Background from "../../../assets/image/ForgetPassword-Background.jpg";
import { validateEmail } from "../../../utils/reuseFunction";
import { toast } from "react-toastify";
import { postRecoverPW } from "../../../service/APIservice";
import { recoverPassword } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeEmail = (value) => {
    setInvalidEmail(false);
    setEmail(value);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill in email.");
      setInvalidEmail(true);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email.");
      setInvalidEmail(true);
      return;
    }

    let data = await postRecoverPW(email);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      dispatch(recoverPassword(data.DT));
      navigate("/check-code");
    } else toast.error(data.EM);
  };

  return (
    <div style={{ backgroundImage: `url(${Background})` }}>
      <Scrollbars
        style={{ height: "100vh" }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <div className="background-container">
          <div className="forgetpassword-container">
            <div className="forgetpassword-form">
              <div className="title">Recover Your Password</div>
              <Form onSubmit={handleSubmitEmail}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    isInvalid={invalidEmail}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                  />
                </Form.Group>
                <div className="forgetpassword-btn">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/login")}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="confirm-btn"
                  >
                    Confirm
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default ForgetPassword;
