import axios from "axios";
import "./recomendations.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "../common/button";

function Recomendation() {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    const getRecomendedFlights = async () => {
      try {
        const response = await axios.get(
          `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/recommendation/${user.email}`,
        );
        setRecommendations(response.data.recommendations);
        setLoading(false);
        console.log(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching user recommendations", error);
        setLoading(false);
      }
    };

    if (user?.email && loading) {
      getRecomendedFlights();
    }
  }, [user, loading]);

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentFlights = recommendations[currentPage] || [];

  return (
    <div className="recomendations-container">
      <div className="left-recomendation-container">
        <h1 className="texto-titulo-recomendaciones">Recomendaciones:</h1>
        {currentFlights.length > 0 && (
          <div>
            <h2 className="recommendation-subtitle">
              Vuelo utilizado para la recomendación:
            </h2>
            <div
              className="flight-cell"
              onClick={() => handleFlightClick(currentFlights[0])}
            >
              <img
                className="recommendation-image"
                src={currentFlights[0].airlineLogo}
                alt="Airline Logo"
              />
              <div>
                <p className="recommendation-text">
                  Airline: {currentFlights[0].flights[0].airline}
                </p>
                <p className="recommendation-text">
                  Departure:{" "}
                  {currentFlights[0].flights[0].departure_airport.name}
                </p>
                <p className="recommendation-text">
                  Arrival: {currentFlights[0].flights[0].arrival_airport.name}
                </p>
                <p className="recommendation-text">
                  Price: {currentFlights[0].price} {currentFlights[0].currency}
                </p>
                <p className="recommendation-text">
                  Seats Available: {currentFlights[0].seats_available}
                </p>
              </div>
              <Link to={`/flights/${currentFlights[0]._id}`}>
                <Button simple>Reservar vuelo</Button>
              </Link>
            </div>
          </div>
        )}
        {currentFlights.length > 1 && (
          <div>
            <h2 className="recommendation-subtitle">Vuelos recomendados:</h2>
            {currentFlights.slice(1).map((flight, index) => (
              <div
                className="flight-cell"
                key={index}
                onClick={() => handleFlightClick(flight)}
              >
                <img
                  className="recommendation-image"
                  src={flight.airlineLogo}
                  alt="Airline Logo"
                />
                <div>
                  <p className="recommendation-text">
                    Airline: {flight.flights[0].airline}
                  </p>
                  <p className="recommendation-text">
                    Departure: {flight.flights[0].departure_airport.name}
                  </p>
                  <p className="recommendation-text">
                    Arrival: {flight.flights[0].arrival_airport.name}
                  </p>
                  <p className="recommendation-text">
                    Price: {flight.price} {flight.currency}
                  </p>
                  <p className="recommendation-text">
                    Seats Available: {flight.seats_available}
                  </p>
                </div>
                <Link to={`/flights/${flight._id}`}>
                  <Button simple>Reservar vuelo</Button>
                </Link>
              </div>
            ))}
            {recommendations.length > 1 && (
              <div className="pagination">
                {recommendations.map((page, index) => (
                  <button key={index} onClick={() => handlePageChange(index)}>
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="right-recomendation-container">
        {selectedFlight && (
          <div className="flight-details">
            <h2 className="recommendation-subtitle">Detalles del vuelo</h2>
            <div className="flight-detail-cell">
              <img
                className="recommendation-image-details"
                src={selectedFlight.airlineLogo}
                alt="Airline Logo"
              />
              <p className="recommendation-text">
                Airline: {selectedFlight.flights[0].airline}
              </p>
              <p className="recommendation-text">
                Airplane: {selectedFlight.flights[0].airplane}
              </p>
              <p className="recommendation-text">
                Departure: {selectedFlight.flights[0].departure_airport.name}
              </p>
              <p className="recommendation-text">
                Arrival: {selectedFlight.flights[0].arrival_airport.name}
              </p>
              <p className="recommendation-text">
                Price: {selectedFlight.price} {selectedFlight.currency}
              </p>
              <p className="recommendation-text">
                Seats Available: {selectedFlight.seats_available}
              </p>
              <p className="recommendation-text">
                Carbon Emission: {selectedFlight.carbonEmission.this_flight}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recomendation;
