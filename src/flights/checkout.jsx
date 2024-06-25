import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import "./checkout.css";

const Checkout = () => {
  const [transaction, setTransaction] = useState(null);
  const [flightDetails, setFlightDetails] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { token_ws } = queryString.parse(window.location.search);
        const response = await axios.get(
          `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/transactions?token_ws=${token_ws}`
        );
        setTransaction(response.data);

        const flightId = response.data.flightId;
        const flightResponse = await axios.get(
          `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/flights/${flightId}`
        );
        if (flightResponse.data && flightResponse.data.flight && flightResponse.data.flight.flights) {
          setFlightDetails(flightResponse.data.flight.flights);
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, []);

  useEffect(() => {
    const postTransaction = async () => {
      try {
        if (transaction && transaction.status === "AUTHORIZED" && flightDetails && flightDetails.length > 0) {
          const data = {
            email: transaction.email,
            flights: transaction.flightId,
            total_tickets_bought: transaction.total_tickets_bought,
            ip_flight: transaction.ip_flight,
          };
          await axios.post("https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/buy", data);

          const pdfResponse = await axios.post("https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/reciept-dev-createPDF", {
            usuario: transaction.email,
            vuelo: `${flightDetails[0].departure_airport.name} - ${flightDetails[0].arrival_airport.name}`,
            precio: transaction.amount
          });

          const pdfUrl = pdfResponse.data.url;
          setPdfUrl(pdfUrl);

          const serviceId = 'service_n7axnzr';
          const templateId = 'template_ub1jyen';
          const publicKey = 'UveU5M9FMZjRUpumI';
          const emailMessage = `Transacción realizada exitosamente. Muchas gracias! Puedes descargar tu recibo en el enlace de abajo`;
          const data2 = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_email: transaction.email,
              message: emailMessage,
              url: pdfUrl
            }
          };

          try {
            const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data2);
            console.log('Email sent successfully:', res.data);
            console.log('pdfUrl:', pdfUrl);
          } catch (error) {
            console.error('Failed to send email:', error);
          }
        }
      } catch (error) {
        console.error("Error posting transaction:", error);
      }
    };

    postTransaction();
  }, [transaction, flightDetails]);

  if (!transaction) {
    return <p>Loading...</p>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h1>Checkout</h1>
        <p><span>Email:</span> {transaction.email}</p>
        <p><span>Amount:</span> {transaction.amount}</p>
        <p><span>Status:</span> {transaction.status}</p>
        {pdfUrl && (
          <div>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Download Receipt PDF</a>
          </div>
        )}
        {flightDetails && flightDetails.length > 0 && (
          <div className="flight-details">
            <h2>Flight Details</h2>
            <p><span>Departure:</span> {flightDetails[0].departure_airport.name}</p>
            <p><span>Arrival:</span> {flightDetails[0].arrival_airport.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
