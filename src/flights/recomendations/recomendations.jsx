import axios from "axios";
import "./recomendations.css";
import { useEffect, useState } from "react";
import {useAuth0} from "@auth0/auth0-react";

function Recomendation(){

    const [recomendedFlights, setRecomendedFlights] = useState([]);
    const { user } = useAuth0();

    const GetRecomendedFlights = async () => {

        const response = axios.get(`https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion3/flights/recomendations/${user.email}`);
    }

    <div className="recomendations-container">
        <div className="left-recomendation-container">
            <h1>Recomendaciones</h1>
            <p>¿No sabes a donde ir? Aquí te dejamos algunas recomendaciones para que puedas elegir tu próximo destino.</p>
            {/* lista de recomendaciones */}
        </div>
        <div className="right-recomendation-container">
            {/* tabla de informacion mas especifica del vuelo seleccionado */}
        </div>
    </div>

}

export default Recomendation;