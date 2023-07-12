import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <Alert variant="secondary" className="alert-message">
        <div>
          <div className="text1">{t("notfound.text1")}</div>
          <div className="text2">{t("notfound.text2")}</div>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("notfound.backBtn")}
        </Button>
      </Alert>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <NotFound />
    </Suspense>
  );
}
