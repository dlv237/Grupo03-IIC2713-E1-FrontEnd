import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
      <ul className="navbar">
        <li className="navbar-li">
          <Link to="/" className="navbar-a">FlightsBooking</Link>
        </li>
        <div className="right-container">
            <li className="navbar-li">
            <Link to="/login" className="navbar-a">Iniciar Sesion</Link>
            </li>
            <li className="navbar-li">
            <Link to="/register" className="navbar-a">Registrarte</Link>
            </li>
        </div>
      </ul>
  );
}

export default Navbar;