import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import "./Momo.scss";
import { Card } from "@mui/material";
import momo from "../../../assets/image/momo.png";
import QR from "../../../assets/image/QR.jpg";
import { useLocation, useNavigate } from "react-router";

const Momo = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [expirationTime, setExpirationTime] = useState(10);
  const [paymentData, setPaymentData] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let paymentData = location?.state?.orderRes;
    setPaymentData(paymentData);
  }, [location?.state?.orderRes]);

  useEffect(() => {
    let timer = null;

    if (showQRCode) {
      timer = setInterval(() => {
        setExpirationTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [showQRCode]);

  useEffect(() => {
    if (expirationTime === 0) {
      setShowQRCode(false);
      navigate("/booking-success", {
        state: { orderRes: paymentData },
      });
    }
  }, [expirationTime, navigate, paymentData]);

  useEffect(() => {
    // Perform Momo payment logic here
    // ...

    // Show the QR code
    setShowQRCode(true);
  }, []);

  return (
    <div className="momo-container">
      <Card className="card-title-1">
        <div className="wallet-title">
          <img className="momo-pic" src={momo} alt="" />
          <h4>Pay with momo wallet</h4>
        </div>

        <div className="QRCode">
          {showQRCode && (
            <div className="qr-code-container">
              <QRCode size={200} value="https://reactjs.org/" />
            </div>
          )}
        </div>
      </Card>
      <Card className="card-title-2">
        <div className="title">
          <h3>Scan QR code for payment</h3>
          <p>1. Open the MoMo app on your phone</p>
          <p>
            2. On momo select QR code icon{" "}
            <img className="QR-pic" src={QR} alt="" />{" "}
          </p>
          <p>3. Scan the code and pay</p>
          <div className="expiration-time">
            The transaction ends in {expirationTime} seconds
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Momo;
