import React, { useState, useEffect } from "react";
import "./VnPay.scss";
import vnpay from "../../../assets/image/vnpay.jpg";
import bank from "../../../assets/image/bank.jpg";
import QRCode from "qrcode.react";

const VnPay = () => {
  const [qrCodeData, setQRCodeData] = useState(false);
  const [expirationTime, setExpirationTime] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    let timer = null;

    if (qrCodeData) {
      timer = setInterval(() => {
        setExpirationTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [qrCodeData]);

  useEffect(() => {
    if (expirationTime === 0) {
      setQRCodeData("");
      setExpirationTime(30); // Reset expiration time to 5 minutes
    }
  }, [expirationTime]);

  useEffect(() => {
    // Perform Vnpay payment logic here
    // ...

    // Show the QR code
    setQRCodeData(true);
  }, []);

  return (
    <div className="vnpay-container">
      <div className="row">
        <div className="row1">
          <div className="item small">
            <p className="title">
              <img className="vnpayicon" src={vnpay} alt="" /> Pay with VnPay QR
            </p>
          </div>
          <div className="item4"></div>
        </div>
        <div className="divider"></div>
        <div className="row2">
          <div className="item10">
            <div>QR code here</div>
            <QRCode />
            <div className="expiration-time">
              The transaction ends in {expirationTime} seconds
            </div>
          </div>
          <div className="item2">
            <div className="QRtitle">Scan QR code for payment</div>
            <div>1. Open the VnPay app on your phone</div>
            <div>2. On VnPay select QR code icon</div>
            <div>3. Scan the code and pay</div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row3">
          <div className="item3">
            <p className="title">Payment support bank:</p>
            <img className="bank" src={bank} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VnPay;
