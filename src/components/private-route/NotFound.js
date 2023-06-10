import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <Alert variant="secondary" className="alert-message">
        <div>
          <div className="text1">This Page Isn't Available</div>
          <div className="text2">
            The link may be broken, or the page may have been removed. Check to
            see if the link you're trying to open is correct.
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

export default NotFound;
