import "./flightsbookingbutton.css";
import { Link } from "react-router-dom";

const FlightsBookingButton = () => {
  return (
    <div className="center-button-fb">
      <Link to="/" className="btnfb-link">
        <button className="btnfb">
          <span class="text-fb">FLIGHTS BOOKING</span>
        </button>
      </Link>
    </div>
  );
};

export default FlightsBookingButton;
