import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import LocationInfo from "../common/LocationInfo.jsx";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Flight = () => {
  const [flight, setFlight] = useState(null);
  const { id } = useParams();
  const [showLocationInfo, setShowLocationInfo] = useState(false);
  const { user } = useAuth0();
  const [ticketCount, setTicketCount] = useState(1);
  const navigate = useNavigate();

  const handleTicketCountChange = (event) => {
    setTicketCount(event.target.value);
  };

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await fetch(`https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/flights/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setFlight(data.flight);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlight();
  }, [id]);

  const handleBuyFlight = async () => {
    try {
      const ipResponse = await axios.get(
        `https://ipinfo.io/json?token=9704d049333821`,
      );
      console.log(ipResponse.data);

      const transaction_data = {
        email: user.email,
        flightId: id,
        total_tickets_bought: ticketCount,
        ip_flight: ipResponse.data.ip,
      };

      console.log("Transaction data:", transaction_data);

      const response_webpay = await axios.post(
        "https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/transactions",
        transaction_data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const webpay_url = response_webpay.data.url;
      const token = response_webpay.data.token;

      window.location.href = webpay_url + "?token_ws=" + token;

    } catch (error) {
      console.error("Error buying flight:", error);
    }
  };

  const handleAdminBuyFlight = async () => {
    try{
      const transaction_data = {
        email: user.email,
        flightId: id,
        total_tickets_bought: ticketCount,
      };

      console.log("data:", transaction_data);

      const response = await axios.post("localhost:3000/admin-buy-ticket", transaction_data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      navigate("/admin/flights");

    } catch (error) {
      console.error("Error buying flight:", error);
    }
  }

  if (!flight || !flight.flights || flight.flights.length === 0) {
    return null;
  }

  const maxTickets = Math.min(flight.seats_available, 4);
  const canBuyTickets = ticketCount > 0 && ticketCount <= maxTickets;

  const departureDate = new Date(flight.flights[0].departure_airport.time);
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

  if (arrivalDate.setHours(0, 0, 0, 0) > departureDate.setHours(0, 0, 0, 0)) {
    arrivalTime += " +1 día";
  }

  const innerFlight = flight.flights[0];

  return (
    <div className="flight-container">
      <div className="section-1">
        <div className="flight-info">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ marginRight: "20px", marginLeft: "40px" }}>
              {innerFlight.departure_airport.id} ➔{" "}
              {innerFlight.arrival_airport.id}
            </h2>
            <div className="section-2">
              <img
                src={innerFlight.airline_logo}
                alt="AIRLINE logo"
                className="w-100px h-100px"
              />
            </div>
          </div>
          <table className="flight-table">
            <tbody>
              <tr>
                <td>
                  <strong>Airline:</strong>
                </td>
                <td>{innerFlight.airline}</td>
              </tr>
              <tr>
                <td>
                  <strong>Aeropuerto de salida:</strong>
                </td>
                <td> {innerFlight.departure_airport.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Hora de salida:</strong>
                </td>
                <td>{departureTime}</td>
              </tr>
              <tr>
                <td>
                  <strong>Aeropuerto de llegada:</strong>
                </td>
                <td>{innerFlight.arrival_airport.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Hora de llegada:</strong>
                </td>
                <td>{arrivalTime}</td>
              </tr>
              <tr>
                <td>
                  <strong>Duracion:</strong>
                </td>
                <td>{duration}</td>
              </tr>
              <tr>
                <td>
                  <strong>Avión:</strong>
                </td>
                <td>{innerFlight.airplane}</td>
              </tr>
              <tr>
                <td>
                  <strong>Fecha de salida:</strong>
                </td>
                <td>
                  {flight.flights[0].departure_airport.time &&
                  !isNaN(Date.parse(flight.flights[0].departure_airport.time))
                    ? new Date(
                        flight.flights[0].departure_airport.time,
                      ).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Fecha de salida no disponible"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Precio:</strong>
                </td>
                <td>
                  {flight.price.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}{" "}
                  CLP
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Asientos disponibles:</strong>
                </td>
                <td>{flight.seats_available} de 90</td>
              </tr>
            </tbody>
          </table>
          <div className="section-2">
            <input
              className="input-field"
              type="number"
              min="1"
              max={maxTickets}
              value={ticketCount}
              onChange={handleTicketCountChange}
              disabled={!canBuyTickets}
            />
            <button onClick={handleBuyFlight}>Comprar vuelo</button>
            <button onClick={handleAdminBuyFlight}>Reservar Vueloss</button>
            {!canBuyTickets && <p>No quedan vuelos disponibles</p>}
          </div>
        </div>

        <button onClick={() => setShowLocationInfo(true)}>
          Obtener Ubicacion (Tendrá un uso posteriormente)
        </button>
        {showLocationInfo && <LocationInfo />}
      </div>
    </div>
  );
};

export default Flight;
