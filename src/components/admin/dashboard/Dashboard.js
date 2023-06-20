import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getDashboard } from "../../../service/APIservice";
import { useState } from "react";
import { useEffect } from "react";
import "./Dashboard.scss";
import _ from "lodash";

const Dashboard = () => {
  const [dataOverview, setDataOverview] = useState("");
  const [dataChart1, setDataChart1] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);

  const fetchDashboard = async () => {
    let data = await getDashboard();
    if (data && data.EC === 0) {
      setDataOverview(data.DT);

      let cloneList = _.cloneDeep(data.DT.station);
      let halfLength = Math.ceil(cloneList.length / 2);
      let chart1 = cloneList.slice(0, halfLength);
      let chart2 = cloneList.slice(halfLength, cloneList.length);
      setDataChart1(chart1);
      setDataChart2(chart2);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="title">Dashboard</div>
      <div className="dashboard-body">
        <div className="row g-3 my-2">
          <div className="col-md-6 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <i className="bi bi-people p-3 fs-1"></i>
              <div>
                <h3 className="fs-2">{dataOverview?.customer}</h3>
                <p className="fs-5">Customer</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <i className="bi bi-people p-3 fs-1"></i>
              <div>
                <h3 className="fs-2">{dataOverview?.staff}</h3>
                <p className="fs-5">Staff</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <i className="bi bi-people p-3 fs-1"></i>
              <div>
                <h3 className="fs-2">{dataOverview?.manager}</h3>
                <p className="fs-5">Manager</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <i className="bi bi-basket2 p-3 fs-1"></i>
              <div>
                <h3 className="fs-2">{dataOverview?.orders}</h3>
                <p className="fs-5">Orders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 my-2">
          <div className="col">
            <div className="card mb-4">
              <div className="card-header">
                <i className="bi bi-currency-dollar fs-5 me-3"></i>
                <span>Revenue</span>
              </div>
              <div className="card-body">
                <canvas id="myBarChart" width="100%" height="50"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="barchart-container"
          >
            <BarChart
              width={500}
              height={300}
              data={dataChart1}
              margin={{
                top: 5,
                bottom: 5,
              }}
              barSize={70}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Depart" fill="#8884d8" />
              <Bar dataKey="Arrive" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <ResponsiveContainer
            width="95%"
            height="100%"
            className="barchart-container"
          >
            <BarChart
              width={500}
              height={300}
              data={dataChart2}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={100}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Depart" fill="#8884d8" />
              <Bar dataKey="Arrive" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
