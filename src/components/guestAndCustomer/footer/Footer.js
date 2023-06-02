import { Container } from "react-bootstrap";
import "./Footer.scss";
import fb from "../../../assets/image/fb_logo.png";
import google from "../../../assets/image/google_logo.jpg";
import youtube from "../../../assets/image/youtube_logo.png";

const Footer = () => {
  return (
    <Container>
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-column-heading">About Us</div>
          <ul className="contact-info">
            <li>
              <a href="/">FAQ</a>
            </li>
            <li>
              <a href="/">Help Center</a>
            </li>
            <li>
              <a href="/">Account</a>
            </li>
            <li>
              <a href="/">Media Center</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <div className="footer-column-heading">Services</div>
          <ul className="contact-info">
            <li>
              <a href="/">Legal Notices</a>
            </li>
            <li>
              <a href="/">Report an Issue</a>
            </li>
            <li>
              <a href="/">Affiliate Program</a>
            </li>
            <li>
              <a href="/">Terms of Use</a>
            </li>
            <li>
              <a href="/">Privacy</a>
            </li>
            <li>
              <a href="/">Cookie Preferences</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <div className="footer-column-heading">Contact Info</div>
          <ul className="contact-info">
            <li>
              <a href="/">Corporate Information</a>
            </li>
            <li>
              <a href="/">Feedback</a>
            </li>
            <li>
              <a href="/">Corporate Accounts</a>
            </li>
            <li>
              <a href="/">Legal Notices</a>
            </li>
            <li>
              <a href="/">Accessibility</a>
            </li>
          </ul>
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
