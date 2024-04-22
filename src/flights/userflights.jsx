import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const UserFlights = () => {
  const [flights, setFlights] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchUserFlights = async () => {
      const url = `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/purchases`;
      const data = {
        email: user.email
      };
      console.log(user.email);
      try {
        const response = await axios.get(url, {
          params: data,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Server response:', response.data);
        const flightPromises = Object.values(response.data)
          .filter(purchase => purchase.flight) // Filtrar vuelos no definidos
          .map(purchase => axios.get(`https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/flights/${purchase.flight}`));

        const flightResponses = await Promise.all(flightPromises);
        const flightsData = flightResponses.map(res => res.data);
        console.log('Flights data:', flightsData);
        setFlights(flightsData);
      } catch (error) {
        if (error.response) {
          console.error('Error fetching user flights:', error.response.data);
        } else if (error.request) {
          console.error('Network Error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    };

    if (user) {
      fetchUserFlights();
    }
  }, [user]);

  return (
    <div className="flight-container">
      <div className="flight-card">
        <div className="section-1">
          <h1>Estos son tus vuelos!</h1>
          {flights.map((flight, index) => (
            <div key={index} className="flight-info">
              <h2>{flight.departure_airport.id} ➔ {flight.arrival_airport.id}</h2>
              <p><strong>Hora de salida:</strong> {new Date(flight.departure_time).toLocaleTimeString("es-ES")}</p>
              <p><strong>Hora de llegada:</strong> {new Date(flight.arrival_time).toLocaleTimeString("es-ES")}</p>
              <p><strong>Precio:</strong> {flight.price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })} CLP</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserFlights;
