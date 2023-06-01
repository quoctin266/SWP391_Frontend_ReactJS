import "./ListOrder.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const ListOrder = () => {
  const orderList = [
    {
      transaction_id: "transactionID1",
      fullName: "John Doe",
      birdcount: "2",
      departurePoint: "Cà Mau",
      arrivalPoint: "Tiền Giang",
      status: "Pending",
    },
    {
      transaction_id: "transactionID2",
      fullName: "Jane Smith",
      birdcount: "4",
      departurePoint: "Đà Nẵng",
      arrivalPoint: "Huế",
      status: "Completed",
    },
    {
      transaction_id: "transactionID3",
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
        <Table striped hover responsive="sm">
          <thead>
            <tr>
              <th>Transaction ID</th>
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
              <tr key={order.transaction_id}>
                <td>{order.transaction_id}</td>
                <td>{order.fullName}</td>
                <td>{order.departurePoint}</td>
                <td>{order.arrivalPoint}</td>
                <td>{order.birdcount}</td>
                <td>{order.status}</td>
                <td>
                  <Button variant="dark" className="mx-2">
                    View detail
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
