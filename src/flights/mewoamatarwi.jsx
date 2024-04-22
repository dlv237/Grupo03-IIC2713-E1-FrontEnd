import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
const MyComponent = () => {
    const [data, setData] = useState(null);
    const [flights, setFlights] = useState(null);
    const { user } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://flightsbooking.me/purchases/${user.email}`);
                setData(response.data);
                console.log('Server response:', response.data);

                const flightResponses = await Promise.all(response.data.map(item => 
                    axios.get(`https://flightsbooking.me/flights/${item.flight}`)
                ));
                setFlights(flightResponses.map(res => res.data));
                console.log('Flights data:', flightResponses.map(res => res.data));
            } catch (error) {
                console.error(error);
            }
        };
    
        if (user && user.email) {
            fetchData();
        }
    }, [user]);

    return (
        <div className="flight-container">
            <div className="flight-card">
                <h1>Estos son tus vuelos!</h1>
            </div>
            {data && flights && data.map((item, index) => {
                const flight = flights[index].flight;
                console.log('Flight:', flight);
                return (
                    <div key={index} className="flight-card">
                        <div className="section-1">
                            <div>
                                <h1>Datos de la compra:</h1>
                                <p>Total Tickets: {item.total_tickets}</p>
                                <p>Flight ID: {flight._id}</p>
                                <p>Status: {item.status ? 'True' : 'False'}</p>
                                <Link to={`/flights/${flight._id}`}>Ver detalles del vuelo</Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyComponent;