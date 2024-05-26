import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";

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
        setFlightDetails(flightResponse.data.flight.flights);
        console.log('Flight details:', flightResponse.data.flight.flights);
        console.log('Flight departure:', flightResponse.data.flight.flights[0].departure_airport.id);
        console.log('Flight arrival:', flightResponse.data.flight.flights[0].arrival_airport.id);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, []);

  useEffect(() => {
    const postTransaction = async () => {
      try {
        if (transaction && transaction.status === "AUTHORIZED" && flightDetails) {
          const data = {
            email: transaction.email,
            flights: transaction.flightId,
            total_tickets_bought: transaction.total_tickets_bought,
            ip_flight: transaction.ip_flight,
          };
          await axios.post("https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/buy", data);

          const pdfResponse = await axios.post("https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/reciept-dev-createPDF", {
            usuario: transaction.email,
            vuelo: `${flightDetails[0].departure_airport.id} - ${flightDetails[0].arrival_airport.id}`,
            precio: transaction.amount
          });

          console.log('PDF created:', pdfResponse.data);

          const pdfUrl = pdfResponse.data.url;
          setPdfUrl(pdfUrl);

          const serviceId = 'service_n7axnzr';
          const templateId = 'template_ub1jyen';
          const publicKey = 'UveU5M9FMZjRUpumI';
          const emailMessage = `Transacción realizada exitosamente. Muchas gracias! Puedes descargar tu recibo <a href="${pdfUrl}">aquí</a>.`;
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
    <div>
      <h1>Checkout</h1>
      <p>Email: {transaction.email}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Status: {transaction.status}</p>
      {pdfUrl && (
        <div>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Download Receipt PDF</a>
        </div>
      )}
      {flightDetails && (
        <div>
          <h2>Flight Details</h2>
          <p>Departure: {flightDetails.departure_airport.name}</p>
          <p>Arrival: {flightDetails.arrival_airport.name}</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
