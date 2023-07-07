import "./Contact.scss";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { isEnglish } from "../../../utils/i18n";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { validateEmail } from "../../../utils/reuseFunction";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { postCreateMail } from "../../../service/APIservice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Contact = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/mail" />;
  }

  const handleChangeName = (value) => {
    setName(value);
    setInvalidName(false);
  };

  const handleChangePhone = (value) => {
    setPhone(value);
    setInvalidPhone(false);
  };

  const handleChangeEmail = (value) => {
    setEmail(value);
    setInvalidEmail(false);
  };

  const handleChangeNote = (value) => {
    setNote(value);
    setInvalidNote(false);
  };

  const handleChangeTitle = (value) => {
    setTitle(value);
    setInvalidTitle(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error(`${t("contact.toast1")}`);
      setInvalidName(true);
      return;
    }

    if (!phone) {
      toast.error(`${t("contact.toast2")}`);
      setInvalidPhone(true);
      return;
    }

    if (!email) {
      toast.error(`${t("contact.toast3")}`);
      setInvalidEmail(true);
      return;
    }

    if (!validateEmail(email)) {
      toast.error(`${t("contact.toast4")}`);
      setInvalidEmail(true);
      return;
    }

    if (!title) {
      toast.error(`${t("contact.toast6")}`);
      setInvalidTitle(true);
      return;
    }

    if (!note) {
      toast.error(`${t("contact.toast5")}`);
      setInvalidNote(true);
      return;
    }

    let data = await postCreateMail(name, email, phone, note, null, title);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setEmail("");
      setName("");
      setPhone("");
      setNote("");
      setTitle("");
    } else toast.error(data.EM);
  };

  return (
    <Container className="contact-outer">
      <div className="contact-container">
        <div className="Header">{t("contact.header")}</div>
        <div className="contact-body">
          <div className="company">{t("contact.title1")}</div>
          <div>
            <b>{t("contact.info1")}</b>{" "}
            {isEnglish()
              ? `Lot E2a-7, D1 Street, Đ. D1, Long Thanh My, Thu Duc city, Ho Chi Minh city`
              : `Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh`}
          </div>
          <div>
            <b>{t("contact.info2")}</b> 028 7300 5588
          </div>
          <div>
            <b>Email:</b> birdtravel@gmail.com
          </div>
          <div>
            <b>Website:</b> birdtravel.com.vn
          </div>
          <div className="title">{t("contact.title2")}</div>
          <div className="contact-form">
            <Form onSubmit={handleSend}>
              <Row className="mb-3">
                <Col>
                  <Form.Label>{t("contact.label1")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("contact.note1")}
                    isInvalid={invalidName}
                    value={name}
                    onChange={(e) => handleChangeName(e.target.value)}
                  />
                </Col>

                <Col>
                  <Form.Label>{t("contact.label2")}</Form.Label>
                  <Form.Control
                    type="tel"
                    pattern="[0][0-9]{9}"
                    placeholder="Ex: 0928336767"
                    isInvalid={invalidPhone}
                    value={phone}
                    onChange={(e) => handleChangePhone(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t("contact.note2")}
                    isInvalid={invalidEmail}
                    value={email}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                  />
                </Col>
              </Row>

              <Col className="mb-3">
                <Form.Label>{t("contact.label4")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("contact.note3")}
                  isInvalid={invalidTitle}
                  value={title}
                  onChange={(e) => handleChangeTitle(e.target.value)}
                />
              </Col>

              <Col className="mb-3">
                <Form.Label>{t("contact.label3")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  isInvalid={invalidNote}
                  value={note}
                  onChange={(e) => handleChangeNote(e.target.value)}
                />
              </Col>
              <Button variant="success" type="submit">
                {t("contact.sendBtn")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
