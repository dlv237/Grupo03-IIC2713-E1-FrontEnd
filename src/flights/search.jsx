import { useState } from "react";
import Button from "../common/button.jsx";
import { Link } from "react-router-dom";

const Search = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const params = new URLSearchParams({
    departure: input1,
    arrival: input2,
    date: input3,
  });

  return (
    <div className="flight-container">
      <div className="flight-card">
        <h2>Compara y reserva vuelos fácilmente</h2>
      </div>
      <div className="flight-card">
        <h3>Encuentra las mejores ofertas de vuelos</h3>
      </div>
      <div className="filters">
        <h4>Salida:</h4>
        <input
          className="input-field"
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="LHR"
        />
        <h4>Llegada:</h4>
        <input
          className="input-field"
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="JFK"
        />
        <h4>Fecha:</h4>
        <input
          className="date-field"
          type="date"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />
        <Link to={`/flights?${params.toString()}`}>
          <Button simple>Buscar vuelos</Button>
        </Link>
      </div>
    </div>
  );
};

export default Search;
