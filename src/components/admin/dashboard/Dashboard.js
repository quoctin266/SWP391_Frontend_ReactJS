import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Nav from '../Nav/Nav';
import AdminSidebar from '../sidebar/AdminSidebar';

const Dashboard = () => {
  return <div className="container-fluid bg-secondary min-vh-100">
    <div className='row'>
      <div className='col-2 bg-white vh-100'>
        <AdminSidebar />
      </div>
      <div className='col'>
        <div className='px-3'>
          <Nav />
          <div className='container-fluid bg-secondary min-vh-100'>
            <div className='row g-3 my-2'>
              <div className='col-md-4 p-1'>
                <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                  <i className="bi bi-people p-3 fs-1"></i>
                  <div>
                    <h3 className='fs-2'>5</h3>
                    <p className='fs-5'>Customer</p>
                  </div>
                </div>
              </div>
              <div className='col-md-4 p-1'>
                <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                  <i className="bi bi-people p-3 fs-1"></i>
                  <div>
                    <h3 className='fs-2'>3</h3>
                    <p className='fs-5'>Staff</p>
                  </div>
                </div>
              </div>
              <div className='col-md-4 p-1'>
                <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                  <i className="bi bi-basket2 p-3 fs-1"></i>
                  <div>
                    <h3 className='fs-2'>100</h3>
                    <p className='fs-5'>Orders</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='row g-3 my-2'>
              <div className="col">
                <div className="card mb-4">
                  <div className="card-header">
                    <i class="bi bi-currency-dollar fs-5 me-3"></i>
                    <span>Revenue</span>
                  </div>
                  <div className="card-body">
                    <canvas id="myBarChart" width="100%" height="50">
                    </canvas>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Dashboard;
