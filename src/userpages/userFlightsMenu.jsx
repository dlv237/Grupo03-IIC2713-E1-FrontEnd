import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../common/button.jsx";
import "./userFlightsMenu.css";

const UserFlightsMenu = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth0();
  const [tickets, setTickets] = useState({});

  useEffect(() => {
    const fetchFlights = async () => {
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
      fetchFlights();
    }
  }, [user]);

  const handleAuctionFlight = async (auctionId, flightId, user, tickets) => {
    console.log('Comprando vuelo:', auctionId, flightId, user, tickets);
    try {
      const response = await axios.post(
        `https://flightsbooking.me/user/reserve`,
        {
          email: user.email,
          auction_id: auctionId,
          tickets: tickets[auctionId] || 1,
          flight_id: flightId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('Vuelo comprado con éxito:', response.data);
    } catch (error) {
      console.error('Error comprando el vuelo:', error);
      setError(error.response?.data?.error || error.message);
    }
  };

  const handleTicketsChange = (auctionId, value) => {
    setTickets({
      ...tickets,
      [auctionId]: value,
    });
  };

  return (
    <div className="flights-container">
      <div className="section-1">
        <h1 className="auction-main-title">Catálogo de vuelos disponibles</h1>
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
              <div>
                <div className="auctions-tickets-input">
                  <label className="auction-text" htmlFor={`tickets-${index}`}>
                    Cantidad de pasajes:
                  </label>
                  <input
                    type="number"
                    id={`tickets-${index}`}
                    min="1"
                    max={flight.seats_available}
                    value={tickets[flight.auction.auction_id] || 1}
                    onChange={(e) => handleTicketsChange(flight.auction.auction_id, e.target.value)}
                  />
                </div>
                <div className="flight-button">
                  <button onClick={() => handleAuctionFlight(flight.auction.auction_id, flight._id, user, tickets)} simple>Comprar Vuelo</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFlightsMenu;
