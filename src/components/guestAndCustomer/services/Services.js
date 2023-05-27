
import "./Services.scss";
const Services = () => {
  return <div className="services-container">
    <container>
      <div className='header'>
        <h2>Planning a bird move can be an overwhelming and time consuming task. We specializes in animal transportation by ground, and set the standard in quality bird relocation. We minimize discomfort and stress for both you and your bird. Your peace of mind matters to us.</h2>
      </div>
      <div className="display-content">
        <div className="services">
          <div className="services-title"><h1>Bird travel services</h1></div>
          <div className="services-content">
          -Our service provides a Pet Travel Packet,<br/>
          mailed to the person who will be taking <br/>
          your pet to the airport. It includes:
          -Detailed Relocation Instructions including <br/>
          flight, crate and documentation requirement<br/>
          -Feeding Instruction Stickers<br/>
          -Live Animal Stickers
          -Airport procedures for pickup and delivery<br/>
          -Crate tag with pet/flight info<br/>
          -ASpecial gift for your pet
          </div>
        </div>

        <div className="policy">         
          <div className="policy-title"> <h1 >View our policies</h1></div>
          <div className="policy-content">
           <div>-Cancellation fee:$150 deducted <br/>
                from refund.<br/>
                -No refunds after 24 hours, extended service.<br/>
                -Should there be any circumstancesthat preclude the <br/>
                planned shipment of your pet or should you 
                have a change of plans <br/>
                or change of mind after 24 hours, <br/>
                we will extend our service agreement for <br/>
                a period of six months from the date of 
                receiving your signed contract.<br/>

           </div>
          </div>
        </div>

      </div>
    </container>


  </div>;
};

export default Services;
