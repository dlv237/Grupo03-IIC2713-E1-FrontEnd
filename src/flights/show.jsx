import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import Button from "../common/button.jsx";
import LocationInfo from "../common/LocationInfo.jsx";

const Flight = () => {
  const [flight, setFlight] = useState(null);
  const { id } = useParams();
  const [showLocationInfo, setShowLocationInfo] = useState(false);

  const [ticketCount, setTicketCount] = useState(1);
  const handleTicketCountChange = (event) => {
    setTicketCount(event.target.value);
  };


  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await fetch(`https://flightsbooking.me/flights/${id}`);

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
    const data = {
      email: 'test@test.com', // reemplaza esto con el email del usuario
      flights: id, // reemplaza esto con el ID del vuelo
      ticketCount: ticketCount,
    };
    const url = `https://flightsbooking.me/${data.email}/buy`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error buying flight:', error);
    }
  };
  
  
  <Button onClick={handleBuyFlight}>Comprar vuelo</Button>

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
              <td>
                {flight.seats_available} de 90
              </td>
            </tr>
          </table>
          <div className="section-2">
            <input 
              type="number" 
              min="1" 
              max={maxTickets} 
              value={ticketCount} 
              onChange={handleTicketCountChange} 
              disabled={!canBuyTickets} 
            />
            <Button onClick={handleBuyFlight}>Comprar vuelo</Button>
            {!canBuyTickets && <p>No quedan vuelos disponibles</p>}
          </div>
        </div>

        <button
          className="BORRAR_ESTE_BOTON_E_IMPLEMENTAR_UBICACION_EN_EL_DE_ARRIBA"
          onClick={() => setShowLocationInfo(true)}
        >
          Obtener Ubicacion (Borrar este boton, lo puse porque hay que
          conectarlo con lo otro también pero para que vean como funciona)
        </button>
        {showLocationInfo && <LocationInfo />}
      </div>
    </div>
  );
};

export default Flight;
