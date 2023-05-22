import axios from "../utils/axiosCustomize";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const TestData = () => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleimg = async (imgFile) => {
    let base64img = await toBase64(imgFile);
    console.log("check img", base64img);
    setImage(base64img);
  };

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("email", "testImg@gmail.com");
    data.append("name", "testImg");
    data.append("city", "hcm");
    data.append("image", image);

    let res = await axios.post("api/v1/create-user", data);
    console.log("check res", res);
    setPreview(res.data[0].image);
  };
  // const [userList, setUserList] = useState([]);

  // //calling API
  // const fetchUser = async () => {
  //   let res = await axios.get("api/v1/users");
  //   if (res?.data) {
  //     setUserList(res.data);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    // <Container style={{ marginTop: "10%" }}>
    //   <div className="testdata-container">
    //     <Table striped bordered hover>
    //       <thead>
    //         <tr>
    //           <th>No</th>
    //           <th>Email</th>
    //           <th>Name</th>
    //           <th>City</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {userList &&
    //           userList.length > 0 &&
    //           userList.map((user, index) => {
    //             return (
    //               <tr key={user.id}>
    //                 <td> {index + 1} </td>
    //                 <td> {user.email} </td>
    //                 <td> {user.name} </td>
    //                 <td> {user.city} </td>
    //               </tr>
    //             );
    //           })}
    //         {userList && userList.length === 0 && (
    //           <tr>
    //             <td colSpan={4}> No users found... </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </Table>
    //   </div>
    // </Container>
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => handleimg(e.target.files[0])}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        submit
      </Button>
      {preview && <img alt="" src={preview} />}
    </>
  );
};

export default TestData;
