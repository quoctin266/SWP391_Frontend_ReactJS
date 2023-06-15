import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { getRouteDetail } from "../../../../../service/APIservice";
import { toast } from "react-toastify";
import _ from "lodash";
import { toTime } from "../../../../../utils/reuseFunction";

const ViewRoute = (props) => {
  const [show, setShow] = useState(false);
  const [routeDetail, setRouteDetail] = useState([]);

  const handleShow = async () => {
    let data = await getRouteDetail(props.route_id);
    if (data && data.EC === 0) {
      let cloneList = _.cloneDeep(data.DT);
      cloneList.forEach((item) => {
        let timeObj = toTime(item.driving_time);

        item.driving_time = `${timeObj.day} Days ${timeObj.hour} Hours ${timeObj.minute} Minutes`;
        item.distance = +item.distance.toFixed(1);
      });

      setRouteDetail(cloneList);
    } else toast.error(data.EM);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow} className="add-btn">
        Detail
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Route Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Index</th>
                <th>Station</th>
                <th>Driving Time From First Station</th>
                <th>Distance From First Station</th>
              </tr>
            </thead>
            <tbody>
              {routeDetail &&
                routeDetail.length > 0 &&
                routeDetail.map((station) => {
                  return (
                    <tr key={station.station_id}>
                      <td>{station.station_index}</td>
                      <td>{station.name}</td>
                      <td>{station.driving_time}</td>
                      <td>{station.distance} Km</td>
                    </tr>
                  );
                })}
              {routeDetail && routeDetail.length === 0 && (
                <tr>
                  <td colSpan={5}>Not Found...</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewRoute;
