import { Container } from "react-bootstrap";
import "./Footer.scss";
import fb from "../../../assets/image/fb_logo.png";
import google from "../../../assets/image/google_logo.jpg";
import youtube from "../../../assets/image/youtube_logo.png";

const Footer = () => {
  return (
    <Container>
      <div className="footer-container">
        <div className="contact-info">
          &copy; 2023 Bird Travel. All rights reserved.
          <br />
          Call Bird Travel: 222-333-4444
          <br />
          Email Bird Travel: BirdTravel@gmail.com <br />
          Site designed and built by Group 5.
        </div>
        <div className="find-us">Find Us On:</div>
        <div className="footer-icon-container">
          <img src={fb} alt="facebook icon" className="fb-logo" />
          <img src={google} alt="google icon" className="google-logo" />
          <img src={youtube} alt="youtube icon" className="youtube-logo" />
        </div>
      </div>
    </Container>
  );
};

export default Footer;
