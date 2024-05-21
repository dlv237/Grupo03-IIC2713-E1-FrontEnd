import axios from "axios";
import "./recomendations.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Recomendation() {
  const [recomendedFlights, setRecomendedFlights] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const getRecomendedFlights = async () => {
      try {
        const response = await axios.get(
          `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/recommendation/${user.email}`,
        );
        setRecomendedFlights(response.data);
      } catch (error) {
        console.error("Error fetching user recommendations", error);
      }
    };

    if (user?.email) {
      getRecomendedFlights();
    }
  }, [user]);

  return (
    <div className="recomendations-container">
      <div className="left-recomendation-container">
        <h1 className="texto-titulo-recomendaciones">Recomendaciones:</h1>
        <ul>
          {recomendedFlights.map((flight, index) => (
            <li key={index}>{flight.destination}</li>
          ))}
        </ul>
      </div>
      <div className="right-recomendation-container">
        {/* detalles específicos del vuelo */}
      </div>
    </div>
  );
}

export default Recomendation;
