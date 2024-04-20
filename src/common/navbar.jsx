import "./navbar.css";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <ul className="navbar">
      <li className="navbar-li">
        <Link to="/" className="navbar-a">
          FlightsBooking
        </Link>
      </li>
      <div className="right-container">
        {isAuthenticated ? (
          <LogoutButton></LogoutButton>
        ) : (
          <LoginButton></LoginButton>
        )}
      </div>
    </ul>
  );
}

export default Navbar;
