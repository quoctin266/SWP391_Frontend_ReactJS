import ProfilePic from "../../../assets/image/User_Icon.jpg";
import GreenCheck from "../../../assets/image/Green-Check.png";
import RedCross from "../../../assets/image/Red-X.png";
import "./AccountDetails.scss";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { validateEmail } from "../../../utils/reuseFunction";
import { toast } from "react-toastify";
import {
  putUpdateProfile,
  postCreateSender,
} from "../../../service/APIservice";
import { update } from "../../../redux/slices/authSlice";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toBase64 } from "../../../utils/reuseFunction";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AccountDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);
  const account_id = useSelector((state) => state.auth.account_id);
  const currentEmail = useSelector((state) => state.auth.email);
  const currentUsername = useSelector((state) => state.auth.username);
  const currentBirthday = useSelector((state) => state.auth.birthday);
  const currentPhone = useSelector((state) => state.auth.phone);
  const currentAddress = useSelector((state) => state.auth.address);
  const currentAvatar = useSelector((state) => state.auth.avatar);

  const [email, setEmail] = useState(currentEmail);
  const [username, setUsername] = useState(currentUsername);
  const [birthday, setBirthday] = useState(currentBirthday);
  const [phone, setPhone] = useState(currentPhone);
  const [address, setAddress] = useState(currentAddress);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [show, setShow] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidAddress, setInvalidAddesss] = useState(false);

  const handleClose = () => {
    setShow(false);
    setInvalidAddesss(false);
    setInvalidName(false);
    setInvalidPhone(false);
    setSenderAddress("");
    setSenderName("");
    setSenderPhone("");
  };
  const handleShow = () => setShow(true);

  const handleOnchangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnchangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeImg = async (event) => {
    let base64img = "";
    if (event.target.files[0]) {
      base64img = await toBase64(event.target.files[0]);
      setAvatar(base64img);
    }
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    if (!username) {
      toast.error("Username must not be empty.");
      return;
    }

    if (!email) {
      toast.error("Email must not be empty.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    let data = await putUpdateProfile(
      account_id,
      email,
      username,
      birthday,
      phone,
      address,
      avatar
    );

    if (data?.DT) {
      dispatch(update(data.DT));
      toast.success(data.EM);
    } else toast.error(data.EM);
  };

  const handleReset = () => {
    setEmail(currentEmail);
    setUsername(currentUsername);
    setBirthday(currentBirthday);
    setPhone(currentPhone);
    setAddress(currentAddress);
  };

  const handleChangeName = (value) => {
    setSenderName(value);
    setInvalidName(false);
  };

  const handleChangePhone = (value) => {
    setSenderPhone(value);
    setInvalidPhone(false);
  };

  const handleChangeAddress = (value) => {
    setSenderAddress(value);
    setInvalidAddesss(false);
  };

  const handleAddSender = async (e) => {
    e.preventDefault();

    if (!senderName) {
      toast.error("Please fill in your name.");
      setInvalidName(true);
      return;
    }

    if (!senderPhone) {
      toast.error("Please fill in your phone.");
      setInvalidPhone(true);
      return;
    }

    if (!senderAddress) {
      toast.error("Please fill in your address.");
      setInvalidAddesss(true);
      return;
    }

    let data = await postCreateSender(
      account_id,
      senderName,
      senderAddress,
      senderPhone
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
    } else toast.error(data.EM);
  };

  return (
    <Container className="account-detail-outer">
      <div className="account-detail-container">
        <div className="ProfileOptions">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              <Image
                src={avatar ? avatar : ProfilePic}
                alt="profile"
                roundedCircle
              />
            </Form.Label>
            <Form.Control type="file" onChange={(e) => handleChangeImg(e)} />
          </Form.Group>
          <button onClick={() => navigate("/reset-password")}>
            Change Password
          </button>
          {role === "customer" && (
            <>
              <button onClick={() => navigate("/view-history")}>
                View Orders
              </button>
              <button onClick={handleShow}>Add Sender</button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Sender Info</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAddSender}>
                  <Modal.Body>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Your name"
                          value={senderName}
                          isInvalid={invalidName}
                          onChange={(e) => handleChangeName(e.target.value)}
                        />
                      </Col>

                      <Col>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Your phone"
                          pattern="[0][0-9]{9}"
                          value={senderPhone}
                          isInvalid={invalidPhone}
                          onChange={(e) => handleChangePhone(e.target.value)}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Your address"
                          value={senderAddress}
                          isInvalid={invalidAddress}
                          onChange={(e) => handleChangeAddress(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </>
          )}
        </div>
        <form className="ProfileForm" onSubmit={(e) => handleConfirm(e)}>
          <div className="Input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => handleOnchangeEmail(e)}
            />
          </div>
          <div className="Input">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => handleOnchangeUsername(e)}
            />
          </div>
          <div className="Input">
            <label>Birthday</label>
            <input
              type="date"
              name="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              min="1900-01-01"
              max="2023-01-01"
            />
          </div>
          <div className="Input">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0][0-9]{9}"
              placeholder="Ex: 0928336767"
            />
          </div>
          <div className="Input">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="ProfileFormSave">
            <button type="submit">
              <img src={GreenCheck} alt="confirm" />
            </button>
            <button type="button">
              <img src={RedCross} alt="cancel" onClick={handleReset} />
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AccountDetail;
