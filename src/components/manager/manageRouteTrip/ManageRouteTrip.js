import "./ManageRouteTrip.scss";
import ManageRoute from "./detailManagement/ManageRoute";
import ManageTrip from "./detailManagement/ManageTrip";
import ManageVehicle from "./detailManagement/ManageVehicle";
import ManageStation from "./detailManagement/ManageStation";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

const ManageRouteTrip = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="manage-routetrip-container">
      <div className="title">{t("manageTransportation.header")}</div>
      <div className="route-trip-body">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
              >
                <Tab
                  label={t("manageTransportation.title1")}
                  value="1"
                  style={{ fontWeight: "600", fontSize: "1em" }}
                />
                <Tab
                  label={t("manageTransportation.title2")}
                  value="2"
                  style={{ fontWeight: "600", fontSize: "1em" }}
                />
                <Tab
                  label={t("manageTransportation.title3")}
                  value="3"
                  style={{ fontWeight: "600", fontSize: "1em" }}
                />
                <Tab
                  label={t("manageTransportation.title4")}
                  value="4"
                  style={{ fontWeight: "600", fontSize: "1em" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1" className="manage-route">
              <ManageRoute />
            </TabPanel>
            <TabPanel value="2" className="manage-trip">
              <ManageTrip />
            </TabPanel>
            <TabPanel value="3" className="manage-vehicle">
              <ManageVehicle />
            </TabPanel>
            <TabPanel value="4" className="manage-station">
              <ManageStation />
            </TabPanel>
          </TabContext>
        </Box>

        {/* <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0" className="manage-route">
            <Accordion.Header>
              {t("manageTransportation.title1")}
            </Accordion.Header>
            <Accordion.Body>
              <ManageRoute />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="manage-trip">
            <Accordion.Header>
              {t("manageTransportation.title2")}
            </Accordion.Header>
            <Accordion.Body>
              <ManageTrip />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="manage-vehicle">
            <Accordion.Header>
              {t("manageTransportation.title3")}
            </Accordion.Header>
            <Accordion.Body>
              <ManageVehicle />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className="manage-station">
            <Accordion.Header>
              {t("manageTransportation.title4")}
            </Accordion.Header>
            <Accordion.Body>
              <ManageStation />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}
      </div>
    </div>
  );
};

export default ManageRouteTrip;
