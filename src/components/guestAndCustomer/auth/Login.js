import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col, Container } from "react-bootstrap";
import "./Login.scss";

const Login = () => {
  return (
    <Container>
      <div className="login-container">
        <div className="register-prompt">
          <div className="title">Don't have an account?</div>
          <Button variant="primary">Sign up now</Button>
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
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
                as={Col}
              >
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Form.Text className="text-muted" as={Col}>
                Forgot password?
              </Form.Text>
            </Row>
            <div className="login-btn">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
