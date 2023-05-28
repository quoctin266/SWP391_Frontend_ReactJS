import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ForgetPassword.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

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
          <div className="forgetpassword-container">
            <div className="forgetpassword-form">
              <div className="title">Recover Your Password</div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your email address"
                  />
                </Form.Group>
                <div className="forgetpassword-btn">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => navigate("/")}
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
