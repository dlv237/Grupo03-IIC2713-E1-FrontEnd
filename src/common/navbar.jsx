import "./navbar.css";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { isAuthenticated, user } = useAuth0();
  const isAdmin = user?.admin || false;

  console.log("User:", user);

  return (
    <ul className="navbar">
      <li className="navbar-li">
        <Link to="/" className="navbar-a">
          FlightsBooking
        </Link>
      </li>
      <li className="navbar-li">
        <Link to="/search" className="navbar-a">
          Buscar Vuelos
        </Link>
      </li>
      <div className="right-container">
        <li className="navbar-li">
          {isAuthenticated ? (
            <>
              <li className="navbar-li">
                <Link to="/recomendations" className="navbar-a">
                  ¿No sabes a donde ir?
                </Link>
              </li>
              <li className="navbar-li">
                <Link to="/my_flights" className="navbar-a">
                  Mis Vuelos
                </Link>
              </li>
              <li className="navbar-li">
                <Link to="/auction_flights" className="navbar-a">
                  Mis Vuelos
                </Link>
              </li>
              {isAdmin && (
              <li className="navbar-li">
                <Link to="/settings" className="navbar-a">
                  Configuraciones
                </Link>
              </li>
            )}
              <li className="navbar-li">
                <LogoutButton className="login-button"></LogoutButton>
              </li>
            </>
          ) : (
            <LoginButton className="navbar-a login-button"></LoginButton>
          )}
        </li>
      </div>
    </ul>
  );
}

export default Navbar;
