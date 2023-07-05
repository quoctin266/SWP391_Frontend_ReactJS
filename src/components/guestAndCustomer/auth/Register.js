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
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import Language from "../header/Language";

const Register = () => {
  const { t } = useTranslation();
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
      toast.error(`${t("register.toast1")}`);
      return;
    }

    if (!email) {
      setInvalidEmail(true);
      toast.error(`${t("register.toast2")}`);
      return;
    }

    if (!validateEmail(email)) {
      setInvalidEmail(true);
      toast.error(`${t("register.toast3")}`);
      return;
    }

    if (!password) {
      setInvalidPassword(true);
      toast.error(`${t("register.toast4")}`);
      return;
    }

    if (!confirmPW) {
      setInvalidConfirmPW(true);
      toast.error(`${t("register.toast5")}`);
      return;
    }

    if (confirmPW !== password) {
      setInvalidConfirmPW(true);
      toast.error(`${t("register.toast6")}`);
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
          <Language className="language" />
          <div className="register-container">
            <div className="register-prompt">
              <div className="title">{t("register.title")}</div>
              <Button
                variant="primary"
                className="signup-btn"
                onClick={() => navigate("/login")}
              >
                {t("register.loginBtn")}
              </Button>
            </div>
            <div className="register-form">
              <div className="page-brand">{t("register.header")}</div>
              <div className="title">{t("register.signup")}</div>
              <Form onSubmit={(e) => handleRegister(e)}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>{t("register.label1")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("register.note1")}
                    onChange={(e) => handleOnchangeUsername(e)}
                    value={username}
                    isInvalid={invalidUsername}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t("register.label2")}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t("register.note2")}
                    onChange={(e) => handleOnchangeEmail(e)}
                    value={email}
                    isInvalid={invalidEmail}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t("register.label3")}</Form.Label>
                  <div className="password-container">
                    <Form.Control
                      type={passwordType}
                      placeholder={t("register.note3")}
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
                  <Form.Label>{t("register.label4")}</Form.Label>
                  <div className="password-container">
                    <Form.Control
                      type={confirmPasswordType}
                      placeholder={t("register.note4")}
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
                    {t("register.signupBtn")}
                  </Button>
                </div>
                <div className="back-btn">
                  <span onClick={() => navigate("/")}>
                    {t("register.backBtn")}
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

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <Register />
    </Suspense>
  );
}
