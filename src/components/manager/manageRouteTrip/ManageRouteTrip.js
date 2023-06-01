import "./ManageRouteTrip.scss";
import Accordion from "react-bootstrap/Accordion";
import ManageRoute from "./detailManagement/ManageRoute";
import ManageTrip from "./detailManagement/ManageTrip";
import AssignTrip from "./detailManagement/AssignTrip";

const ManageRouteTrip = () => {
  return (
    <div className="manage-routetrip-container">
      <div className="title">Manage Route And Trip</div>
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
          <Accordion.Item eventKey="2" className="assign-trip">
            <Accordion.Header>Assign Trip to Route</Accordion.Header>
            <Accordion.Body>
              <AssignTrip />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default ManageRouteTrip;
