import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { getDashboard, getRevenue } from "../../../service/APIservice";
import { useState } from "react";
import { useEffect } from "react";
import "./Dashboard.scss";
import _ from "lodash";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { isEnglish } from "../../../utils/i18n";

const Dashboard = () => {
  const { t } = useTranslation();
  const [dataOverview, setDataOverview] = useState("");
  const [dataChart1, setDataChart1] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);
  const [year, setYear] = useState("");
  const [showYear, setShowYear] = useState("");
  const [invalidYear, setInvalidYear] = useState(false);
  const [revenueData, setRevenueData] = useState([]);
  const [showRevenue, setShowRevenue] = useState(false);

  const handleChangeYear = (value) => {
    setInvalidYear(false);
    setYear(value);
  };

  const handleSearchYear = async (e) => {
    e.preventDefault();

    if (!year) {
      setInvalidYear(true);
      toast.error(`${t("dashboard.toast")}`);
      return;
    }

    let data = await getRevenue(year);
    if (data && data.EC === 0) {
      setRevenueData(data.DT);
      setYear("");
      setShowYear(year);
      setShowRevenue(true);
    } else {
      setShowRevenue(false);
      setRevenueData([]);
      setShowYear("");
    }
  };

  const fetchDashboard = async () => {
    let data = await getDashboard();
    if (data && data.EC === 0) {
      setDataOverview(data.DT);

      let cloneDepart = _.cloneDeep(data.DT.stationDepart);
      let cloneArrive = _.cloneDeep(data.DT.stationArrive);

      cloneDepart = cloneDepart.toSorted((a, b) => b.Depart - a.Depart);
      cloneDepart = cloneDepart.slice(0, 10);

      cloneArrive = cloneArrive.toSorted((a, b) => b.Arrive - a.Arrive);
      cloneArrive = cloneArrive.slice(0, 10);

      setDataChart1(cloneDepart);
      setDataChart2(cloneArrive);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="title">{t("dashboard.header")}</div>
      <div className="dashboard-body">
        <div className="row g-3 my-2">
          <div className="col-md-6 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <i className="bi bi-people p-3 fs-1"></i>
              <div>
                <h3 className="fs-2">{dataOverview?.customer}</h3>
                <p className="fs-5">{t("dashboard.title1")}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <i className="bi bi-basket2 p-3 fs-1"></i>
              <div>
                <h3 className="fs-2">{dataOverview?.orders}</h3>
                <p className="fs-5">{t("dashboard.title2")}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <i className="bi bi-database-check p-3 fs-1"></i>
              <div>
                <h3 className="fs-2">{dataOverview?.completed}</h3>
                <p className="fs-5">{t("dashboard.title3")}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <i className="bi bi-cart-x p-3 fs-1"></i>
              <div>
                <h3 className="fs-2">{dataOverview?.canceled}</h3>
                <p className="fs-5">{t("dashboard.title4")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 my-2">
          <div className="col">
            <div className="card mb-4">
              <div className="card-header">
                <i className="bi bi-currency-dollar fs-5 me-3"></i>
                <span>{t("dashboard.title5")}</span>
              </div>
              <div className="card-body">
                <Form onSubmit={handleSearchYear}>
                  <Row className="mb-3" style={{ alignItems: "flex-end" }}>
                    <Col>
                      <Form.Label>{t("dashboard.label")}</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={t("dashboard.note")}
                        min={2023}
                        max={2043}
                        isInvalid={invalidYear}
                        value={year}
                        onChange={(e) => handleChangeYear(e.target.value)}
                      />
                    </Col>

                    <Col>
                      <Button variant="dark" type="submit">
                        {t("dashboard.enterBtn")}
                      </Button>
                    </Col>
                    <Col></Col>
                  </Row>
                </Form>
                {showYear && (
                  <div className="revenue-title">
                    {isEnglish()
                      ? `Overall revenue in ${showYear}`
                      : `Tổng quan thu nhập năm ${showYear}`}
                  </div>
                )}
                {showRevenue && (
                  <div className="chart-revenue">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={revenueData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Income" stackId="a" fill="orange">
                          <LabelList dataKey="Income" position="top" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="chart-outer">
          <div className="chart-container">
            <div className="chart-title">{t("dashboard.title6")}</div>
            <ResponsiveContainer height="100%" className="barchart-container">
              <BarChart
                height={300}
                data={dataChart1}
                barSize={40}
                layout="vertical"
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={90}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="Depart" fill="#8884d8">
                  <LabelList dataKey="Depart" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <div className="chart-title">{t("dashboard.title7")}</div>
            <ResponsiveContainer height="100%" className="barchart-container">
              <BarChart
                width={500}
                height={300}
                data={dataChart2}
                barSize={40}
                layout="vertical"
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={90}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="Arrive" fill="#82ca9d">
                  <LabelList dataKey="Arrive" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
