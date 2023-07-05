import { Container } from "react-bootstrap";
import "./Footer.scss";
import fb from "../../../assets/image/fb_logo.png";
import google from "../../../assets/image/google_logo.jpg";
import youtube from "../../../assets/image/youtube_logo.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-column-heading">{t("footer.title1")}</div>
          <ul className="contact-info">
            <li>
              <NavLink to="/faqs" className="nav-link">
                {t("footer.link1")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link2")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link3")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link4")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link5")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link6")}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <div className="footer-column-heading">{t("footer.title2")}</div>
          <ul className="contact-info">
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link7")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link8")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link9")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link10")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link11")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link12")}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <div className="footer-column-heading">{t("footer.title3")}</div>
          <ul className="contact-info">
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link13")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link14")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link15")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link">
                {t("footer.link16")}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="find-us">{t("footer.find")}</div>
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
