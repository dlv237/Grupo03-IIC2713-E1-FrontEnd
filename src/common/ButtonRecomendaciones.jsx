import "./whitenavbarbutton.css";
import { Link } from "react-router-dom";

const ButtonRecomendaciones = () => {
  return (
    <div className="center-button-wb">
      <Link to="/recomendations" className="btnwb-link">
        <button className="btnwb">
          <span class="text-wb">¿No sabes a donde ir?</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonRecomendaciones;