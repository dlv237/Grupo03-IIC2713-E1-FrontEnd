import "./navbar.css";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import FlightsBookingButton from "./FlightsBookingButton";
import ButtonBuscarVuelos from "./ButtonBuscarVuelos";
import ButtonRecomendaciones from "./ButtonRecomendaciones";
import ButtonMisVuelos from "./ButtonMisVuelos";

function Navbar() {
  const { isAuthenticated, user } = useAuth0();
  const isAdmin = user?.email === "admin@example.com";

  console.log("User:", user);

  return (
    <ul className="navbar">
      <li className="navbar-li">
        <FlightsBookingButton className="navbar-a flightsbooking-button"></FlightsBookingButton>
      </li>
      <li className="navbar-li">
        <ButtonBuscarVuelos className="navbar-a flightsbooking-button"></ButtonBuscarVuelos>
      </li>
      <div className="right-container">
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
            {isAdmin && (
              <>
                <li className="navbar-li">
                  <Link to="/admin/auctions" className="navbar-a">
                    Ofertas de otros grupos
                  </Link>
                </li>
                <li className="navbar-li">
                  <Link to="/admin/proposal" className="navbar-a">
                    Propuestas
                  </Link>
                </li>
                <li className="navbar-li">
                  <Link to="/admin-flights" className="navbar-a">
                    Auctions
                  </Link>
                </li>
                <li className="navbar-li">
                  <Link to="/settings" className="navbar-a">
                    Configuraciones
                  </Link>
                </li>
              </>
            )}
            <li className="navbar-li">
              <LogoutButton className="login-button" />
            </li>
          </>
        ) : (
          <li className="navbar-li">
            <LoginButton className="navbar-a login-button" />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navbar;
