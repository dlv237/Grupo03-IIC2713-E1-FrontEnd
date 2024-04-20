/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./index.css";
import Button from "../common/button.jsx";
import { Link } from 'react-router-dom';



const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [arrivalFilter, setArrivalFilter] = useState("");
  const [departureFilter, setDepartureFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:3000/flights");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const filteredFlights = flights.filter((flight) => {
    const departureMatch = departureFilter
      ? flight.flights[0].departure_airport.id.includes(departureFilter)
      : true;
    const arrivalMatch = arrivalFilter
      ? flight.flights[0].arrival_airport.id.includes(arrivalFilter)
      : true;
    const dateMatch = dateFilter
      ? flight.flights[0].departure_airport.time.includes(dateFilter)
      : true;

    return departureMatch && arrivalMatch && dateMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedFlights = filteredFlights.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
  return (
    <div className="flight-container">
      <div className="filters">
        <h4>Salida</h4>
        <input
          type="text"
          value={departureFilter}
          onChange={(e) => setDepartureFilter(e.target.value)}
          placeholder="Departure"
        />
        <h4>Llegada</h4>
        <input
          type="text"
          value={arrivalFilter}
          onChange={(e) => setArrivalFilter(e.target.value)}
          placeholder="Arrival"
        />
        <h4>Fecha</h4>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <h4>Items por página</h4>
        <input
          type="number"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Math.max(5, e.target.value))}
          min="5"
          placeholder="Items per page"
        />
      </div>
      {selectedFlights.map((flight, index) => {
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
          arrivalDate.setHours(0, 0, 0, 0) > departureDate.setHours(0, 0, 0, 0)
        ) {
          arrivalTime += " +1 día";
        }
        const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
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
