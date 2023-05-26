import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import "./Login.scss";
import { Scrollbars } from "react-custom-scrollbars-2";

const Login = () => {
  return (
    <div style={{ backgroundColor: "#E6EBDB" }}>
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
              <Button variant="primary" className="signup-btn">
                Sign up now
              </Button>
            </div>
            <div className="login-form">
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
                    <Form.Text className="text-muted" as={Col}>
                      Forgot password?
                    </Form.Text>
                  </div>
                </Row>
                <div className="login-btn">
                  <Button variant="primary" type="submit">
                    Login
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

export default Login;
