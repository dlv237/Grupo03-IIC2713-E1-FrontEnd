import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../common/button.jsx";
import "./auctionsWithProposals.css";

const AuctionsWithProposals = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth0();
  
    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('https://flightsbooking.me/admin/proposal');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        if (user) {
            fetchAuctions();
        }
    }, [user]);
  
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
  
    if (data.length === 0) {
        return <div>No tenemos propuestas.</div>;
    }

    return (
        <div className="flights-container">
            <div className="section-1">
                <h1 className="auction-main-title">Propuestas de Subastas</h1>
                {data.map((item, index) => (
                    <div key={index} className="auction-card">
                        <h2>Auction: {item.auction.auction_id}</h2>
                        <p>Salida: {item.auction.departure_airport}</p>
                        <p>Llegada: {item.auction.arrival_airport}</p>
                        <p>Cantidad: {item.auction.quantity}</p>
                        <h3>Propuestas:</h3>
                        <ul className="proposals-list">
                            {item.proposals.map((proposal, proposalIndex) => (
                                <li key={proposalIndex} className="proposal-item">
                                    <p>Salida: {proposal.departure_airport}</p>
                                    <p>Llegada: {proposal.arrival_airport}</p>
                                    <p>Cantidad: {proposal.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuctionsWithProposals;
