import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./userbuys.css";


const VistaCompras = () => {
  const [data, setData] = useState(null);
  const [flights, setFlights] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/purchases/${user.email}`,
        );
        setData(response.data);
        console.log("Server response:", response.data);

        const flightResponses = await Promise.all(
          response.data.map((item) =>
            axios.get(`https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/flights/${item.flight}`),
          ),
        );
        setFlights(flightResponses.map((res) => res.data));
        console.log(
          "Flights data:",
          flightResponses.map((res) => res.data),
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (user && user.email) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="flight-container">
      <div className="flight-card">
        <h1>Estos son tus vuelos!</h1>
      </div>
      {data &&
        flights &&
        data.map((item, index) => {
          const flight = flights[index].flight;
          const innerFlight = flight.flights[0];
          const fecha = new Date(innerFlight.departure_airport.time);
          console.log("Flight:", flight);
          return (
            <div key={index} className="flight-card">
              <div className="section-1-v">
                <div>
                  <h1>Datos de la compra:</h1>
                  <div className="nombrevuelo">
                    <h2 style={{ marginRight: "20px", marginLeft: "40px" }}>
                      {innerFlight.departure_airport.id} ➔{" "}
                      {innerFlight.arrival_airport.id}
                    </h2>
                    <p>Fecha de salida: {fecha.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="detallescompra">
                  <p>Total Tickets: {item.total_tickets}</p>
                  <p>Flight ID: {flight._id}</p>
                  <p>
                    Status:{" "}
                    {item.status ? "Compra validada" : "Compra invalidada"}
                  </p>
                  <Link to={`/flights/${flight._id}`}>
                    Ver detalles del vuelo
                  </Link>
                </div>  
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default VistaCompras;
