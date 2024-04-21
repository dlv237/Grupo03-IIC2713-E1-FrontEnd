import "../common/button.css";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <button
          className="login-button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Cerrar Sesión
        </button>
        <br />
      </>
    );
  }
};

export default LogoutButton;
