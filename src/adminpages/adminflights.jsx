import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchAdminFlights = async () => {
      const url = `http://localhost:3000/admin/flights/${user.email}`;

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
        `http://localhost:3000/admin/auction`,
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
    <div className="flight-container">
      <div className="flight-card">
        <div className="section-1">
          <h1>Estos son los vuelos para el admin!</h1>
          {error && (
            <div className="error-message">
              <p>Error: {error}</p>
            </div>
          )}
          {flights.map((flight, index) => (
            <div key={index} className="flight-info">
              <h2>
                {flight.departure_airport.name} ➔ {flight.arrival_airport.name}
              </h2>
              <p>
                <strong>Hora de salida:</strong>{" "}
                {new Date(flight.departure_time).toLocaleTimeString("es-ES")}
              </p>
              <p>
                <strong>Hora de llegada:</strong>{" "}
                {new Date(flight.arrival_time).toLocaleTimeString("es-ES")}
              </p>
              <p>
                <strong>Precio:</strong>{" "}
                {flight.price.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}{" "}
                CLP
              </p>
              <p>
                <strong>Asientos disponibles:</strong>{" "}
                {flight.seats_available}
              </p>
              <button onClick={() => handleAuctionFlight(flight.auction._id)}>
                Publicar Subasta
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFlights;