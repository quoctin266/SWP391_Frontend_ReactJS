import "./ManageRouteTrip.scss";
import Accordion from "react-bootstrap/Accordion";
import ManageRoute from "./detailManagement/ManageRoute";
import ManageTrip from "./detailManagement/ManageTrip";
import ManageVehicle from "./detailManagement/ManageVehicle";
import ManageStation from "./detailManagement/ManageStation";
import { useTranslation } from "react-i18next";

const ManageRouteTrip = () => {
  const { t } = useTranslation();

  return (
    <div className="manage-routetrip-container">
      <div className="title">{t("manageTransportation.header")}</div>
      <div className="route-trip-body">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
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
        </Accordion>
      </div>
    </div>
  );
};

export default ManageRouteTrip;
