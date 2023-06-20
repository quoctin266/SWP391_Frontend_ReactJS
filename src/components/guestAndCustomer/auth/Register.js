import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import Background from "../../../assets/image/Register-Background.jpg";
import { postSignup } from "../../../service/APIservice";
import { useState } from "react";
import { validateEmail } from "../../../utils/reuseFunction";
import { toast } from "react-toastify";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidConfirmPW, setInvalidConfirmPW] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const togglePassword = (passwordInput) => {
    switch (passwordInput) {
      case "current":
        if (passwordType === "password") {
          setPasswordType("text");
          return;
        }
        setPasswordType("password");
        break;
      case "confirm":
        if (confirmPasswordType === "password") {
          setConfirmPasswordType("text");
          return;
        }
        setConfirmPasswordType("password");
        break;
      default:
        return;
    }
  };

  const handleOnchangeEmail = (event) => {
    setEmail(event.target.value);
    setInvalidEmail(false);
  };

  const handleOnchangePassword = (event) => {
    setPassword(event.target.value);
    setInvalidPassword(false);
  };

  const handleOnchangeUsername = (event) => {
    setUsername(event.target.value);
    setInvalidUsername(false);
  };

  const handleOnchangeConfirmPW = (event) => {
    setConfirmPW(event.target.value);
    setInvalidConfirmPW(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username) {
      setInvalidUsername(true);
      toast.error("Username must not be empty.");
      return;
    }

    if (!email) {
      setInvalidEmail(true);
      toast.error("Email must not be empty.");
      return;
    }

    if (!validateEmail(email)) {
      setInvalidEmail(true);
      toast.error("Invalid email format.");
      return;
    }

    if (!password) {
      setInvalidPassword(true);
      toast.error("Password must not be empty");
      return;
    }

    if (!confirmPW) {
      setInvalidConfirmPW(true);
      toast.error("Must confirm password.");
      return;
    }

    if (confirmPW !== password) {
      setInvalidConfirmPW(true);
      toast.error("Confirm password and password must be the same.");
      return;
    }

    let data = await postSignup(email, username, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <div
      className="register-background"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Scrollbars
        style={{ height: "100vh" }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <div className="background-container">
          <div className="register-container">
            <div className="register-prompt">
              <div className="title">Already have an account?</div>
              <Button
                variant="primary"
                className="signup-btn"
                onClick={() => navigate("/login")}
              >
                Login now
              </Button>
            </div>
            <div className="register-form">
              <div className="page-brand">Bird Travel</div>
              <div className="title">Create account for free</div>
              <Form onSubmit={(e) => handleRegister(e)}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    onChange={(e) => handleOnchangeUsername(e)}
                    value={username}
                    isInvalid={invalidUsername}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => handleOnchangeEmail(e)}
                    value={email}
                    isInvalid={invalidEmail}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="password-container">
                    <Form.Control
                      type={passwordType}
                      placeholder="Enter password"
                      onChange={(e) => handleOnchangePassword(e)}
                      value={password}
                      isInvalid={invalidPassword}
                      pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-]).{8,}$"
                      title="Must contain at least one digit, one letter, one special character and at least 8 characters, spacing is not allowed"
                    />
                    {!invalidPassword && (
                      <span
                        className="password-toogle"
                        onClick={() => togglePassword("current")}
                      >
                        {passwordType === "password" ? <BiShow /> : <BiHide />}
                      </span>
                    )}
                  </div>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="password-container">
                    <Form.Control
                      type={confirmPasswordType}
                      placeholder="Confirm password"
                      onChange={(e) => handleOnchangeConfirmPW(e)}
                      value={confirmPW}
                      isInvalid={invalidConfirmPW}
                    />
                    {!invalidConfirmPW && (
                      <span
                        className="password-toogle"
                        onClick={() => togglePassword("confirm")}
                      >
                        {confirmPasswordType === "password" ? (
                          <BiShow />
                        ) : (
                          <BiHide />
                        )}
                      </span>
                    )}
                  </div>
                </Form.Group>

                <div className="register-btn">
                  <Button variant="primary" type="submit">
                    Sign up
                  </Button>
                </div>
                <div className="back-btn">
                  <span onClick={() => navigate("/")}>
                    &lt;&lt;&lt; Back to Homepage
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Register;
