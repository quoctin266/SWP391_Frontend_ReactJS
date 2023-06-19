import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Feedback.scss";
import { getAllFeedback } from "../../../service/APIservice";
import { useState } from "react";
import { useEffect } from "react";
import ProfilePic from "../../../assets/image/User_Icon.jpg";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchAllFeedback = async () => {
    let data = await getAllFeedback();
    if (data && data.EC === 0) {
      setFeedbackList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  return (
    <div className="feedback-container">
      <div className="feedback-title">Feedback</div>
      <div className="Box">
        <TableContainer component={Paper} sx={{ borderRadius: "2rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#839e77" }}>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  Profile
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  Username&nbsp;
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
                  Title&nbsp;
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bolder", border: "0" }}
                >
                  Description&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackList &&
                feedbackList.length > 0 &&
                feedbackList.map((row) => (
                  <TableRow
                    key={row.feedback_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      width={5}
                      sx={{ border: "0" }}
                      className="IconCell"
                    >
                      <img
                        className="Icon"
                        src={row.avatar ? row.avatar : ProfilePic}
                        alt="avatar"
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      width={3}
                      className="Name"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      {row.username}
                    </TableCell>
                    <TableCell
                      align="center"
                      width={3}
                      className="time"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      {row.created_time}
                    </TableCell>
                    <TableCell
                      align="center"
                      width={3}
                      className="title"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={3}
                      className="Feedback"
                      sx={{ border: "0", fontWeight: "bolder" }}
                    >
                      {row.description}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Feedback;
