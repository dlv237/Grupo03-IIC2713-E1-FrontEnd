import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';

const Checkout = () => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { token_ws } = queryString.parse(window.location.search);
        const response = await axios.get(`https://flightsbooking.me/transactions?token_ws=${token_ws}`);
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
        if (transaction && transaction.status === 'APROVED') {
            const data = {
                email: user.email,
                flights: id,
                total_tickets_bought: ticketCount,
                ip_flight: ipResponse.data.ip,
              };
            await axios.post('https://flightsbooking.me/buy', data);
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