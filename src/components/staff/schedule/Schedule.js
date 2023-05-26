import "./Schedule.scss";
import Select from "react-select";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Schedule = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedTrip, setSelectedTrip] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [tripList, setTripList] = useState([]);

  const routes = [
    { value: "routeID1", label: "Cà Mau - Hồ Chí Minh" },
    { value: "routeID2", label: "Vũng Tàu - Khánh Hòa" },
    { value: "routeID3", label: "Đak Lak - Huế" },
  ];

  const trips = tripList.map((trip) => {
    return {
      value: trip.trip_id,
      label: `${trip.trip_id} - ${trip.start_location} - ${trip.end_location} - Limit: ${trip.delivery_limit}`,
    };
  });

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

  const orders = [
    {
      value: "orderID1",
      label: `1 - Cà Mau - Tiền Giang - ground - 2 bird(s)`,
    },
    { value: "orderID2", label: `2 - Đà Nẵng - Huế - ground - 1 bird(s)` },
    {
      value: "orderID3",
      label: `3 - Hồ chí Minh - Đà Lạt - ground - 1 bird(s)`,
    },
  ];

  return (
    <div className="schedule-container">
      <div className="title">Schedule transportation</div>
      <div className="schedule-body">
        <div className="route-title">Available routes</div>
        <div className="route-list">
          <Select
            defaultValue={selectedRoute}
            onChange={setSelectedRoute}
            options={routes}
          />
        </div>
        <div className="trip-title">Trips included</div>

        <div className="trip-list">
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Start Location</th>
                <th>End Location</th>
                <th>Departure Date</th>
                <th>Delivery Limit</th>
                <th>Transporter Name</th>
                <th>Transport Method</th>
              </tr>
            </thead>
            <tbody>
              {tripList &&
                tripList.length > 0 &&
                tripList.map((trip) => {
                  return (
                    <tr key={trip.trip_id}>
                      <td>{trip.trip_id}</td>
                      <td>{trip.start_location}</td>
                      <td>{trip.end_location}</td>
                      <td>{trip.departure_date}</td>
                      <td>{trip.delivery_limit}</td>
                      <td>{trip.transporter_name}</td>
                      <td>{trip.transport_method}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        <div className="assign-title">Assign booking order to trip</div>
        <div className="select-trip-title">Select a trip</div>
        <div className="select-trip">
          <Select
            defaultValue={selectedTrip}
            onChange={setSelectedTrip}
            options={trips}
          />
        </div>
        <div className="select-order-title">Select an order</div>
        <div className="select-order">
          <Select
            defaultValue={selectedOrder}
            onChange={setSelectedOrder}
            options={orders}
          />
        </div>
        <Button variant="success" className="confirm-btn">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Schedule;
