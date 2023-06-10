import "./ListOrder.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ListOrder = () => {
  const orderList = [
    {
      order_id: "1",
      fullName: "John Doe",
      birdcount: "2",
      departurePoint: "Cà Mau",
      arrivalPoint: "Tiền Giang",
      status: "Pending",
    },
    {
      order_id: "2",
      fullName: "Jane Smith",
      birdcount: "4",
      departurePoint: "Đà Nẵng",
      arrivalPoint: "Huế",
      status: "Completed",
    },
    {
      order_id: "3",
      fullName: "Alice Johnson",
      birdcount: "1",
      departurePoint: "Hồ Chí Minh",
      arrivalPoint: "Đà Lạt",
      status: "In Progress",
    },
  ];

  return (
    <div className="list-order-container">
      <div className="title">List Of Orders</div>
      <div className="order-list">
        <Form.Group controlId="formGridStatus">
          <Form.Label className="filter-title">
            Filter by order status
          </Form.Label>
          <Form.Select defaultValue="" aria-label="Default select example">
            <option value="" disabled hidden>
              Select status
            </option>
            <option value="Pending">Pending</option>
            <option value="Delivering">Delivering</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>
        <Table striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>FullName</th>
              <th>Departure Point</th>
              <th>Arrival Point</th>
              <th>Bird Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.fullName}</td>
                <td>{order.departurePoint}</td>
                <td>{order.arrivalPoint}</td>
                <td>{order.birdcount}</td>
                <td>{order.status}</td>
                <td>
                  <Button variant="dark" className="mx-2">
                    Detail
                  </Button>
                  <Button variant="dark">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ListOrder;
