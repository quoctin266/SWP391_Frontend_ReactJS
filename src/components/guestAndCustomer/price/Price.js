import "./price.scss";
import momo from "../../../assets/image/momo.png";
import paypal from "../../../assets/image/paypal.png";
import vnp from "../../../assets/image/vnp.png";
import { Container } from "react-bootstrap";
import { MdLabelImportant } from "react-icons/md";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getPricing } from "../../../service/APIservice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = () => {
  const [priceList, setPriceList] = useState();

  const fetchAllPrice = async () => {
    let data = await getPricing();
    if (data && data.EC === 0) {
      setPriceList(data.DT);
    } else toast.error(data.EM);
  };

  useEffect(() => {
    fetchAllPrice();
  }, []);

  return (
    <Container className="price-outer">
      <div className="price-container">
        <div className="price-info">
          <div className="info">
            <MdLabelImportant />
            This is the base fee that pays
            <br />
            for our time while we research, prepare for, and schedule your pet's
            relocation from start to finish. It includes your Pet Travel
            Specialist working with our trusted drivers to arrange for your
            pets’ safe and comfortable ground transportation.
            <br />
            <br />
            <MdLabelImportant />
            This fee does not include the price of the service package, which
            includes the basic service and other additional services. To get an
            estimate for the travel, fill out a bird travel form.
          </div>
          <div className="price-method">
            <div className="method">
              <h3 style={{ color: "#13470A" }}>Payment method</h3>
            </div>
            <div className="pic">
              <img src={momo} alt="cele icon" className="momo" />
              <img src={paypal} alt="cele icon" className="paypal" />
              <img src={vnp} alt="cele icon" className="vnp" />
            </div>
          </div>
        </div>
        <div className="price-table">
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "2rem" }}
            className="table-container"
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#839e77" }}>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Distance
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Initial cost&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Each subsequent bird&nbsp;
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                  >
                    Cost/Capacity unit&nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {priceList &&
                  priceList.length > 0 &&
                  priceList.map((item) => {
                    return (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          width={5}
                          sx={{
                            border: "0",
                            fontWeight: "bolder",
                            backgroundColor: "#CBECBC",
                          }}
                        >
                          {item.max_distance
                            ? `${new Intl.NumberFormat().format(
                                item.min_distance
                              )} - ${new Intl.NumberFormat().format(
                                item.max_distance
                              )}`
                            : `From ${new Intl.NumberFormat().format(
                                item.min_distance
                              )}`}{" "}
                          Km
                        </TableCell>
                        <TableCell
                          align="center"
                          width={3}
                          className="Name"
                          sx={{
                            border: "0",
                            fontWeight: "bolder",
                            backgroundColor: "#CBECBC",
                          }}
                        >
                          {new Intl.NumberFormat().format(item.initial_cost)}{" "}
                          VND
                        </TableCell>
                        <TableCell
                          align="center"
                          width={3}
                          className="Feedback"
                          sx={{
                            border: "0",
                            fontWeight: "bolder",
                            backgroundColor: "#CBECBC",
                          }}
                        >
                          +
                          {new Intl.NumberFormat().format(
                            item.additional_bird_cost
                          )}{" "}
                          VND
                        </TableCell>
                        <TableCell
                          align="center"
                          width={3}
                          className="Feedback"
                          sx={{
                            border: "0",
                            fontWeight: "bolder",
                            backgroundColor: "#CBECBC",
                          }}
                        >
                          {new Intl.NumberFormat().format(item.unit_cost)} VND
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default Price;
