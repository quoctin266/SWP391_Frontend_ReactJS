import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./ErrorPayment.scss";

const ErrorPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="error-payment-container">
      <Alert variant="secondary" className="alert-message">
        <div>
          <div className="text1">Payment Failed</div>
          <div className="text2">
            The payment was unsuccessful due to an abnormality. Please try again
            later or use another payment method.
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to HomePage
        </Button>
      </Alert>
    </div>
  );
};

export default ErrorPayment;
