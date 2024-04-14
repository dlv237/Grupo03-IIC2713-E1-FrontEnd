import React, { useEffect, useState } from 'react';

const Flight = () => {
    const [flights, setFlight] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('https://www.we-flight.tech/flights/${id}');
                const data = await response.json();
                setFlight(data);
            } catch (error) {
                console.error('Error con los vuelos:', error);
            }
        };

        fetchFlights();
    }, []);

    return (
        <div>
            {/* Renderiza los vuelos aquí */}
        </div>
    );
};

export default Flights;