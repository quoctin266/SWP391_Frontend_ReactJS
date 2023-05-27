import "./price.scss";
import momo from "../../../assets/image/momo.png";
import paypal from "../../../assets/image/paypal.png";
import vnp from "../../../assets/image/vnp.png";
const Price = () => {
  return <div className="price-container">
    <div className="price-info">
      <div className="info">
      This is the base fee that pays<br/> 
      for our time while we 
      research, prepare for, and schedule your pet's relocation 
      from start to finish. It includes your Pet Travel Specialist 
      working with our trusted drivers to arrange for your pets’ safe 
      and comfortable ground transportation. This fee does not include 
      the price of the transport itself, which is based on mileage, or 
      any additional services needed. 
      To get an estimate for the travel, fill out a bird travel form.
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
            <td>Pick-up area</td>
            <td>Delivery area</td>
            <td>Bird Cost</td>
            <td>Each subsequent bird</td>
          </tr>
          <tr>
            <td>District 1</td>
            <td>Distict 2</td>
            <td>300,000</td>
            <td>+100,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Distric 3</td>
            <td>300,000</td>
            <td>+100,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Distric 4</td>
            <td>350,000</td>
            <td>+100,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Distric 5</td>
            <td>500,000</td>
            <td>+100,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Distric 6</td>
            <td>500,000</td>
            <td>+100,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Tan Binh District</td>
            <td>500,000</td>
            <td>+100,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Phu Nhuan District</td>
            <td>550,000</td>
            <td>+100,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Bình Thạch District</td>
            <td>600,000</td>
            <td>+100,000</td>
          </tr>
        </tbody>
        <tbody>
        <tr class="highlight">
            <td>Pick-up area</td>
            <td>Delivery area</td>
            <td>Bird Cost</td>
            <td>Each subsequent bird</td>
          </tr>
          <tr>
            <td>Ho Chi Minh City</td>
            <td>Ha Noi</td>
            <td>1100,000</td>
            <td>+200,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Hai Phong</td>
            <td>900,000</td>
            <td>+200,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Da Nang</td>
            <td>800,000</td>
            <td>+200,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Nha Trang</td>
            <td>650,000</td>
            <td>+200,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Phu Quoc</td>
            <td>600,000</td>
            <td>+200,000</td>
          </tr>
          <tr>
            <td></td>
            <td>Hue</td>
            <td>700,000</td>
            <td>+200,000</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>;
};

export default Price;

