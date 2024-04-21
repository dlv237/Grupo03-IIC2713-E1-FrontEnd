/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./index.css";
import Button from "../common/button.jsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Flights = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [selectedFlights, setSelectedFlights] = useState([]);

  const [flights, setFlights] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          `https://flightsbooking.me${location.pathname}${location.search}`,
        );
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, [location.pathname, location.search]);

  const totalPages = Math.ceil(flights.length / itemsPerPage);
  return (
    <div className="flight-container">
      {flights
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((flight, index) => {
          const departureDate = new Date(
            flight.flights[0].departure_airport.time,
          );
          const arrivalDate = new Date(flight.flights[0].arrival_airport.time);

          const departureTime = departureDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          });
          let arrivalTime = arrivalDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          });

          const durationMs = arrivalDate - departureDate;
          const hours = Math.floor(durationMs / 3600000);
          const minutes = Math.round((durationMs % 3600000) / 60000);
          const duration = `${hours} horas ${minutes} minutos`;

          if (
            arrivalDate.setHours(0, 0, 0, 0) >
            departureDate.setHours(0, 0, 0, 0)
          ) {
            arrivalTime += " +1 día";
          }
          const totalPages = Math.ceil(flights.length / itemsPerPage);
          return (
            <div key={index} className="flight-card">
              <div className="section-1">
                <h5>Duración estimada: {duration}</h5>
                <h3>
                  {flight.flights[0].departure_airport.id} ({departureTime})
                </h3>
                <h4>{flight.flights[0].departure_airport.name}</h4>
                <div className="arrow">&darr;</div>
                <h3>
                  {flight.flights[0].arrival_airport.id} ({arrivalTime})
                </h3>
                <h4>{flight.flights[0].arrival_airport.name}</h4>
              </div>
              <div className="section-2">
                <h4>Aerolinea: {flight.flights[0].airline}</h4>
                <img src={flight.flights[0].airline_logo} alt="Airline logo" />
              </div>
              <div className="section-2">
                <h4>
                  Precio:{" "}
                  {flight.price.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "CLP",
                  })}{" "}
                </h4>

                <Link to={`/flights/${flight._id}`}>
                  <Button simple>Reservar vuelo</Button>
                </Link>
                <br />
              </div>
            </div>
          );
        })}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1))}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages))
          }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
export default Flights;
/* eslint-enable no-unused-vars */
