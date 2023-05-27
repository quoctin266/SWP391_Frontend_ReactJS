import "./price.scss";
import momo from "../../../assets/image/momo.png";
import paypal from "../../../assets/image/paypal.png";
import vnp from "../../../assets/image/vnp.png";
const Price = () => {
  return <div className="price-container">
    <div className="price-info">
      <div className="info">
        Our air pricing consists of 4 - 6 main components, depending on the service needed:<br />
        Air Travel Consultation Fee (priced per pet)<br />
        Ticket Purchase Fee<br />
        Mailed VIP Pet Packet<br />
        Pet’s Airfare which is based on their weight in their crate<br />
        Vet Packet (Hawaii & International travel)<br />
        Customs Clearance (International travel)<br />
        To get an estimate for air travel, fill out a pet travel form.<br />
      </div>
      <div className="price-method">
        <div className="method">
          <h3>Price method</h3>
        </div>
        <div className="pic">
          <img src={momo} alt="cele icon" className="momo" />
          <img src={paypal} alt="cele icon" className="paypal" />
          <img src={vnp} alt="cele icon" className="vnp" />
        </div>
      </div>
    </div>
    <div className="price-table">

      <table className="table">
        <tbody>
          <tr class="highlight">
            <td >Ground Travel Consultation</td>
            <td>1st Pet</td>
            <td>2nd Pet</td>
            <td>Each Additional Pet</td>
          </tr>
          <tr>
            <td>Tien Giang/ Hue / Dalat</td>
            <td>$425</td>
            <td>$325</td>
            <td>$325</td>
          </tr>
          <tr>
            <td>Ha Noi</td>
            <td>$500</td>
            <td>$400</td>
            <td>$400</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="highlight">
            <td >Airfare (per Bird)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Hai Phong</td>
            <td></td>
            <td></td>
            <td>$350 - $1,400</td>
          </tr>
          <tr>
            <td>Ha Noi</td>
            <td></td>
            <td></td>
            <td>$400 - $1,400</td>
          </tr>
          <tr>
            <td>Phu Quoc</td>
            <td></td>
            <td></td>
            <td>$500 - $1,900+</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="highlight">
            <td >Ticket Purchase Fee</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Based on Airfare Price</td>
            <td></td>
            <td></td>
            <td>$40 - $90</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="highlight">
            <td >Mailed VIP Pet Packet</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Subject to Carrier</td>
            <td></td>
            <td></td>
            <td>$50+</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="highlight">
            <td >Vet Packet/Application (For Hawaii)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Based on Service Needs</td>
            <td></td>
            <td></td>
            <td>$200+</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="highlight">
            <td >Customs Clearance Fee</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Based on country of origin and number of pets</td>
            <td></td>
            <td></td>
            <td>$850+</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="highlight">
            <td >Rush, Weekend &amp; Holiday Fees</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Subject to notice and travel day</td>
            <td></td>
            <td></td>
            <td>$200 - $300</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>;
};

export default Price;

