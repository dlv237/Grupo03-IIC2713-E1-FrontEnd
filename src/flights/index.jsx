/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import './index.css';
import Button from '../common/Button.jsx';

const Flights = () => {
  const [flights, setFlights] = useState([]);

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

  return (
    <div className="container">
      {flights.map((flight, index) => {
        const departureDate = new Date(flight.flights[0].departure_airport.time);
        const arrivalDate = new Date(flight.flights[0].arrival_airport.time);
      
        const departureTime = departureDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        let arrivalTime = arrivalDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

        const durationMs = arrivalDate - departureDate;
        const hours = Math.floor(durationMs / 3600000);
        const minutes = Math.round((durationMs % 3600000) / 60000);
        const duration = `${hours} horas ${minutes} minutos`;
      
        if (arrivalDate.setHours(0, 0, 0, 0) > departureDate.setHours(0, 0, 0, 0)) {
          arrivalTime += " +1 día";
        }
      
        return (
          <div key={index} className="flight-card"> 
            <div className="section-1">
              <h5>Duración estimada: {duration}</h5>
              <h3>{flight.flights[0].departure_airport.id} ({departureTime})</h3>
              <h4>{flight.flights[0].departure_airport.name}</h4>
              <div className="arrow">&darr;</div>
              <h3>{flight.flights[0].arrival_airport.id} ({arrivalTime})</h3>
              <h4>{flight.flights[0].arrival_airport.name}</h4>
            </div>
            <div className="section-2">
              <h4>Aerolinea: {flight.flights[0].airline}</h4>
              <img src={flight.flights[0].airline_logo} alt="Airline logo" />
            </div>
            <div className="section-2">
              <h4>Precio: {flight.price.toLocaleString('es-ES', { style: 'currency', currency: 'CLP' })} </h4>
              <Button simple> Reservar  vuelo  </Button>
              <br />
              <Button simple>Detalle del vuelo</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Flights;
/* eslint-enable no-unused-vars */
