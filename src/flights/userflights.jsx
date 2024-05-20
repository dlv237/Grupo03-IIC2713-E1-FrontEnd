import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const UserFlights = () => {
  const [flights, setFlights] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchPurchases = async () => {
      const url = `https://flightsbooking.me/purchases/${user.email}`;

      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Server response:", data);

        const flightIds = data
          .filter((purchase) => purchase.flight)
          .map((purchase) => purchase.flight);

        const flightsData = await Promise.all(flightIds.map(getFlightById));
        console.log("Flights data:", flightsData);
        setFlights(flightsData);
      } catch (error) {
        console.error("Error fetching user flights:", error);
      }
    };

    if (user) {
      fetchPurchases();
    }
  }, [user]);

  const getFlightById = async (flightId) => {
    try {
      const response = await axios.get(
        `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/flights/${flightId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching flight by ID:", error);
      throw error;
    }
  };

  return (
    <div className="flight-container">
      <div className="flight-card">
        <div className="section-1">
          <h1>Estos son tus vuelos!</h1>
          {flights.map((flight, index) => (
            <div key={index} className="flight-info">
              <h2>
                {flight.departure_airport.id} ➔ {flight.arrival_airport.id}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserFlights;
