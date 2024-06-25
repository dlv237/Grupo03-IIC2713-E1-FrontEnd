import "./whitenavbarbutton.css";
import { Link } from "react-router-dom";

const ButtonBuscarVuelos = () => {
  return (
    <div className="center-button-wb">
      <Link to="/search" className="btnwb-link">
        <button className="btnwb">
          <span class="text-wb">Buscar Vuelos</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonBuscarVuelos;