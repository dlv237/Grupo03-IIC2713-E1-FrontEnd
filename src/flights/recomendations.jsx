import axios from "axios";
import "./recomendations.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "../common/button";

function Recomendation() {
  const [recomendedFlights, setRecomendedFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    const getRecomendedFlights = async () => {
      try {
        const response = await axios.get(
          `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/recommendation/${user.email}`
        );
        setRecomendedFlights(response.data.recommendations[0]);
      } catch (error) {
        console.error("Error fetching user recommendations", error);
      }
    };

    if (user?.email) {
      getRecomendedFlights();
    }
  }, [user]);

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <div className="recomendations-container">
      <div className="left-recomendation-container">
        <h1 className="texto-titulo-recomendaciones">Recomendaciones:</h1>
        {recomendedFlights.length > 0 && (
          <div>
            <h2 className="recommendation-subtitle">Vuelo utilizado para la recomendación:</h2>
            <div className="flight-cell" onClick={() => handleFlightClick(recomendedFlights[0])}>
              <div>
                <img className="recommendation-text" src={recomendedFlights[0].airlineLogo} alt="Airline Logo" />
                <p className="recommendation-text">Airline: {recomendedFlights[0].flights[0].airline}</p>
                <p className="recommendation-text">Airplane: {recomendedFlights[0].flights[0].airplane}</p>
                <p className="recommendation-text">Departure: {recomendedFlights[0].flights[0].departure_airport.name}</p>
                <p className="recommendation-text">Arrival: {recomendedFlights[0].flights[0].arrival_airport.name}</p>
                <p className="recommendation-text">Price: {recomendedFlights[0].price} {recomendedFlights[0].currency}</p>
                <p className="recommendation-text">Seats Available: {recomendedFlights[0].seats_available}</p>
              </div>
              <Link to={`/flights/${recomendedFlights[0]._id}`}>
                <Button simple>Reservar vuelo</Button>
              </Link>
            </div>
          </div>
        )}
        {recomendedFlights.length > 1 && (
          <div>
            <h2 className="recommendation-subtitle">Vuelos recomendados:</h2>
            {recomendedFlights.slice(1).map((flight, index) => (
              <div className="flight-cell" key={index} onClick={() => handleFlightClick(flight)}>
                <div>
                  <img className="recommendation-text" src={flight.airlineLogo} alt="Airline Logo" />
                  <p className="recommendation-text">Airline: {flight.flights[0].airline}</p>
                  <p className="recommendation-text">Departure: {flight.flights[0].departure_airport.name}</p>
                  <p className="recommendation-text">Arrival: {flight.flights[0].arrival_airport.name}</p>
                  <p className="recommendation-text">Price: {flight.price} {flight.currency}</p>
                  <p className="recommendation-text">Seats Available: {flight.seats_available}</p>
                </div>
                <Link to={`/flights/${flight._id}`}>
                  <Button simple>Reservar vuelo</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="right-recomendation-container">
        {selectedFlight && (
          <div className="flight-details">
            <h2 className="recommendation-subtitle">Detalles del vuelo</h2>
            <div className="flight-detail-cell">
              <img className="recommendation-text" src={selectedFlight.airlineLogo} alt="Airline Logo" />
              <p className="recommendation-text">Airline: {selectedFlight.flights[0].airline}</p>
              <p className="recommendation-text">Departure: {selectedFlight.flights[0].departure_airport.name}</p>
              <p className="recommendation-text">Arrival: {selectedFlight.flights[0].arrival_airport.name}</p>
              <p className="recommendation-text">Price: {selectedFlight.price} {selectedFlight.currency}</p>
              <p className="recommendation-text">Seats Available: {selectedFlight.seats_available}</p>
              <p className="recommendation-text">Carbon Emission: {selectedFlight.carbonEmission.this_flight}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recomendation;
