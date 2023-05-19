import { Container } from "react-bootstrap";
import "./Footer.scss";
import fb from "../../assets/image/fb_logo.png";
import google from "../../assets/image/google_logo.jpg";
import youtube from "../../assets/image/youtube_logo.png";

const Footer = () => {
  return (
    <Container>
      <div className="footer-container">
        <img src={fb} alt="facebook icon" className="fb-logo" />
        <img src={google} alt="google icon" className="google-logo" />
        <img src={youtube} alt="youtube icon" className="youtube-logo" />
      </div>
    </Container>
  );
};

export default Footer;
