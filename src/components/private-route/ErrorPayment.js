import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./ErrorPayment.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeBookingData } from "../../redux/slices/bookSlice";
import { putCancelOrder } from "../../service/APIservice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

const ErrorPayment = () => {
  const { t } = useTranslation();
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
    if (!orderID) {
      cancelOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="error-payment-container">
      <Alert variant="secondary" className="alert-message">
        <div>
          <div className="text1">{t("errorpayment.text1")}</div>
          <div className="text2">{t("errorpayment.text2")}</div>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("errorpayment.backBtn")}
        </Button>
      </Alert>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <ErrorPayment />
    </Suspense>
  );
}
