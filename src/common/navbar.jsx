import "./navbar.css";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

function Navbar() {
  return (
    <ul className="navbar">
      <li className="navbar-li">
        <Link to="/" className="navbar-a">
          FlightsBooking
        </Link>
      </li>
      <div className="right-container">
        <LoginButton></LoginButton>
      </div>
    </ul>
  );
}

export default Navbar;
