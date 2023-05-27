import Select from "react-select";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const AssignTrip = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [tripList, setTripList] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");

  const routes = [
    { value: "routeID1", label: "Cà Mau - Hồ Chí Minh" },
    { value: "routeID2", label: "Vũng Tàu - Khánh Hòa" },
    { value: "routeID3", label: "Đak Lak - Huế" },
  ];

  useEffect(() => {
    setTripList([
      {
        trip_id: 1,
        start_location: "Cà Mau",
        end_location: "Cần Thơ",
        delivery_limit: "7",
        departure_date: "01/06/2023 07:00:00",
        transporter_name: "Hùng",
        transport_method: "ground",
      },
      {
        trip_id: 2,
        start_location: "Cần Thơ",
        end_location: "Tiền Giang",
        delivery_limit: "5",
        departure_date: "03/06/2023 09:00:00",
        transporter_name: "Mạnh",
        transport_method: "ground",
      },
      {
        trip_id: 3,
        start_location: "Tiền Giang",
        end_location: "Hồ Chí Minh",
        delivery_limit: "3",
        departure_date: "04/06/2023 15:00:00",
        transporter_name: "Hải",
        transport_method: "ground",
      },
    ]);
  }, []);

  const trips = tripList.map((trip) => {
    return {
      value: trip.trip_id,
      label: `${trip.trip_id} - ${trip.start_location} - ${trip.end_location} - Limit: ${trip.delivery_limit}`,
    };
  });

  return (
    <>
      <Form className="mt-3 pb-5">
        <Row className="mb-3">
          <Form.Group as={Col} className="route-list">
            <Form.Label className="route-title">Select route</Form.Label>
            <Select
              defaultValue={selectedRoute}
              onChange={setSelectedRoute}
              options={routes}
            />
          </Form.Group>

          <Form.Group as={Col} className="trip-list">
            <Form.Label className="trip-title">Select trip</Form.Label>
            <Select
              defaultValue={selectedTrip}
              onChange={setSelectedTrip}
              options={trips}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" className="assign-btn">
          Confirm
        </Button>
      </Form>
    </>
  );
};

export default AssignTrip;
