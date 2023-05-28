import { Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import "./FAQs.scss"


const FAQs = () => {
   return <div className="faqs-container">
      <div className="Header">
         <h2 className="title">FREQUENTLY ASKED QUESTIONS</h2>
      </div>
      <div className="Form">
      <Accordion defaultActiveKey="0" >
      <Accordion.Item eventKey="0" >
        <Accordion.Header>1. What is your bird transportation company all about?</Accordion.Header>
        <Accordion.Body>
        Our bird transportation company specializes in safely and efficiently transporting birds from one location to another. 
        Whether you need to relocate your pet bird or require professional bird transportation services for conservation efforts or special events, we have you covered.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" >
        <Accordion.Header>2. How do you ensure the safety of the birds during transportation?</Accordion.Header>
        <Accordion.Body>
        The safety of the birds is our top priority. We have experienced bird handlers who are trained in handling different bird species and ensuring their comfort during transit. Our transportation containers are specifically designed to provide adequate space, ventilation, and protection from extreme temperatures. 
        We also adhere to strict protocols to minimize stress and maintain the well-being of the birds throughout the journey.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" >
        <Accordion.Header>3. What types of birds do you transport?</Accordion.Header>
        <Accordion.Body>
        We transport a wide range of bird species, including pet birds (parrots, canaries, finches, etc.), exotic birds, endangered species for conservation purposes, and even poultry birds for farming or breeding purposes. Our team has experience in handling various bird species and will ensure the appropriate care and conditions for each type.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" >
        <Accordion.Header>4. How can I book bird transportation services?</Accordion.Header>
        <Accordion.Body>
        To book our services, you can visit our website and fill out the online booking form. Provide details such as the origin and destination locations, the type of bird(s) you need to transport, and the preferred date and time of transportation. Once we receive your request, our team will review it and get in touch with you to confirm the booking and discuss any specific requirements or concerns.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    
    <Accordion defaultActiveKey="4">
      <Accordion.Item eventKey="4" >
        <Accordion.Header>5. Are there any restrictions on the transportation of certain bird species?</Accordion.Header>
        <Accordion.Body>
        Yes, certain bird species may have legal restrictions or require special permits for transportation.
         Our team is well-versed in local and international regulations regarding bird transportation. 
         If you have any concerns or questions regarding specific bird species, please contact us directly, and we will provide you with the necessary guidance and information.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" >
        <Accordion.Header>6. How much does bird transportation cost?</Accordion.Header>
        <Accordion.Body>
        The cost of bird transportation varies depending on factors such as the distance to be covered, the type of bird(s) being transported, the required permits (if applicable), and any additional services requested. We strive to offer competitive pricing while ensuring the safety and well-being of the birds. 
        For accurate pricing details, we recommend contacting our team directly or requesting a quote through our website.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    
    <Accordion defaultActiveKey="5">
      <Accordion.Item eventKey="6" >
        <Accordion.Header>7. What happens if my bird gets injured or falls ill during transportation?</Accordion.Header>
        <Accordion.Body>
        While we take every precaution to prevent such situations, we understand that unforeseen circumstances can occur. 
        In the unfortunate event that a bird gets injured or falls ill during transportation, our bird handlers are trained in basic avian first aid. 
        We have established relationships with avian veterinarians in various locations, and we will ensure prompt medical attention for the bird, keeping you informed throughout the process.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7" >
        <Accordion.Header>8. How can I track the progress of my bird's transportation?</Accordion.Header>
        <Accordion.Body>
        We offer real-time tracking services for your peace of mind. 
        Once your bird's transportation begins, you will receive a unique tracking number or access to an online tracking system. 
        This allows you to monitor the progress of the transportation, including departure, arrival, and any important updates. 
        Our customer support team is also available to provide assistance and updates as needed.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    
  
    
    
      </div>



   </div>;
};

export default FAQs;
