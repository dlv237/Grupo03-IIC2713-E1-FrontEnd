// LocationInfo.jsx

import React, { useEffect, useState } from "react";

const LocationInfo = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`https://ipinfo.io/json?token=9704d049333821`);
                const data = await response.json();
                setLocation(data);
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };

        fetchLocation();
    }, []);

    return (
        <div>
            <h2>Ubicación del usuario:</h2>
            {location ? (
                <div>
                    <p>IP: {location.ip}</p>
                    <p>País: {location.country}</p>
                    <p>Región: {location.region}</p>
                    <p>Ciudad: {location.city}</p>
                    <p>ISP: {location.org}</p>
                </div>
            ) : (
                <p>Cargando ubicación...</p>
            )}
        </div>
    );
};

export default LocationInfo;
