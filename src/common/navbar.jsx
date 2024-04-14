import React from "react";
import "./navbar.css";

function Navbar() {
  return (
      <ul className="navbar">
        <li className="navbar-li">
          <a href="/" className="navbar-a">FlightsBooking</a>
        </li>
        <div className="right-container">
            <li className="navbar-li">
            <a href="/about" className="navbar-a">Iniciar Sesion</a>
            </li>
            <li className="navbar-li">
            <a href="/contact" className="navbar-a">Registrarte</a>
            </li>
        </div>
      </ul>
  );
}

export default Navbar;