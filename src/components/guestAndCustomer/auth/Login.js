import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import "./Login.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Scrollbars
        style={{ height: "100vh" }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <div className="background-container">
          <div className="login-container">
            <div className="register-prompt">
              <div className="title">Don't have an account?</div>
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
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
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
                  <Button variant="primary" type="submit">
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
