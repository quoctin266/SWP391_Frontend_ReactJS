import { Container } from "react-bootstrap";
import "./AboutUs.scss";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Container className="aboutus-outer">
      <div className="aboutus-container">
        <div className="Header">{t("aboutUs.header")}</div>
        <div className="Mid">
          <div className="Content1">
            <h3 className="contenttitle1">{t("aboutUs.title1")}</h3>
            <h5 className="paragraph">
              <VscDebugBreakpointLog /> {t("aboutUs.text1")}
            </h5>
            <h5 className="paragraph">
              <VscDebugBreakpointLog /> {t("aboutUs.text2")}
            </h5>
            <h5 className="paragraph">
              <VscDebugBreakpointLog /> {t("aboutUs.text3")}
            </h5>
          </div>
          <div className="Content2">
            <h3 className="contenttitle2">{t("aboutUs.title2")}</h3>
            <h5 className="paragraph">{t("aboutUs.text4")}</h5>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
