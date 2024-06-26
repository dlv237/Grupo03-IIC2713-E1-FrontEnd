import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../common/button.jsx";
import "./adminflights.css";

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchAdminFlights = async () => {
      const url = `https://flightsbooking.me/seeflights`;

      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Server response:", data);
        setFlights(data);
      } catch (error) {
        console.error("Error fetching admin flights:", error);
        setError(error.message);
      }
    };

    if (user) {
      fetchAdminFlights();
    }
  }, [user]);

  const handleAuctionFlight = async (auctionId) => {
    try {
      const response = await axios.post(
        `https://flightsbooking.me/admin/auction`,
        {
          email: user.email,
          auction_id: auctionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log('Subasta publicada con éxito:', response.data);
    } catch (error) {
      console.error('Error publicando la subasta:', error);
      setError(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flights-container">
      <div className="section-1">
        <h1 className="auction-main-title">Estos son los vuelos para el admin!</h1>
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}
        {flights.map((flight, index) => (
          <div key={index} className="flight-card">
            <div className="flight-info-group">
              <div className="flight-info-vertical">
                <h2 className="auction-subtitle">
                  {flight.flights[0].departure_airport.name} ➔ {flight.flights[0].arrival_airport.name}
                </h2>
                <p className="auction-text">
                  <strong>Hora de salida:</strong>{" "}
                  {new Date(flight.flights[0].departure_airport.time).toLocaleTimeString("es-ES")}
                </p>
                <p className="auction-text">
                  <strong>Hora de llegada:</strong>{" "}
                  {new Date(flight.flights[0].arrival_airport.time).toLocaleTimeString("es-ES")}
                </p>
                <p className="auction-text">
                  <strong>Precio:</strong>{" "}
                  {flight.price.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}{" "}
                  CLP
                </p>
                <p className="auction-text">
                  <strong>Asientos disponibles:</strong>{" "}
                  {flight.seats_available}
                </p>
              </div>
              <div className="flight-button">
                <Button onClick={() => handleAuctionFlight(flight.auction.auction_id)} simple>Publicar subasta</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFlights;