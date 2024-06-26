import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./adminauctions.css";

const AdminAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [selectedMyAuction, setSelectedMyAuction] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth0();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(`https://flightsbooking.me/admin/auction`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setAuctions(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchMyAuctions = async () => {
      try {
        const response = await axios.get(`https://flightsbooking.me/admin/myauction`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMyAuctions(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (user.email == "admin@example.com") {
      fetchAuctions();
      fetchMyAuctions();
    }
  }, [user]);

  const createProposal = async () => {
    if (!selectedAuction || !selectedMyAuction) {
      setError("Debe seleccionar una subasta de cada lista.");
      return;
    }

    try {
      const response = await axios.post(
        `https://flightsbooking.me/admin/auction_proposal`,
        {
          userEmail: user.email,
          auction_id: selectedAuction._id,
          departure_airport: selectedMyAuction.departure_airport,
          arrival_airport: selectedMyAuction.arrival_airport,
          departure_time: selectedMyAuction.departure_time,
          airline: selectedMyAuction.airline,
          quantity: selectedMyAuction.quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Propuesta creada con éxito:", response.data);
      const navigate = useNavigate("/admin/proposal");

      setError(null);
    } catch (error) {
      console.error("Error creating proposal:", error);
      setError(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="auctions-page">
      <div className="auctions-container">
        {error && <p className="error-message">{error}</p>}
        <div className="auctions-column">
          <h2 className="column-title">Ofrecidos</h2>
          {auctions.map((auction) => (
            <div key={auction._id} className="auction-item">
              <input
                type="radio"
                name="auction"
                value={auction._id}
                onChange={() => setSelectedAuction(auction)}
              />
              <h3 className="auction-subtitle">Auction ID: {auction._id}</h3>
              <p className="auction-text">Salida: {auction.departure_airport}</p>
              <p className="auction-text">Llegada: {auction.arrival_airport}</p>
              <p className="auction-text">Hora de salida: {auction.departure_time}</p>
              <p className="auction-text">Aerolínea: {auction.airline}</p>
              <p className="auction-text">Cantidad: {auction.quantity}</p>
              <p className="auction-text">ID de grupo: {auction.group_id}</p>
              <p className="auction-text">Tipo: {auction.type}</p>
            </div>
          ))}
        </div>
        <div className="auctions-column">
          <h2 className="column-title">Mis Subastas</h2>
          {myAuctions.map((auction) => (
            <div key={auction._id} className="auction-item">
              <input
                type="radio"
                name="myAuction"
                value={auction._id}
                onChange={() => setSelectedMyAuction(auction)}
              />
              <h3 className="auction-subtitle">Auction ID: {auction._id}</h3>
              <p className="auction-text">Salida: {auction.departure_airport}</p>
              <p className="auction-text">Llegada: {auction.arrival_airport}</p>
              <p className="auction-text">Hora de salida: {auction.departure_time}</p>
              <p className="auction-text">Aerolínea: {auction.airline}</p>
              <p className="auction-text">Cantidad: {auction.quantity}</p>
              <p className="auction-text">ID de grupo: {auction.group_id}</p>
              <p className="auction-text">Tipo: {auction.type}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="create-proposal-button" onClick={createProposal}>Crear Propuesta</button>
    </div>
  );
};

export default AdminAuctions;
