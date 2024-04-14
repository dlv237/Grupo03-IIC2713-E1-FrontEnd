import React, { useEffect, useState } from 'react';

const Flights = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('https://www.we-flight.tech/flights');
                const data = await response.json();
                setFlights(data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    return (
        <div>
            Hola Holaaa
            {JSON.stringify(flights)}
        </div>
    );
};

export default Flights;