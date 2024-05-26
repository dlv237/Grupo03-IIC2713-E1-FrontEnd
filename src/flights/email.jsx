import axios from 'axios';
import React, { useEffect } from 'react';

const EmailRestAPI = () => {
  useEffect(() => {
    const sendEmail = async () => {
      // Your EmailJS service ID, template ID, and Public Key
      const serviceId = 'service_n7axnzr';
      const templateId = 'template_ub1jyen';
      const publicKey = 'UveU5M9FMZjRUpumI';

      // Create an object with EmailJS service ID, template ID, Public Key, and Template params
      const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: 'arquisis.grupo03@gmail.com',
          message: 'Transacción realizada exitosamente. Muchas gracias!',
        }
      };

      // Send the email using EmailJS
      try {
        const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
        console.log('Email sent successfully:', res.data);
        window.location.href = "/flights/resultado";
      } catch (error) {
        console.error('Failed to send email:', error);
      }
    };

    sendEmail();
  }, []);

  return (
    <div>
    </div>
  );
};

export default EmailRestAPI;
