import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./LimitedAccess.scss";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

const LimitedAccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="limited-access-container">
      <Alert variant="secondary" className="alert-message">
        <div>
          <div className="text1">{t("limited.text1")}</div>
          <div className="text2">{t("limited.text2")}</div>
          <div className="text3">{t("limited.text3")}</div>
        </div>
        <Button
          variant="success"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("limited.backBtn")}
        </Button>
      </Alert>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <LimitedAccess />
    </Suspense>
  );
}
