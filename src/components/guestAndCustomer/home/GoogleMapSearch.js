import "./Home.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import {
  getAllStation,
  getEstimateCost,
  getAllCage,
} from "../../../service/APIservice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const libraries = ["places"];

const GoogleMapSearch = () => {
  const { t } = useTranslation();
  // set up google map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBjepaAEdcoiKVQPC8VUo-DkKSikflLkmo",
    // googleMapsApiKey: "AIzaSyAOd56WYDxHrJAhOvngce5eaEIcryQ-ZBE",
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [stationList, setStationList] = useState([]);
  const [birdCount, setBirdCount] = useState("");
  const [invalidBirdCount, setInvalidBirdCount] = useState(false);
  const [estimateCost, setEstimateCost] = useState("");
  const [cageList, setCageList] = useState([]);
  const [cage, setCage] = useState();
  const [invalidCage, setInvalidCage] = useState(false);

  const originRef = useRef();
  const destinationRef = useRef();

  const navigate = useNavigate();

  const fetchAllCage = async () => {
    let data = await getAllCage();
    if (data && data.EC === 0) {
      setCageList(data.DT);
    }
  };

  const handleChangeCount = (e) => {
    setInvalidBirdCount(false);
    setBirdCount(e.target.value);
  };

  const handleChangeCage = (value) => {
    setCage(value);
    setInvalidCage(false);
  };

  const fetchAllStation = async () => {
    let data = await getAllStation();
    if (data?.DT && data.DT.length > 0) {
      setStationList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllStation();
    fetchAllCage();
  }, []);

  // calculate route distance and duration
  const calculateRoute = async (event) => {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }

    if (!birdCount) {
      setInvalidBirdCount(true);
      toast.error(`${t("google.toast1")}`);
      return;
    }

    if (!cage) {
      setInvalidCage(true);
      toast.error(`${t("google.toast2")}`);
      return;
    }

    try {
      // eslint-disable-next-line no-undef
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });

      let newDistance = results.routes[0].legs[0].distance.text;
      let data = await getEstimateCost(cage, birdCount, newDistance);

      if (data && data.EC === 0) {
        setEstimateCost(data.DT.totalCost);
      } else setEstimateCost("");

      setDirectionResponse(results);
      setDistance(newDistance);
      setDuration(results.routes[0].legs[0].duration.text);
      setShowMap(true);
    } catch (e) {
      console.log("error", e);
      toast.error("This API key has exceeded its limit usage");
    }
  };

  //reset route
  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setBirdCount("");
    setCage("");
    setShowMap(false);
  };

  const center = { lat: 10.8231, lng: 106.6297 };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-location-container">
      <div className="title">{t("google.title")}</div>
      <div className="search-bar">
        <Form>
          <Row className="search-row mb-3">
            <Col>
              <Form.Label>{t("google.start")}</Form.Label>
              <Form.Select
                aria-label="origin select"
                ref={originRef}
                className="mb-3"
              >
                {stationList &&
                  stationList.length > 0 &&
                  stationList.map((station) => {
                    return (
                      <option key={station.station_id} value={station.name}>
                        {station.name}
                      </option>
                    );
                  })}
              </Form.Select>

              <Form.Label>{t("google.quantity")}</Form.Label>
              <Form.Control
                placeholder={t("google.note1")}
                type="number"
                min="1"
                value={birdCount}
                isInvalid={invalidBirdCount}
                onChange={(e) => handleChangeCount(e)}
              />
            </Col>

            <Col>
              <Form.Label>{t("google.end")}</Form.Label>
              <Form.Select
                aria-label="origin select"
                ref={destinationRef}
                className="mb-3"
              >
                {stationList &&
                  stationList.length > 0 &&
                  stationList.map((station) => {
                    return (
                      <option key={station.station_id} value={station.name}>
                        {station.name}
                      </option>
                    );
                  })}
              </Form.Select>

              <Form.Label>{t("google.cage")}</Form.Label>
              <Form.Select
                defaultValue=""
                aria-label="cage select"
                onChange={(e) => handleChangeCage(e.target.value)}
                isInvalid={invalidCage}
              >
                <option value="" disabled hidden>
                  {t("google.note2")}
                </option>
                {cageList &&
                  cageList.length > 0 &&
                  cageList.map((cage) => {
                    return (
                      <option value={cage.cage_id} key={cage.cage_id}>
                        {cage.dimension} cm
                      </option>
                    );
                  })}
              </Form.Select>
            </Col>

            <Col>
              <Button
                variant="success"
                type="submit"
                as={Col}
                className="col-1 search-btn"
                onClick={(event) => calculateRoute(event)}
              >
                {t("google.estimateBtn")}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      {showMap && (
        <div className="google-map-container" id="googleMapContainer">
          <div className="google-map">
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                borderRadius: "15px",
              }}
              center={center}
              zoom={15}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              {directionResponse && (
                <DirectionsRenderer directions={directionResponse} />
              )}
            </GoogleMap>
          </div>
          <div className="distance-duration">
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Label>{t("google.distance")}</Form.Label>
                  <Form.Control type="text" value={distance} readOnly />
                </Col>

                <Col>
                  <Form.Label>{t("google.duration")}</Form.Label>
                  <Form.Control type="text" value={duration} readOnly />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label style={{ marginBottom: "3%" }}>
                    {t("google.result")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    aria-label="Disabled estimate example"
                    disabled
                    value={`${new Intl.NumberFormat().format(
                      estimateCost
                    )} VND`}
                  />
                  <div className="note-estimate">
                    {t("google.notePrice")}{" "}
                    <span
                      onClick={() => navigate("/price")}
                      style={{ cursor: "pointer" }}
                    >
                      <b>{t("google.click")}</b>
                    </span>
                  </div>
                </Col>
              </Row>

              <Button
                variant="success"
                type="button"
                onClick={() => map.panTo(center)}
              >
                {t("google.focus")}
              </Button>
              <Button
                className="mx-2"
                variant="success"
                type="button"
                onClick={clearRoute}
              >
                {t("google.clear")}
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapSearch;
