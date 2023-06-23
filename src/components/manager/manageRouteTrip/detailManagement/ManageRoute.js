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
import DeleteRoute from "./RouteCRUD/DeleteRoute";

const ManageRoute = () => {
  const [routeList, setRouteList] = useState([]);
  const [routeDetail, setRouteDetail] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [route, setRoute] = useState("");

  const fetchAllRoute = async () => {
    let data = await getAllRoute();
    if (data && data.EC === 0) {
      setRouteList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllRoute();
  }, []);

  const handleClickEdit = async (route) => {
    let data = await getRouteDetail(route.route_id);
    if (data && data.EC === 0) {
      let cloneList = _.cloneDeep(data.DT);
      cloneList.forEach((item) => {
        let timeObj = toTime(item.driving_time);

        item.driving_time_text = `${timeObj.day} Days ${timeObj.hour} Hours ${timeObj.minute} Minutes`;
        item.distance = +item.distance.toFixed(1);
      });
      cloneList.sort(function (a, b) {
        return a.station_index - b.station_index;
      });
      setShowEdit(true);
      setRoute(route);
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
                  <td style={{ width: "25%" }}>
                    <ViewRoute route_id={route.route_id} />
                    <Button
                      variant="warning"
                      className="mx-2"
                      onClick={() => handleClickEdit(route)}
                    >
                      Edit
                    </Button>
                    <DeleteRoute route={route} fetchAllRoute={fetchAllRoute} />
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
          route={route}
          fetchAllRoute={fetchAllRoute}
        />
      )}
    </>
  );
};

export default ManageRoute;
