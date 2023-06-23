import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import "./Login.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from "../../../service/APIservice";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/reuseFunction";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import Background from "../../../assets/image/background.jpg";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleOnchangeEmail = (event) => {
    setEmail(event.target.value);
    setInvalidEmail(false); // stop displaying warning after typing something
  };

  const handleOnchangePassword = (event) => {
    setPassword(event.target.value);
    setInvalidPassword(false); // stop displaying warning after typing something
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email) {
      setInvalidEmail(true);
      toast.error("Email must not be empty.");
      return;
    }

    if (!password) {
      setInvalidPassword(true);
      toast.error("Password must not be empty");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    setLoading(true); //start loading when calling API
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(login(data.DT)); //send user info to redux

      toast.success(data.EM);
      setLoading(false);
      navigate("/");
    } else {
      toast.error(data.EM);
      setLoading(false);
    }
  };

  return (
    <div
      className="login-background"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Scrollbars
        style={{
          height: "100vh",
        }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <div className="background-container">
          {/* <Image src={background} /> */}
          <div className="login-container">
            <div className="register-prompt">
              <div className="title">Don't have an account yet?</div>
              <Button
                variant="primary"
                className="signup-btn"
                onClick={() => navigate("/register")}
              >
                Sign up now
              </Button>
            </div>
            <div className="login-form">
              <div className="page-brand">Bird Travel</div>
              <div className="title">Login</div>
              <Form onSubmit={(event) => handleLogin(event)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    isInvalid={invalidEmail}
                    onChange={(e) => handleOnchangeEmail(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="password-container">
                    <Form.Control
                      type={passwordType}
                      placeholder="Password"
                      value={password}
                      isInvalid={invalidPassword}
                      onChange={(e) => handleOnchangePassword(e)}
                    />
                    {!invalidPassword && (
                      <span
                        className="password-toogle"
                        onClick={togglePassword}
                      >
                        {passwordType === "password" ? <BiShow /> : <BiHide />}
                      </span>
                    )}
                  </div>
                </Form.Group>

                <Row>
                  <div className="checkbox-and-resetpw">
                    <Form.Group
                      className="check-pw"
                      controlId="formBasicCheckbox"
                      as={Col}
                    >
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Form.Text
                      className="text-muted"
                      as={Col}
                      onClick={() => navigate("/forget-password")}
                    >
                      Forgot password?
                    </Form.Text>
                  </div>
                </Row>
                <div className="login-btn">
                  <Button variant="primary" type="submit" disabled={loading}>
                    Login
                  </Button>
                </div>
                <div className="back-btn">
                  <span
                    onClick={() => {
                      navigate("/");
                    }}
                  >
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

export default Login;
