import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const AdminAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchAdminAuction = async () => {
        try{
        const response = await axios.get(
          `http://localhost:3000/admin/auctions`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
        const data = await response.json();
        console.log("Server response:", data);
        setAuctions(data);}
        catch (error) {
            console.error("Error fetching admin auctions:", error);
            setError(error.message);
          }
    };
    if(user){
        fetchAdminAuction();
    }
}, [user]);
    return (
        <div className="auctions-container">
      <h1>Subastas Disponibles</h1>
      {error && <p>{error}</p>}
      {auctions.map((auction) => (
        <div key={auction._id} className="auction-item">
          <h2>Auction ID: {auction._id}</h2>
          <p>Departure Airport: {auction.departure_airport}</p>
          <p>Arrival Airport: {auction.arrival_airport}</p>
          <p>Departure Time: {auction.departure_time}</p>
          <p>Airline: {auction.airline}</p>
          <p>Quantity: {auction.quantity}</p>
          <p>Group ID: {auction.group_id}</p>
          <p>Type: {auction.type}</p>
        </div>
      ))}
    </div>
  );
};
export default AdminAuctions;
