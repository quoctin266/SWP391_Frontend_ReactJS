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
import { useState, useRef } from "react";

const libraries = ["places"];

const GoogleMapSearch = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAOd56WYDxHrJAhOvngce5eaEIcryQ-ZBE",
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [showMap, setShowMap] = useState(false);

  const originRef = useRef();
  const destinationRef = useRef();

  const calculateRoute = async (event) => {
    event.preventDefault();
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setShowMap(true);
  };

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setShowMap(false);
  };

  const center = { lat: 10.8231, lng: 106.6297 };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-location-container">
      <div className="title">Search for Bird Transportation</div>
      <div className="search-bar">
        <Form>
          <Row className="search-row">
            <Form.Group className="mb-3" controlId="formStartPoint" as={Col}>
              <Form.Label>Start Point</Form.Label>
              <Form.Select aria-label="origin select" ref={originRef}>
                <option value="Ca Mau">Ca Mau</option>
                <option value="Ho Chi Minh">Ho Chi Minh</option>
                <option value="Ha Noi">Ha Noi</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndPoint" as={Col}>
              <Form.Label>End Point</Form.Label>
              <Form.Select aria-label="origin select" ref={destinationRef}>
                <option value="Ca Mau">Ca Mau</option>
                <option value="Ho Chi Minh">Ho Chi Minh</option>
                <option value="Ha Noi">Ha Noi</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              as={Col}
              className="col-1 search-btn"
              onClick={(event) => calculateRoute(event)}
            >
              Search
            </Button>
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
              <Form.Group className="mb-3">
                <Form.Label>Distance</Form.Label>
                <Form.Control type="text" value={distance} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control type="text" value={duration} readOnly />
              </Form.Group>
              <Button
                variant="success"
                type="button"
                onClick={() => map.panTo(center)}
              >
                Focus
              </Button>
              <Button
                className="mx-2"
                variant="success"
                type="button"
                onClick={clearRoute}
              >
                Clear
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapSearch;
