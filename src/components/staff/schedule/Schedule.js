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
    {
      value: "routeID1",
      label: "Cà Mau - Cần Thơ - Hồ Chí Minh - Đồng Nai - Lâm Đồng",
    },
    { value: "routeID2", label: "Bình Định - Quảng Nam - Quảng Trị - Hà Tĩnh" },
    { value: "routeID3", label: "Hà Nội - Tuyên Quang - Lào Cai - Sơn La" },
  ];

  const trips = [];
  tripList.forEach((trip) => {
    if (trip.status === "Standby")
      trips.push({
        value: trip.trip_id,
        label: `${trip.trip_id} - ${trip.departure_date} - ${trip.transporter_name}`,
      });
  });

  useEffect(() => {
    setTripList([
      {
        trip_id: 1,
        departure_date: "01/06/2023 07:00:00",
        progress: "Driving to Sơn La",
        status: "Departed",
        transporter_name: "Hùng",
      },
      {
        trip_id: 2,
        departure_date: "03/06/2023 09:00:00",
        progress: "Currently in Tuyên Quang",
        status: "Departed",
        transporter_name: "Mạnh",
      },
      {
        trip_id: 3,
        departure_date: "05/06/2023 15:00:00",
        progress: "Driving to Tuyên Quang",
        status: "Departed",
        transporter_name: "Hải",
      },
      {
        trip_id: 4,
        departure_date: "07/06/2023 07:00:00",
        progress: "N/A",
        status: "Standby",
        transporter_name: "Hùng",
      },
      {
        trip_id: 5,
        departure_date: "08/06/2023 07:00:00",
        progress: "N/A",
        status: "Standby",
        transporter_name: "Mạnh",
      },
      {
        trip_id: 6,
        departure_date: "09/06/2023 07:00:00",
        progress: "N/A",
        status: "Standby",
        transporter_name: "Hải",
      },
    ]);
  }, []);

  const orders = [
    {
      value: "orderID1",
      label: `1 - Hà Nội - Lào Cai - Departing: 01/06/2023`,
    },
    {
      value: "orderID2",
      label: `2 - Tuyên Quang - Sơn La - Departing: 01/06/2023`,
    },
    {
      value: "orderID3",
      label: `3 - Lào Cai - Sơn La - Departing: 06/06/2023`,
    },
  ];

  return (
    <div className="schedule-container">
      <div className="title">Schedule Transportation</div>
      <div className="schedule-body">
        <div className="route-and-trip">
          <div className="route-title">Available Routes</div>
          <div className="route-list">
            <Select
              defaultValue={selectedRoute}
              onChange={setSelectedRoute}
              options={routes}
            />
            <div className="detail-title">Route detail</div>
            <div className="route-detail">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Station</th>
                    <th>Driving time</th>
                    <th>Distance from origin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hà Nội</td>
                    <td>0 hours</td>
                    <td>0 Km</td>
                  </tr>
                  <tr>
                    <td>Tuyên Quang</td>
                    <td>5 hours</td>
                    <td>15 Km</td>
                  </tr>
                  <tr>
                    <td>Lào Cai</td>
                    <td>10 hours</td>
                    <td>20 Km</td>
                  </tr>
                  <tr>
                    <td>Sơn La</td>
                    <td>15 hours</td>
                    <td>25 Km</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

          <div className="trip-title">Current Trips</div>
          <div className="trip-list">
            <Table striped bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>Trip ID</th>
                  <th>Departure Date</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Driver</th>
                  <th>Vehicle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tripList &&
                  tripList.length > 0 &&
                  tripList.map((trip) => {
                    return (
                      <tr key={trip.trip_id}>
                        <td>{trip.trip_id}</td>
                        <td>{trip.departure_date}</td>
                        <td>{trip.progress}</td>
                        <td>{trip.status}</td>
                        <td>{trip.transporter_name}</td>
                        <td>
                          <Button variant="secondary">View</Button>
                        </td>
                        <td>
                          <Button variant="secondary">Detail</Button>
                          <Button variant="warning" className="mx-2">
                            Update
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="assign-container">
          <div className="assign-title">Assign Order To Trip</div>
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
            <div className="detail-title">Order detail</div>
            <div className="order-detail">
              <Table striped bordered hover responsive="md">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Bird quantity</th>
                    <th>Departure date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Hà Nội</td>
                    <td>Lào Cai</td>
                    <td>2</td>
                    <td>01/06/2023</td>
                    <td>
                      <Button variant="secondary">View more</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <Button className="confirm-btn">Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
