/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const Flights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:3000/flights");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        console.log(data);
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      Hola Holaaa
      <div dangerouslySetInnerHTML={{ __html: flights }} />
    </div>
  );
};

export default Flights;
/* eslint-enable no-unused-vars */
