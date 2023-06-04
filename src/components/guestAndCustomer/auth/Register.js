import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <div className="register-background">
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
              <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                  />
                </Form.Group>

                <div className="register-btn">
                  <Button variant="primary" type="submit">
                    Sign up
                  </Button>
                </div>
                <div className="back-btn">
                  <span onClick={handleBackClick}>
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
