import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "./ViewHistory.scss";
import { useNavigate } from "react-router-dom";

const ViewHistory = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="view-history-container">
        <div className="Header">
          <h2 className="title">Your Transaction History</h2>
        </div>
        <div className="history-table">
          <Table striped bordered hover style={{ border: "1px solid #bbbbbb" }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Created date</th>
                <th>Payment method</th>
                <th>Transportation method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>01/05/2023</td>
                <td>COD</td>
                <td>Ground travel</td>
                <td>Completed</td>
                <td>
                  <Button variant="secondary">View detail</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>03/03/2023</td>
                <td>VNPAY/MOMO</td>
                <td>Ground travel</td>
                <td>Completed</td>
                <td>
                  <Button variant="secondary">View detail</Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>02/07/2022</td>
                <td>COD</td>
                <td>Ground travel</td>
                <td>Completed</td>
                <td>
                  <Button variant="secondary">View detail</Button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>01/02/2023</td>
                <td>Paypal</td>
                <td>Ground travel</td>
                <td>Completed</td>
                <td>
                  <Button variant="secondary">View detail</Button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>20/05/2023</td>
                <td>COD</td>
                <td>Ground travel</td>
                <td>In Progress</td>
                <td>
                  <Button variant="secondary">View detail</Button>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>28/05/2023</td>
                <td>COD</td>
                <td>Ground travel</td>
                <td>Pending</td>
                <td>
                  <Button variant="secondary">View detail</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="back-button">
          <Button variant="success" onClick={() => navigate("/account-detail")}>
            Back to Profile
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ViewHistory;
