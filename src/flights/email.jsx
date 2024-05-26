import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

export const sendEmail = async (userEmail) => {
  const serviceId = 'service_n7axnzr';
  const templateId = 'template_ub1jyen';
  const publicKey = 'UveU5M9FMZjRUpumI';

  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      to_email: userEmail,
      message: 'Transacción realizada exitosamente. Muchas gracias!',
    }
  };

  try {
    const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
    console.log('Email sent successfully:', res.data);
    window.location.href = "/flights/resultado";
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

const EmailRestAPI = () => {
  const { user } = useAuth0();

  useEffect(() => {
    sendEmail(user.email);
  }, []);

  return <div></div>;
};

export default EmailRestAPI;
