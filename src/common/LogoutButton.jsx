import "../common/button.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated) {
    return (
      <>
        <Link to="/">
          <button className="login-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </Link>
        <br />
      </>
    );
  }
};

export default LogoutButton;
