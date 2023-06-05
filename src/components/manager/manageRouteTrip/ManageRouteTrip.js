import "./ManageRouteTrip.scss";
import Accordion from "react-bootstrap/Accordion";
import ManageRoute from "./detailManagement/ManageRoute";
import ManageTrip from "./detailManagement/ManageTrip";
import ManageVehicle from "./detailManagement/ManageVehicle";
import ManageStation from "./detailManagement/ManageStation";

const ManageRouteTrip = () => {
  return (
    <div className="manage-routetrip-container">
      <div className="title">Manage Transportation</div>
      <div className="route-trip-body">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0" className="manage-route">
            <Accordion.Header>Manage Route</Accordion.Header>
            <Accordion.Body>
              <ManageRoute />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="manage-trip">
            <Accordion.Header>Manage Trip</Accordion.Header>
            <Accordion.Body>
              <ManageTrip />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="manage-vehicle">
            <Accordion.Header>Manage Vehicle</Accordion.Header>
            <Accordion.Body>
              <ManageVehicle />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className="manage-station">
            <Accordion.Header>Manage Station</Accordion.Header>
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
