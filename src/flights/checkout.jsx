import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";

const Checkout = () => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { token_ws } = queryString.parse(window.location.search);
        const response = await axios.get(
          `https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/transactions?token_ws=${token_ws}`,
        );
        setTransaction(response.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, []);

  useEffect(() => {
    const postTransaction = async () => {
      try {
        if (transaction && transaction.status === "AUTHORIZED") {
          const data = {
            email: transaction.email,
            flights: transaction.flightId,
            total_tickets_bought: transaction.total_tickets_bought,
            ip_flight: transaction.ip_flight,
          };
          await axios.post("https://8ujhmk0td0.execute-api.us-east-2.amazonaws.com/Produccion2/buy", data);
          const serviceId = 'service_n7axnzr';
            const templateId = 'template_ub1jyen';
            const publicKey = 'UveU5M9FMZjRUpumI';

            const data2 = {
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                to_email: transaction.email,
                message: 'Transacción realizada exitosamente. Muchas gracias!',
                }
            };

            try {
                const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data2);
                console.log('Email sent successfully:', res.data);
            } catch (error) {
                console.error('Failed to send email:', error);
            }
        }
      } catch (error) {
        console.error("Error posting transaction:", error);
      }
    };

    postTransaction();
  }, [transaction]);

  if (!transaction) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Email: {transaction.email}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Status: {transaction.status}</p>
    </div>
  );
};

export default Checkout;
