import "./price.scss";
import momo from "../../../assets/image/momo.png";
import paypal from "../../../assets/image/paypal.png";
import vnp from "../../../assets/image/vnp.png";
import { Container } from "react-bootstrap";

const Price = () => {
  return (
    <Container>
      <div className="price-container">
        <div className="price-info">
          <div className="info">
            This is the base fee that pays
            <br />
            for our time while we research, prepare for, and schedule your pet's
            relocation from start to finish. It includes your Pet Travel
            Specialist working with our trusted drivers to arrange for your
            pets’ safe and comfortable ground transportation.
            <br />
            This fee does not include the price of the transport itself, which
            is based on mileage, or any additional services needed. To get an
            estimate for the travel, fill out a bird travel form.
          </div>
          <div className="price-method">
            <div className="method">
              <h3>Payment method</h3>
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
              <tr className="highlight">
                <th>Transport method</th>
                <th>Distance</th>
                <th>Initial cost</th>
                <th>Each subsequent bird</th>
              </tr>
              <tr>
                <td>
                  <b>Ground travel</b>
                </td>
                <td>&lt; 100 Km</td>
                <td>100,000</td>
                <td>+100,000</td>
              </tr>
              <tr>
                <td></td>
                <td>&lt; 200 Km</td>
                <td>200,000</td>
                <td>+100,000</td>
              </tr>
              <tr>
                <td></td>
                <td>&lt; 300 Km</td>
                <td>300,000</td>
                <td>+100,000</td>
              </tr>
              <tr>
                <td></td>
                <td>&lt; 400 Km</td>
                <td>400,000</td>
                <td>+100,000</td>
              </tr>
              <tr>
                <td></td>
                <td>&gt; 400 Km</td>
                <td>500,000</td>
                <td>+100,000</td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr className="highlight">
                <td>Transport method</td>
                <td>Distance</td>
                <td>Initial cost</td>
                <td>Each subsequent bird</td>
              </tr>
              <tr>
                <td>
                  <b>Air travel</b>
                </td>
                <td>&lt; 1000 Km</td>
                <td>1000,000</td>
                <td>+200,000</td>
              </tr>
              <tr>
                <td></td>
                <td>&lt; 1500 Km</td>
                <td>1,500,000</td>
                <td>+200,000</td>
              </tr>
              <tr>
                <td></td>
                <td>&lt; 2000 Km</td>
                <td>2,000,000</td>
                <td>+200,000</td>
              </tr>
              <tr>
                <td></td>
                <td>&lt; 2500 Km</td>
                <td>2,500,000</td>
                <td>+200,000</td>
              </tr>
              <tr>
                <td></td>
                <td>&gt; 2500 Km</td>
                <td>3,000,000</td>
                <td>+200,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Price;
