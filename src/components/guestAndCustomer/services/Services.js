import { Container } from "react-bootstrap";
import "./Services.scss";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { getAllService } from "../../../service/APIservice";
import { useEffect, useState } from "react";

const Services = () => {
  const [serviceList, setServiceList] = useState([]);
  const [policyList, setPolicyList] = useState([]);

  const fetchAllService = async () => {
    let data = await getAllService();
    if (data && data.EC === 0) {
      setServiceList(data.DT[0].description);
      setPolicyList(data.DT[1].description);
    }
  };

  useEffect(() => {
    fetchAllService();
  }, []);

  return (
    <Container className="service-outer">
      <div className="services-container">
        <div className="Header">
          <h2 className="title">
            Connecting People, Places, and Possibilities: Your Trusted
            Transportation Partner
          </h2>
        </div>
        <div className="Mid">
          <div className="Content1">
            <h3 className="contenttitle1">Our Services</h3>
            {serviceList &&
              serviceList.length > 0 &&
              serviceList.map((item) => {
                return (
                  <h5 className="paragraph" key={item.id}>
                    <VscDebugBreakpointLog /> {item.content}
                  </h5>
                );
              })}
          </div>
          <div className="Content2">
            <h3 className="contenttitle2">Our Policy</h3>
            {policyList &&
              policyList.length > 0 &&
              policyList.map((item) => {
                return (
                  <h5 className="paragraph" key={item.id}>
                    <VscDebugBreakpointLog /> {item.content}
                  </h5>
                );
              })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Services;
