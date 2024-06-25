import "./whitenavbarbutton.css";
import { Link } from "react-router-dom";

const ButtonMisVuelos = () => {
  return (
    <div className="center-button-wb">
      <Link to="/my_flights" className="btnwb-link">
        <button className="btnwb">
          <span class="text-wb">Mis Vuelos</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonMisVuelos;