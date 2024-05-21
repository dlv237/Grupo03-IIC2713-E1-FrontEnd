import axios from "axios";
import "./recomendations.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "../common/button";

function Recomendation() {
  const [recomendedFlights, setRecomendedFlights] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const getRecomendedFlights = async () => {
      try {
        const response = await axios.get(
          `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/recommendation/${user.email}`,
        );
        console.log("response", response);
        setRecomendedFlights(response.data.recommendations[0]);
        console.log("Recomended Flights:", response.data.recommendations[0]);
        console.log("first flight", response.data.recommendations[0][0]);
      } catch (error) {
        console.error("Error fetching user recommendations", error);
      }
    };

    if (user?.email) {
      getRecomendedFlights();
    }
  }, [user]);

  return (
    <div className="recomendations-container">
      <div className="left-recomendation-container">
        <h1 className="texto-titulo-recomendaciones">Recomendaciones:</h1>
        {recomendedFlights.length > 0 && (
          <div>
            <h2 className="recommendation-subtitle">Vuelo utilizado para la recomendación:</h2>
            <div className="flight-cell">
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
              <div className="flight-cell" key={index}>
                <div>
                  <img className="recommendation-text" src={flight.airlineLogo} alt="Airline Logo" />
                  <p className="recommendation-text">Airline: {flight.flights[0].airline}</p>
                  <p className="recommendation-text">Airplane: {flight.flights[0].airplane}</p>
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
        {/* detalles específicos del vuelo */}
      </div>
    </div>
  );
}

export default Recomendation;
