import { Container } from "react-bootstrap";
import "./AboutUs.scss";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const AboutUs = () => {
  return (
    <Container className="aboutus-outer">
      <div className="aboutus-container">
        <div className="Header">
          Connecting People, Places, and Possibilities: Your Trusted
          Transportation Partner
        </div>
        <div className="Mid">
          <div className="Content1">
            <h3 className="contenttitle1">Our Staff</h3>
            <h5 className="paragraph">
              <VscDebugBreakpointLog /> At Bird Transportation Company, we take
              pride in our exceptional staff who are the backbone of our
              operations. Our team is composed of highly skilled and trained
              professionals who are committed to providing you with the best
              transportation experience possible. When you choose us, you can
              expect to interact with a knowledgeable, friendly, and
              customer-oriented staff.
            </h5>
            <h5 className="paragraph">
              <VscDebugBreakpointLog /> Expert Drivers: Our team of experienced
              drivers possesses extensive knowledge of local and regional
              routes, ensuring safe and efficient transportation. They are
              licensed, insured, and dedicated to prioritizing your comfort and
              security throughout your journey.
            </h5>
            <h5 className="paragraph">
              <VscDebugBreakpointLog /> Customer Service Representatives: Our
              friendly and responsive customer service representatives are
              available to assist you with any inquiries, bookings, or concerns
              you may have. They are well-versed in our services and are
              committed to delivering prompt and personalized support to ensure
              your satisfaction.
            </h5>
          </div>
          <div className="Content2">
            <h3 className="contenttitle2">Our Company</h3>
            <h5 className="paragraph">
            Welcome to Bird Transportation Company, your trusted provider of exceptional ground transportation services. With our comprehensive range of solutions, we specialize in delivering seamless and reliable transportation experiences. Our meticulously maintained fleet of ground vehicles, equipped with top-of-the-line amenities, ensures your comfort and satisfaction throughout your journey. Our professional chauffeurs are highly skilled and committed to providing safe and efficient transportation services. Trust Bird Transportation Company for all your ground transportation needs, and experience the difference in our exceptional service.           </h5>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
