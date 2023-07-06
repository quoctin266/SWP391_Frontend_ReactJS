import "./AllRoute.scss";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Table from "react-bootstrap/Table";
import { getRouteDetail, getAllRoute } from "../../../service/APIservice";
import { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AllRoute = () => {
  const { t } = useTranslation();
  const [routeList, setRouteList] = useState([]);
  const [routeDetail, setRouteDetail] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const viewDetail = async (route) => {
    let data = await getRouteDetail(route.route_id);
    if (data && data.EC === 0) {
      setRouteDetail(data.DT);
      handleShow();
    } else toast.error(data.EM);
  };

  const fetchAllRoute = async () => {
    let data = await getAllRoute();
    if (data && data.EC === 0) {
      setRouteList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllRoute();
  }, []);

  return (
    <Container className="allroute-outer">
      <div className="allroute-container">
        <div className="Header">{t("allroute.header")}</div>
        <div className="route-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t("allroute.field1")}</th>
                <th>{t("allroute.field2")}</th>
                <th>{t("allroute.field3")}</th>
                <th>{t("allroute.field4")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {routeList &&
                routeList.length > 0 &&
                routeList.map((item, index) => {
                  return (
                    <tr key={item.route_id}>
                      <td>{index + 1}</td>
                      <td>{item.departure}</td>
                      <td>{item.destination}</td>
                      <td>{item.description}</td>
                      <td>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => viewDetail(item)}
                        >
                          <GrView />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              {routeList && routeList.length === 0 && (
                <tr>
                  <td colSpan={5}>Empty List...</td>
                </tr>
              )}
            </tbody>
          </Table>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("allroute.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table
                striped
                bordered
                hover
                style={{ marginTop: "4%", textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th>{t("allroute.field5")}</th>
                    <th>{t("allroute.field6")}</th>
                    <th>{t("allroute.field7")}</th>
                  </tr>
                </thead>
                <tbody>
                  {routeDetail &&
                    routeDetail.length > 0 &&
                    routeDetail.map((item) => {
                      return (
                        <tr key={item.station_id}>
                          <td>{item.station_index}</td>
                          <td>{item.name}</td>
                          <td>{item.address}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t("allroute.closeBtn")}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </Container>
  );
};

export default AllRoute;
