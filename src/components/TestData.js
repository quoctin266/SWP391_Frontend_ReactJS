import axios from "../utils/axiosCustomize";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const TestData = () => {
  const [userList, setUserList] = useState([]);

  //calling API
  const fetchUser = async () => {
    let res = await axios.get("api/v1/users");
    if (res?.data) {
      setUserList(res.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container style={{ marginTop: "10%" }}>
      <div className="testdata-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Email</th>
              <th>Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList.length > 0 &&
              userList.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td> {index + 1} </td>
                    <td> {user.email} </td>
                    <td> {user.name} </td>
                    <td> {user.city} </td>
                  </tr>
                );
              })}
            {userList && userList.length === 0 && (
              <tr>
                <td colSpan={4}> No users found... </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default TestData;
