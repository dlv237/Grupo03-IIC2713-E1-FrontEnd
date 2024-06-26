import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./auctionproposal.css";
import Button from "../common/button.jsx";
import "./auctionsWithProposals.css";

const AuctionsWithProposals = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('https://flightsbooking.me/admin/proposal', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (user.email === "admin@example.com") {
            fetchAuctions();
        }
    }, [user]);

    const acceptProposal = async (proposalId) => {
        try {
            const response = await axios.post('https://flightsbooking.me/admin/accept_auction', {
                userEmail: user.email,
                proposal_id: proposalId
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate('/admin-flights');
            console.log("Propuesta aceptada con éxito:", response.data);
        } catch (error) {
            console.error("Error al aceptar la propuesta:", error);
            setError(error.response?.data?.error || error.message);
        }
    };

    const rejectProposal = async (proposalId) => {
        try {
            const response = await axios.post('https://flightsbooking.me/admin/reject_auction', {
                userEmail: user.email,
                proposal_id: proposalId
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate('/admin-flights');
            console.log("Propuesta rechazada con éxito:", response.data);
        } catch (error) {
            console.error("Error al rechazar la propuesta:", error);
            setError(error.response?.data?.error || error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (data.length === 0) {
        return <div>No tenemos propuestas.</div>;
    }

    return (
        <div className="auctions-page">
            {data.map((item, index) => (
                <div key={index} className="auction-proposal-container">
                    <div className="auction-item">
                        <h2 className="auction-title">Auction: {item.auction.auction_id}</h2>
                        <p className="auction-text">Salida: {item.auction.departure_airport}</p>
                        <p className="auction-text">Llegada: {item.auction.arrival_airport}</p>
                        <p className="auction-text">Cantidad: {item.auction.quantity}</p>
                    </div>
                    <div className="proposals-container">
                        <h3>Proposals:</h3>
                        <ul>
                            {item.proposals.map((proposal, proposalIndex) => (
                                <li key={proposalIndex} className="proposal-item">
                                    <p className="auction-text">Salida: {proposal.departure_airport}</p>
                                    <p className="auction-text">Llegada: {proposal.arrival_airport}</p>
                                    <p className="auction-text">Cantidad: {proposal.quantity}</p>
                                    <button onClick={() => acceptProposal(proposal.proposal_id)}>Aceptar</button>
                                    <button onClick={() => rejectProposal(proposal.proposal_id)}>Rechazar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AuctionsWithProposals;