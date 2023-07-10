import "./Booking.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useJsApiLoader } from "@react-google-maps/api";
import moment from "moment";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  getAllCage,
  getAllPackage,
  getAllStation,
  getAllPayment,
  getTotalCost,
  postCreateOrder,
  getCustomerByAccount,
} from "../../../service/APIservice";
import { useSelector } from "react-redux";
import nprogress from "nprogress";
import { useTranslation } from "react-i18next";

nprogress.configure({ showSpinner: false, trickleSpeed: 40 });

const libraries = ["places"];

const Booking = () => {
  const { t } = useTranslation();
  let currentTime = moment().format("YYYY-MM-DD").toString();
  const account_id = useSelector((state) => state.auth.account_id);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBC8mWV1x70IBoNqcLxapXKX38iQJ3B-rc",
    // googleMapsApiKey: "AIzaSyAOd56WYDxHrJAhOvngce5eaEIcryQ-ZBE",
    libraries: libraries,
  });

  const fetchAllCage = async () => {
    let data = await getAllCage();
    if (data && data.EC === 0) {
      setCageList(data.DT);
    }
  };

  const fetchAllPackage = async () => {
    let data = await getAllPackage();
    if (data && data.EC === 0) {
      setServicePackage(data.DT);
    }
  };

  const fetchAllStation = async () => {
    let data = await getAllStation();
    if (data && data.EC === 0) {
      setStationList(data.DT);
    }
  };

  const fetchAllPayment = async () => {
    let data = await getAllPayment();
    if (data && data.EC === 0) {
      setPaymentList(data.DT);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      let data = await getCustomerByAccount(account_id);
      if (data && data.EC === 0) {
        setCustomerList(data.DT);
      }
    };

    fetchCustomers();
  }, [account_id]);

  useEffect(() => {
    fetchAllCage();
    fetchAllPackage();
    fetchAllStation();
    fetchAllPayment();
  }, []);

  let initBird = [
    {
      birdID: uuidv4(),
      name: "",
      age: "",
      weight: "",
      gender: "",
      cage: "",
      note: "",
      isInvalidName: false,
      isInvalidAge: false,
      isInvalidWeight: false,
      isInvalidGender: false,
      isInvalidCage: false,
    },
  ];

  const navigate = useNavigate();

  //data for API
  const [birdList, setBirdList] = useState(initBird);
  const [packageID, setPackageID] = useState("");
  const [anticipate, setAnticipate] = useState("");
  const [estimate, setEstimate] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [invalidPackage, setInvalidPackage] = useState(false);
  const [invalidAnticipate, setInvalidAnticipate] = useState(false);
  const [invalidDeparture, setInvalidDeparture] = useState(false); // for future usage
  const [invalidArrival, setInvalidArrival] = useState(false); // for future usage
  const [invalidPayment, setInvalidPayment] = useState(false);

  //data from API
  const [customerList, setCustomerList] = useState([]);
  const [customer, setCustomer] = useState("");
  const [invalidSender, setInvalidSender] = useState(false);
  const [servicePackage, setServicePackage] = useState([]);
  const [cageList, setCageList] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [costSummary, setCostSummary] = useState("");

  // data for render
  const [packageName, setPackageName] = useState("");
  const [paymentName, setPaymentName] = useState("");

  // google API
  const originRef = useRef(); // may change in future
  const destinationRef = useRef(); // may change in future
  const [showSummary, setShowSummary] = useState(false);

  const handleChangeCustomer = (e) => {
    setInvalidSender(false);
    if (customerList.length > 0) {
      customerList.forEach((item) => {
        if (item.customer_id === +e.target.value) {
          setCustomer(item);
        }
      });
    }
  };

  const handleCloseSummary = () => setShowSummary(false);
  const handleShowSummary = (event) => {
    event.preventDefault();
    let birdClone = _.cloneDeep(birdList);

    if (!customer) {
      toast.error(`${t("booking.toast1")}`);
      setInvalidSender(true);
      return;
    }

    let validGender = birdClone.every((bird) => {
      if (!bird.gender) {
        toast.error(`${t("booking.toast2")}`);
        bird.isInvalidGender = true;
        setBirdList(birdClone);
        return false;
      } else return true;
    });
    if (!validGender) return;

    let validBirdName = birdClone.every((bird) => {
      if (!bird.name) {
        toast.error(`${t("booking.toast3")}`);
        bird.isInvalidName = true;
        setBirdList(birdClone);
        return false;
      } else return true;
    });
    if (!validBirdName) return;

    let validBirdAge = birdClone.every((bird) => {
      if (!bird.age) {
        toast.error(`${t("booking.toast4")}`);
        bird.isInvalidAge = true;
        setBirdList(birdClone);
        return false;
      } else return true;
    });
    if (!validBirdAge) return;

    let validBirdWeight = birdClone.every((bird) => {
      if (!bird.weight) {
        toast.error(`${t("booking.toast5")}`);
        bird.isInvalidWeight = true;
        setBirdList(birdClone);
        return false;
      } else return true;
    });
    if (!validBirdWeight) return;

    let validBirdCage = birdClone.every((bird) => {
      if (!bird.cage) {
        toast.error(`${t("booking.toast6")}`);
        bird.isInvalidCage = true;
        setBirdList(birdClone);
        return false;
      } else return true;
    });
    if (!validBirdCage) return;

    if (!packageID) {
      setInvalidPackage(true);
      toast.error(`${t("booking.toast7")}`);
      return;
    }

    if (!anticipate) {
      setInvalidAnticipate(true);
      toast.error(`${t("booking.toast8")}`);
      return;
    }

    if (!originRef?.current?.value) {
      setInvalidDeparture(true);
      toast.error(`${t("booking.toast9")}`);
      return;
    }

    if (!destinationRef?.current?.value) {
      setInvalidArrival(true);
      toast.error(`${t("booking.toast10")}`);
      return;
    }

    if (!paymentID) {
      setInvalidPayment(true);
      toast.error(`${t("booking.toast11")}`);
      return;
    }

    if (!calculateRoute()) return;

    nprogress.start();
    setTimeout(() => {
      setShowSummary(true);
    }, 1000);
    nprogress.done();
  };

  const calculateRoute = async (event) => {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }

    try {
      // eslint-disable-next-line no-undef
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        //    eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });

      let anticipateTime = moment(anticipate);
      let estimateTime = moment(anticipateTime).add(
        results.routes[0].legs[0].duration.value * 2,
        "seconds"
      );
      estimateTime = estimateTime.format("YYYY-MM-DD").toString();
      setEstimate(estimateTime);

      let kmDistance = results.routes[0].legs[0].distance.value / 1000;
      let dataSummary = {
        birdList: birdList,
        packageID: packageID,
        distance: kmDistance,
      };
      let res = await getTotalCost(dataSummary);
      if (res && res.EC === 0) {
        setCostSummary(res.DT);
        return true;
      } else {
        toast.warning(res.EM);
        return false;
      }
    } catch {
      toast.error("API key usage limit exceeded.");
    }
  };

  const handleAddBird = () => {
    let bird = {
      birdID: uuidv4(),
      name: "",
      age: "",
      weight: "",
      gender: "",
      cage: "",
      note: "",
      isInvalidName: false,
      isInvalidAge: false,
      isInvalidWeight: false,
      isInvalidGender: false,
      isInvalidCage: false,
    };
    setBirdList([...birdList, bird]);
  };

  const handleRemoveBird = (id) => {
    let birdClone = _.cloneDeep(birdList);
    birdClone = birdClone.filter((bird) => bird.birdID !== id);
    setBirdList(birdClone);
  };

  const handleChangeBird = (birdID, value, field) => {
    let birdClone = _.cloneDeep(birdList);
    let index = birdClone.findIndex((item) => item.birdID === birdID);

    if (index > -1) {
      switch (field) {
        case "gender":
          birdClone[index].gender = value;
          if (birdClone[index].gender) {
            birdClone[index].isInvalidGender = false;
          }
          setBirdList(birdClone);
          break;
        case "name":
          birdClone[index].name = value;
          if (birdClone[index].name) {
            birdClone[index].isInvalidName = false;
          }
          setBirdList(birdClone);
          break;
        case "age":
          birdClone[index].age = value;
          if (birdClone[index].age) {
            birdClone[index].isInvalidAge = false;
          }
          setBirdList(birdClone);
          break;
        case "weight":
          birdClone[index].weight = value;
          if (birdClone[index].weight) {
            birdClone[index].isInvalidWeight = false;
          }
          setBirdList(birdClone);
          break;
        case "note":
          birdClone[index].note = value;
          setBirdList(birdClone);
          break;
        case "cage":
          birdClone[index].cage = value;
          if (birdClone[index].cage) {
            birdClone[index].isInvalidCage = false;
          }
          setBirdList(birdClone);
          break;
        default:
          setBirdList(birdClone);
      }
    }
  };

  const handleCheckPackage = (e, packageName) => {
    setPackageID(e.target.value);
    setPackageName(packageName);
    setInvalidPackage(false);
  };

  const handleChangeAnticipate = (e) => {
    setAnticipate(e.target.value);
    setInvalidAnticipate(false);
  };

  const handleChangePayment = (e, item) => {
    setPaymentID(e.target.value);
    let paymentName;
    if (item.method_name) {
      paymentName = `${item.payment_type} - ${item.method_name}`;
    } else paymentName = `${item.payment_type}`;
    setPaymentName(paymentName);
    setPaymentMethod(item.method_name ? item.method_name : "");
    setInvalidPayment(false);
  };

  const handleCreateOrder = async () => {
    let dataOrder = {
      customerID: customer.customer_id,
      birdList: birdList,
      generalInfo: {
        departure: originRef.current.value, //may change in future
        arrival: destinationRef.current.value, //may change in future
        anticipate: anticipate,
        estimate: estimate,
        paymentID: paymentID,
        packageID: packageID,
      },
      totalCost: costSummary.totalCost,
    };

    let data = await postCreateOrder(dataOrder);
    if (data && data.EC === 0) {
      if (paymentMethod === "Visa") {
        navigate("/visa", {
          state: { orderRes: data.DT },
        });
      } else if (paymentMethod === "MOMO") {
        navigate("/momo", {
          state: { orderRes: data.DT },
        });
      } else if (paymentMethod === "VNPAY") {
        navigate("/vnpay", {
          state: { orderRes: data.DT },
        });
      } else
        navigate("/booking-success", {
          state: { orderRes: data.DT },
        });
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="booking-outer">
      <div className="booking-container">
        <div className="title">{t("booking.header")}</div>
        <div className="booking-body">
          <div className="bird-customer-body">
            <div className="customer-info">
              <div className="customer-title">{t("booking.title1")}</div>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="selectSender">
                    <Form.Label>{t("booking.label1")}</Form.Label>
                    <Form.Select
                      defaultValue=""
                      aria-label="Default example"
                      isInvalid={invalidSender}
                      onChange={(e) => handleChangeCustomer(e)}
                    >
                      <option value="" disabled hidden>
                        {t("booking.note1")}
                      </option>
                      {customerList &&
                        customerList.length > 0 &&
                        customerList.map((customer) => {
                          return (
                            <option
                              value={customer.customer_id}
                              key={customer.customer_id}
                            >
                              {customer.full_name} -{" "}
                              {customer.address ? customer.address : "N/A"} -{" "}
                              {customer.phone_number
                                ? customer.phone_number
                                : "N/A"}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <div className="add-sender">
                  <span onClick={() => navigate("/manage-sender")}>
                    {t("booking.link1")}
                  </span>
                </div>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>{t("booking.label2")}</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={customer.full_name ? customer.full_name : ""}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>{t("booking.label3")}</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={customer.phone_number ? customer.phone_number : ""}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label>{t("booking.label4")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      disabled
                      value={customer.address ? customer.address : ""}
                    />
                  </Form.Group>

                  <Col></Col>
                </Row>
              </Form>
            </div>

            {birdList &&
              birdList.length > 0 &&
              birdList.map((bird) => {
                return (
                  <div className="bird-info" key={bird.birdID}>
                    <div className="bird-title">{t("booking.title2")}</div>
                    <Form>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridGender">
                          <Form.Label>{t("booking.label5")}</Form.Label>
                          <Form.Select
                            defaultValue=""
                            aria-label="Default select example"
                            onChange={(e) =>
                              handleChangeBird(
                                bird.birdID,
                                e.target.value,
                                "gender"
                              )
                            }
                            isInvalid={bird.isInvalidGender}
                          >
                            <option value="" disabled hidden>
                              {t("booking.note2")}
                            </option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridName">
                          <Form.Label>{t("booking.label6")}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={t("booking.note3")}
                            value={bird.name}
                            onChange={(e) =>
                              handleChangeBird(
                                bird.birdID,
                                e.target.value,
                                "name"
                              )
                            }
                            isInvalid={bird.isInvalidName}
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-5">
                        <Form.Group as={Col} controlId="formGridAge">
                          <Form.Label>{t("booking.label7")}</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={t("booking.note4")}
                            min="1"
                            value={bird.age}
                            onChange={(e) =>
                              handleChangeBird(
                                bird.birdID,
                                e.target.value,
                                "age"
                              )
                            }
                            isInvalid={bird.isInvalidAge}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridWeight">
                          <Form.Label>{t("booking.label8")}</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={t("booking.note5")}
                            min="0"
                            step="0.1"
                            value={bird.weight}
                            onChange={(e) =>
                              handleChangeBird(
                                bird.birdID,
                                e.target.value,
                                "weight"
                              )
                            }
                            isInvalid={bird.isInvalidWeight}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                          as={Col}
                        >
                          <Form.Label>{t("booking.label9")}</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={bird.note}
                            onChange={(e) =>
                              handleChangeBird(
                                bird.birdID,
                                e.target.value,
                                "note"
                              )
                            }
                          />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3 btn-outer">
                          <Form.Label>{t("booking.label10")}</Form.Label>
                          <Form.Select
                            defaultValue=""
                            aria-label="cage select"
                            className="mb-3"
                            onChange={(e) =>
                              handleChangeBird(
                                bird.birdID,
                                e.target.value,
                                "cage"
                              )
                            }
                            isInvalid={bird.isInvalidCage}
                          >
                            <option value="" disabled hidden>
                              {t("booking.note6")}
                            </option>
                            {cageList &&
                              cageList.length > 0 &&
                              cageList.map((cage) => {
                                return (
                                  <option
                                    value={cage.cage_id}
                                    key={cage.cage_id}
                                  >
                                    {cage.dimension} cm
                                  </option>
                                );
                              })}
                          </Form.Select>
                          <div className="btn-group-bird">
                            {birdList && birdList.length > 1 && (
                              <Button
                                variant="danger"
                                className="remove-bird-btn"
                                onClick={() => handleRemoveBird(bird.birdID)}
                              >
                                {t("booking.delBtn")}
                              </Button>
                            )}
                            <Button
                              className="add-bird-btn"
                              onClick={handleAddBird}
                            >
                              {t("booking.addBtn")}
                            </Button>
                          </div>
                        </Form.Group>
                      </Row>
                    </Form>
                  </div>
                );
              })}
          </div>
          <div className="package-body">
            <div className="package-title">{t("booking.title3")}</div>
            <Table striped hover>
              <thead>
                <tr>
                  <th>{t("booking.package")}</th>
                  <th>{t("booking.water")}</th>
                  <th>{t("booking.food")}</th>
                  <th>{t("booking.health")}</th>
                  <th>{t("booking.pickup")}</th>
                  <th>{t("booking.price")}</th>
                </tr>
              </thead>
              <tbody>
                {servicePackage &&
                  servicePackage.length > 0 &&
                  servicePackage.map((item) => {
                    return (
                      <tr key={item.package_id}>
                        <td>{item.package_name}</td>
                        <td>
                          <FcCheckmark />
                        </td>
                        <td>{item.food_type}</td>
                        <td>{item.healthcare ? <FcCheckmark /> : ""}</td>
                        <td>{item.home_pickup ? <FcCheckmark /> : ""}</td>
                        <td>
                          {new Intl.NumberFormat().format(item.price)} VND
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Form.Group as={Col}>
              <Form.Label>{t("booking.label11")}</Form.Label>
              <Col sm={10}>
                {servicePackage &&
                  servicePackage.length > 0 &&
                  servicePackage.map((item) => {
                    return (
                      <Form.Check
                        type="radio"
                        label={item.package_name}
                        name="servicePackage"
                        value={item.package_id}
                        id={`package_${item.package_id}`}
                        key={item.package_id}
                        onChange={(e) =>
                          handleCheckPackage(e, item.package_name)
                        }
                        isInvalid={invalidPackage}
                      />
                    );
                  })}
              </Col>
            </Form.Group>
          </div>
          <div className="transport-body">
            <div className="transport-title">{t("booking.title4")}</div>
            <Form onSubmit={(e) => handleShowSummary(e)}>
              <Row className="mb-5">
                <Form.Group as={Col} className="col-6">
                  <Form.Label>{t("booking.label12")}</Form.Label>
                  <Form.Control
                    type="date"
                    className="mb-3"
                    onChange={(e) => handleChangeAnticipate(e)}
                    isInvalid={invalidAnticipate}
                    min={currentTime}
                  />

                  <Form.Label>{t("booking.label13")}</Form.Label>
                  <Form.Select
                    defaultValue=""
                    aria-label="depart select"
                    className="mb-3"
                    ref={originRef}
                    isInvalid={invalidDeparture}
                    onChange={() => setInvalidDeparture(false)}
                  >
                    <option value="" disabled hidden>
                      {t("booking.note7")}
                    </option>
                    {stationList &&
                      stationList.length > 0 &&
                      stationList.map((station) => {
                        return (
                          <option value={station.name} key={station.station_id}>
                            {station.name}
                          </option>
                        );
                      })}
                  </Form.Select>

                  <Form.Label>{t("booking.label14")}</Form.Label>
                  <Form.Select
                    defaultValue=""
                    aria-label="destination select"
                    ref={destinationRef}
                    isInvalid={invalidArrival}
                    onChange={() => setInvalidArrival(false)}
                  >
                    <option value="" disabled hidden>
                      {t("booking.note8")}
                    </option>
                    {stationList &&
                      stationList.length > 0 &&
                      stationList.map((station) => {
                        return (
                          <option value={station.name} key={station.station_id}>
                            {station.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} className="col-4">
                  <Form.Label>{t("booking.label15")}</Form.Label>
                  <Col sm={10}>
                    {paymentList &&
                      paymentList.length > 0 &&
                      paymentList.map((item) => {
                        return (
                          <Form.Check
                            type="radio"
                            label={
                              item.method_name
                                ? `${item.payment_type} - ${item.method_name}`
                                : `${item.payment_type}`
                            }
                            name="paymentType"
                            value={item.id}
                            id={`type_${item.id}`}
                            key={item.id}
                            onChange={(e) => handleChangePayment(e, item)}
                            isInvalid={invalidPayment}
                          />
                        );
                      })}
                  </Col>
                </Form.Group>
              </Row>

              <Modal
                show={showSummary}
                onHide={handleCloseSummary}
                backdrop="static"
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{t("booking.title5")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="order-summary">
                    <div className="bird-number">
                      {t("booking.info1")} <span>{birdList.length}</span>
                    </div>
                    <div className="route">
                      {t("booking.info2")}{" "}
                      <span>
                        {originRef?.current?.value
                          ? originRef.current.value
                          : ""}{" "}
                        -{" "}
                        {destinationRef?.current?.value
                          ? destinationRef.current.value
                          : ""}
                      </span>
                    </div>
                    <div className="package">
                      {t("booking.info3")} <span>{packageName}</span>
                    </div>
                    <div className="payment">
                      {t("booking.info4")} <span>{paymentName}</span>
                    </div>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th colSpan={3}>{t("booking.priceTitle")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{t("booking.price1")}</td>
                          <td>{costSummary?.distance?.toFixed(1)} Km</td>
                          <td>
                            {new Intl.NumberFormat().format(
                              costSummary.initCost
                            )}{" "}
                            VND
                          </td>
                        </tr>
                        <tr>
                          <td>{t("booking.price2")}</td>
                          <td>{costSummary.extraBird}</td>
                          <td>
                            {new Intl.NumberFormat().format(
                              costSummary.extraBirdCost
                            )}{" "}
                            VND
                          </td>
                        </tr>
                        <tr>
                          <td>{t("booking.price3")}</td>
                          <td>{costSummary.capacityUnit}</td>
                          <td>
                            {new Intl.NumberFormat().format(
                              costSummary.unitCost
                            )}{" "}
                            VND
                          </td>
                        </tr>
                        <tr>
                          <td>{t("booking.price4")}</td>
                          <td>{costSummary.package}</td>
                          <td>
                            {new Intl.NumberFormat().format(
                              costSummary.packageCost
                            )}{" "}
                            VND
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} style={{ textAlign: "center" }}>
                            {t("booking.total")}
                          </td>
                          <td>
                            {new Intl.NumberFormat().format(
                              costSummary.totalCost
                            )}{" "}
                            VND
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseSummary}>
                    {t("booking.backBtn")}
                  </Button>
                  <Button variant="primary" onClick={() => handleCreateOrder()}>
                    {t("booking.confirmBtn")}
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button className="confirm-order-btn" type="submit">
                {t("booking.nextBtn")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Booking;
