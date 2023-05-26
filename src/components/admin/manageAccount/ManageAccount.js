import Nav from "../Nav/Nav";
import AdminSidebar from "../sidebar/AdminSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ManageAccount = () => {
  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        <div className="col-2 bg-white vh-100">
          <AdminSidebar />
        </div>
        <div className="col">
          <div className="px-3">
            <Nav />
            <div className="container-fluid bg-secondary min-vh-100">
              <div className="row g-3 my-2">
                <table className="table caption-top bg-white rounded mt-2">
                  <caption className="text-white fs-4">Manage Account</caption>

                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Address</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>a</td>
                      <td>a@gmail.com</td>
                      <td>a</td>
                      <td>0a</td>
                      <td>Customer</td>
                      <td>Enable</td>
                      <td>
                        <button type="button" className="btn btn-primary">
                          Update
                        </button>
                        <button type="button" className="btn btn-primary">
                          Delete
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>b</td>
                      <td>b@gmail.com</td>
                      <td>b</td>
                      <td>0b</td>
                      <td>Customer</td>
                      <td>Enable</td>
                      <td>
                        <button type="button" className="btn btn-primary">
                          Update
                        </button>
                        <button type="button" className="btn btn-primary">
                          Delete
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>c</td>
                      <td>c@gmail.com</td>
                      <td>c</td>
                      <td>0c</td>
                      <td>Staff</td>
                      <td>Enable</td>
                      <td>
                        <button type="button" className="btn btn-primary">
                          Update
                        </button>
                        <button type="button" className="btn btn-primary">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
