import React, { useState, useEffect } from "react";
import "./Visa.scss";
import card_img from "../../../assets/image/card_img.png";
import { useLocation, useNavigate } from "react-router";

const Visa = () => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [paymentData, setPaymentData] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleCreditCardNumberChange = (e) => {
    const inputNumber = e.target.value.replace(/[^0-9]/g, "");
    const formattedNumber = inputNumber.replace(/(.{4})/g, "$1-").slice(0, 19);
    setCreditCardNumber(formattedNumber);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    navigate("/booking-success", {
      state: { orderRes: paymentData },
    });
  };

  useEffect(() => {
    let paymentData = location?.state?.orderRes;
    setPaymentData(paymentData);
  }, [location?.state?.orderRes]);

  return (
    <div className="visa-container">
      <form onSubmit={handlePayment}>
        <div className="row">
          <div className="col">
            <h3 className="title">Billing address</h3>
            <div className="inputBox">
              <span>Full name :</span>
              <input type="text" placeholder="Peter Parker" />
            </div>
            <div className="inputBox">
              <span>Email :</span>
              <input type="email" placeholder="example@example.com" />
            </div>
            <div className="inputBox">
              <span>Address :</span>
              <input type="text" placeholder="room - street - locality" />
            </div>
            <div className="inputBox">
              <span>City :</span>
              <input type="text" placeholder="Chicago" />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>State :</span>
                <input type="text" placeholder="USA" />
              </div>
              <div className="inputBox">
                <span>Zip code :</span>
                <input type="text" placeholder="123 456" />
              </div>
            </div>
          </div>
          <div className="col">
            <h3 className="title">payment</h3>
            <div className="inputBox">
              <span>Cards Accepted :</span>
              <img src={card_img} alt="" />
            </div>
            <div className="inputBox">
              <span>Name on card :</span>
              <input type="text" placeholder="mr. Peter Parker" />
            </div>
            <div className="inputBox">
              <span>Credit card number :</span>
              <input
                type="text"
                placeholder="1111-2222-3333-4444"
                value={creditCardNumber}
                onChange={handleCreditCardNumberChange}
                maxLength="19"
              />
            </div>
            <div className="inputBox">
              <span>Exp month :</span>
              <input type="text" placeholder="january" />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>Exp year :</span>
                <input type="number" placeholder="2022" />
              </div>
              <div className="inputBox">
                <span>CVV :</span>
                <input type="text" placeholder="1234" />
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Proceed to checkout"
          className="submit-btn"
        />
      </form>
    </div>
  );
};

export default Visa;
