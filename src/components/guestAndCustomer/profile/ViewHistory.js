import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "./ViewHistory.scss";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCustomerOrder } from "../../../service/APIservice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewHistory = () => {
  const [orderList, setOrderList] = useState();
  const navigate = useNavigate();

  const account_id = useSelector((state) => state.auth.account_id);

  useEffect(() => {
    const fetchAllOrder = async () => {
      let data = await getCustomerOrder(account_id);
      if (data && data.EC === 0) {
        setOrderList(data.DT);
      }
    };
    fetchAllOrder();
  }, [account_id]);

  return (
    <Container className="history-outer">
      <div className="view-history-container">
        <div className="Header">
          <h2 className="title">Your Orders</h2>
        </div>
        <div className="history-table">
          <TableContainer component={Paper} sx={{ borderRadius: "2rem" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#839e77" }}>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Order ID
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Created Time&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Payment Method&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Status&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Total Cost&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Actions&nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList &&
                  orderList.length > 0 &&
                  orderList.map((item) => {
                    return (
                      <TableRow
                        key={item.order_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          style={{ width: "15%" }}
                          component="th"
                          scope="row"
                          align="center"
                          width={5}
                          sx={{ border: "0" }}
                          className="tableCell"
                        >
                          {item.order_id}
                        </TableCell>
                        <TableCell
                          style={{ width: "15%" }}
                          align="center"
                          width={3}
                          className="tableCell"
                          sx={{ border: "0" }}
                        >
                          {item.created_time}
                        </TableCell>
                        <TableCell
                          style={{ width: "15%" }}
                          align="center"
                          width={3}
                          className="tableCell"
                          sx={{ border: "0" }}
                        >
                          {item.method_name
                            ? item.method_name
                            : item.payment_type}
                        </TableCell>
                        <TableCell
                          align="center"
                          width={3}
                          className="tableCell"
                          sx={{ border: "0" }}
                        >
                          {item.status}
                        </TableCell>
                        <TableCell
                          style={{ width: "15%" }}
                          align="left"
                          width={3}
                          className="tableCell"
                          sx={{ border: "0" }}
                        >
                          {item.total_cost}
                        </TableCell>
                        <TableCell
                          align="left"
                          width={3}
                          className="tableCell"
                          sx={{ border: "0" }}
                        >
                          <Button variant="secondary">Detail</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
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
