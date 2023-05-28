import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ViewHistory = () => {
  return <div className="view-history-container">
    <div className="Header">
         <h2 className="title">Your Transaction History</h2>
    </div>
    <div className='table'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Payment</th>
          <th>Transportation method</th>
          <th>Status</th>
          <th>Transaction code</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2023-05-01</td>
          <td>Blue Jay Delivery</td>
          <td>$25.00</td>
          <td>Car</td>
          <td>Completed</td>
          <td>MRX001234</td>
        </tr>
        <tr>
          <td>2023-05-05</td>
          <td>Parrot Export</td>
          <td>$50.00</td>
          <td>Car</td>
          <td>Completed</td>
          <td>MRX002234</td>
        </tr>
        <tr>
          <td>2023-05-09</td>
          <td>Finch Import</td>
          <td>$75.00</td>
          <td>Car</td>
          <td>Completed</td>
          <td>MRX003234</td>
        </tr>
        <tr>
          <td>2023-05-11</td>
          <td>Canary Delivery</td>
          <td>$85.00</td>
          <td>Car</td>
          <td>Completed</td>
          <td>MRX004234</td>
        </tr>
        <tr>
          <td>2023-05-17</td>
          <td>Hawk Shipment</td>
          <td>$500.00</td>
          <td>Train</td>
          <td>In Progress</td>
          <td>MRX005234</td>
        </tr>
        <tr>
          <td>2023-05-09</td>
          <td>Eagle</td>
          <td>$750.00</td>
          <td>Train</td>
          <td>Pending</td>
          <td>MRX009999</td>
        </tr>
      </tbody>
    </Table>
    </div>
    <div className='button'>
    <>
      <Button variant="primary">Back to Profile</Button>{' '}
      <Button variant="success">Back to HomePage</Button>{' '}
    </>
    </div>
  </div>;
};

export default ViewHistory;
