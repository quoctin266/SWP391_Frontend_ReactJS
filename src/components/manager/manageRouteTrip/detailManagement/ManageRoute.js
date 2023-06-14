import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddRoute from "./RouteCRUD/AddRoute";
import ViewRoute from "./RouteCRUD/ViewRoute";
import { getAllRoute, getRouteDetail } from "../../../../service/APIservice";
import { useEffect } from "react";
import _ from "lodash";
import { toTime } from "../../../../utils/reuseFunction";
import { toast } from "react-toastify";
import EditRoute from "./RouteCRUD/EditRoute";

const ManageRoute = () => {
  const [routeList, setRouteList] = useState([]);
  const [routeDetail, setRouteDetail] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [routeID, setRouteID] = useState("");

  const fetchAllRoute = async () => {
    let data = await getAllRoute();
    if (data && data.EC === 0) {
      setRouteList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllRoute();
  }, []);

  const handleClickEdit = async (routeID) => {
    let data = await getRouteDetail(routeID);
    if (data && data.EC === 0) {
      let cloneList = _.cloneDeep(data.DT);
      cloneList.forEach((item) => {
        let timeObj = toTime(item.driving_time);

        item.driving_time_text = `${timeObj.day} Days ${timeObj.hour} Hours ${timeObj.minute} Minutes`;
        item.distance = +item.distance.toFixed(1);
      });
      setShowEdit(true);
      setRouteID(routeID);
      setRouteDetail(cloneList);
    } else toast.error(data.EM);
  };

  return (
    <>
      <AddRoute fetchAllRoute={fetchAllRoute} />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Departure</th>
            <th>Destination</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routeList &&
            routeList.length > 0 &&
            routeList.map((route) => {
              return (
                <tr key={route.route_id}>
                  <td>{route.route_id}</td>
                  <td>{route.departure}</td>
                  <td>{route.destination}</td>
                  <td>{route.description}</td>
                  <td>
                    <ViewRoute route_id={route.route_id} />
                    <Button
                      variant="warning"
                      className="mx-2"
                      onClick={() => handleClickEdit(route.route_id)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
          {routeList && routeList.length === 0 && (
            <tr>
              <td colSpan={5}>List is empty...</td>
            </tr>
          )}
        </tbody>
      </Table>

      {showEdit && (
        <EditRoute
          routeDetail={routeDetail}
          setRouteDetail={setRouteDetail}
          setShowEdit={setShowEdit}
          handleClickEdit={handleClickEdit}
          routeID={routeID}
        />
      )}
    </>
  );
};

export default ManageRoute;
