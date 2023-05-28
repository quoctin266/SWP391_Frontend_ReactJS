import { Container } from "react-bootstrap";
import "./Services.scss";
const Services = () => {
  return (
    <Container>
    <div className="services-container">

      <div className="Header">
        <h2 className="title">Connecting People, Places, and Possibilities: Your Trusted Transportation Partner</h2>
      </div>
      <div className="Mid">
        <div className="Content1">
          <h3 className="contenttitle1">Our Services</h3>
          <h5 className="paragraph">Our service provides a Pet Travel Packet, mailed to the person who will be taking your pet to the airport.</h5>
          <h5 className="paragraph">Relocating birds is a more technical process than you may realize. We specialize in arranging animal freight / animal cargo and provide for your bird’s travel safety and comfort from door to door.</h5>
          <h5 className="paragraph">Our services includes: Detailed Relocation Instructions including flight, crate and documentation requirement, free foods and drink for your birds, provide all necessary insurance services during the trip</h5>
        </div>
        <div className="Content2">
          <h3 className="contenttitle2">Our policy</h3>
          <h5 className="paragraph">If you cancel within 24 hours of submitting your signed contract, we will refund your fee minus a 150,000vnd administration fee.</h5>
          <h5 className="paragraph">No refunds will be given more than 24 hours after submitting your signed contract and no refunds will be given for rush services.</h5>
          <h5 className="paragraph">After the 24-hour period, should there be any circumstances that preclude the planned shipment of your birds, we will extend our service agreement for six months from the date of receiving your signed contract.</h5>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default Services;
