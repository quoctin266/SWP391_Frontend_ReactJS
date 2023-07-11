import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./ErrorPayment.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeBookingData } from "../../redux/slices/bookSlice";
import { putCancelOrder } from "../../service/APIservice";
import { toast } from "react-toastify";

const ErrorPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderID = useSelector((state) => state.book.orderID);

  useEffect(() => {
    const cancelOrder = async () => {
      let data = await putCancelOrder(orderID);
      if (data && data.EC === 0) {
        dispatch(removeBookingData());
      } else toast.error(data.EM);
    };
    cancelOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
