import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./adminauctions.css";
import Button from "../common/button.jsx";
import { Link } from "react-router-dom";

const AdminAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchAdminAuction = async () => {
      try {
        const response = await axios.get(
          `https://flightsbooking.me/admin/auctions`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        console.log("Server response:", data);
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching admin auctions:", error);
        setError(error.message);
      }
    };
    if (user) {
      fetchAdminAuction();
    }
  }, [user]);

  return (
    <div className="auctions-page">
      <div className="auctions-container">
        <h1 className="auctions-page-title">Subastas Disponibles</h1>
        {error && <p>{error}</p>}
        {auctions.map((auction) => (
          <div key={auction._id} className="auction-item">
            <h2 className="auction-title">Auction ID: {auction._id}</h2>
            <p className="auction-text">Departure Airport: {auction.departure_airport}</p>
            <p className="auction-text">Arrival Airport: {auction.arrival_airport}</p>
            <p className="auction-text">Departure Time: {auction.departure_time}</p>
            <p className="auction-text">Airline: {auction.airline}</p>
            <p className="auction-text">Quantity: {auction.quantity}</p>
            <p className="auction-text">Group ID: {auction.group_id}</p>
            <p className="auction-text">Type: {auction.type}</p>
            <Link to={'/flights'}>
              <Button simple>Ofrecer vuelo</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAuctions;
