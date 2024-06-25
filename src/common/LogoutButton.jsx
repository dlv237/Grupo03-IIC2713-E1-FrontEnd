import "./whitenavbarbutton.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated) {
    return (
      <div className="center-button-wb">
        <Link to="/" className="btnwb-link">
          <button className="btnwb" onClick={handleLogout}>
            <span class="text-wb">Cerrar Sesión</span>
          </button>
        </Link>
        <br />
      </div>
    );
  }
};

export default LogoutButton;




