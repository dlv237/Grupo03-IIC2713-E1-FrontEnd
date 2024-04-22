import "./loginbutton.css";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return (
      <div className="center-button">
        <button className="login-button" onClick={() => loginWithRedirect()}>
          Iniciar Sesión
        </button>
      </div>
    );
  }
};

export default LoginButton;