import axios from "axios";
import "./recomendations.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "../common/button";
import LoadingSpinner from "../common/spinner";

function Recomendation() {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [times, setTimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const getRecomendedFlights = async () => {
    try {
      const response = await axios.get(
        `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/recommendation/${user.email}`,
      );
      const data = response.data;
      setRecommendations(
        Array.isArray(data.recommendations) ? data.recommendations : [],
      );
      setTimes(Array.isArray(data.times) ? data.times : []);
      setLoading(false);
      console.log("Fetched recommendations:", data);
    } catch (error) {
      console.error("Error fetching user recommendations", error);
      setLoading(false);
    }
  };

  const updateRecommendedFlights = async (flightId) => {
    try {
      const ipResponse = await axios.get(
        `https://ipinfo.io/json?token=9704d049333821`,
      );

      const data = {
        email: user.email,
        flights: flightId,
        ip_flight: ipResponse.data.ip,
      };

      await axios.post(
        `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/recommendation/update/${user.email}`,
        data,
      );
      console.log("Updated recommendations with flightId:", flightId);
    } catch (error) {
      console.error("Error updating recommendations", error);
    }
  };

  useEffect(() => {
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

  const handleUpdateClick = async () => {
    console.log("Clicked update button");
    if (
      recommendations.length > 0 &&
      recommendations[currentPage] &&
      recommendations[currentPage][0]
    ) {
      const flightId = recommendations[currentPage][0]._id;
      setLoading(true);
      console.log("Updating recommendations for flightId:", flightId);
      await updateRecommendedFlights(flightId);
      setTimeout(async () => {
        await getRecomendedFlights();
      }, 30000);
    } else {
      console.log("No recommendations available to update");
    }
  };

  const currentFlights =
    recommendations.length > 0 ? recommendations[currentPage] || [] : [];
  const currentTime = times.length > 0 ? times[currentPage] || "" : "";

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="recomendations-container">
      <div className="left-recomendation-container">
        <h1 className="texto-titulo-recomendaciones">Recomendaciones:</h1>
        {recommendations.length > 0 && currentFlights.length > 0 && (
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
                <p className="recommendation-text">
                  Hora de la recomendacion: {currentTime}
                </p>
              </div>
              <Link to={`/flights/${currentFlights[0]._id}`}>
                <Button simple>Reservar vuelo</Button>
              </Link>
            </div>
          </div>
        )}
        {recommendations.length > 0 && currentFlights.length > 1 && (
          <div>
            <div className="recommendation-header">
              <h2 className="recommendation-subtitle">Vuelos recomendados:</h2>
              <Button
                className="recommendation-update-button"
                simple
                onClick={handleUpdateClick}
              >
                Actualizar recomendaciones
              </Button>
            </div>
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
