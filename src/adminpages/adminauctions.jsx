import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./adminauctions.css";
import Button from "../common/button.jsx";

const AdminAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [selectedMyAuction, setSelectedMyAuction] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth0();

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

    if (user) {
      fetchAuctions();
      fetchMyAuctions();
    }
  }, [user]);

  const createProposal = async () => {
    console.log("Button clicked");
    if (!selectedAuction || !selectedMyAuction) {
      setError("Debe seleccionar una subasta de cada lista.");
      return;
    }

    try {
      console.log("Attempting to create proposal with the following data:");
      console.log("User Email:", user.email);
      console.log("Auction ID:", selectedAuction._id);
      console.log("Departure Airport:", selectedMyAuction.departure_airport);
      console.log("Arrival Airport:", selectedMyAuction.arrival_airport);
      console.log("Departure Time:", selectedMyAuction.departure_time);
      console.log("Airline:", selectedMyAuction.airline);
      console.log("Quantity:", selectedMyAuction.quantity);

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
      setError(null);
    } catch (error) {
      console.error("Error creating proposal:", error);
      setError(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="auctions-page">
      <div className="auctions-container">
        {error && <p>{error}</p>}
        <div className="auctions-column">
          <h2>Ofrecidos</h2>
          {auctions.map((auction) => (
            <div key={auction._id} className="auction-item">
              <input
                type="radio"
                name="auction"
                value={auction._id}
                onChange={() => setSelectedAuction(auction)}
              />
              <h2 className="auction-title">Auction ID: {auction._id}</h2>
              <p className="auction-text">Departure Airport: {auction.departure_airport}</p>
              <p className="auction-text">Arrival Airport: {auction.arrival_airport}</p>
              <p className="auction-text">Departure Time: {auction.departure_time}</p>
              <p className="auction-text">Airline: {auction.airline}</p>
              <p className="auction-text">Quantity: {auction.quantity}</p>
              <p className="auction-text">Group ID: {auction.group_id}</p>
              <p className="auction-text">Type: {auction.type}</p>
            </div>
          ))}
        </div>
        <div className="auctions-column">
          <h2>Mis Subastas</h2>
          {myAuctions.map((auction) => (
            <div key={auction._id} className="auction-item">
              <input
                type="radio"
                name="myAuction"
                value={auction._id}
                onChange={() => setSelectedMyAuction(auction)}
              />
              <h2 className="auction-title">Auction ID: {auction._id}</h2>
              <p className="auction-text">Departure Airport: {auction.departure_airport}</p>
              <p className="auction-text">Arrival Airport: {auction.arrival_airport}</p>
              <p className="auction-text">Departure Time: {auction.departure_time}</p>
              <p className="auction-text">Airline: {auction.airline}</p>
              <p className="auction-text">Quantity: {auction.quantity}</p>
              <p className="auction-text">Group ID: {auction.group_id}</p>
              <p className="auction-text">Type: {auction.type}</p>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={createProposal}>Crear Propuesta</Button>
    </div>
  );
};

export default AdminAuctions;