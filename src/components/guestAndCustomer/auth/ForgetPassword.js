import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ForgetPassword.scss";
const ForgetPassword = () => {
  return (
    <div style={{ backgroundColor: "#E6EBDB" }}>
      <div className="background-container">
        <div className="forgetpassword-container">
          <div className="forgetpassword-form">
            <div className="title">Forgot Password</div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>
              <div className="forgetpassword-btn">
                <Button variant="primary" type="submit">
                  Forgot Password
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
