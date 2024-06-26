import "./settings.css";
import axios from "axios";
import { useState } from "react";
import Button from "../common/button.jsx";
import { useAuth0 } from "@auth0/auth0-react";

function Settings() {
  const [discount, setDiscount] = useState(1);
  const { user } = useAuth0();

  const changeDiscount = (event) => {
    setDiscount(event.target.value);
  };

  const saveDiscount = async () => {
    console.log("Guardando descuento", discount, user.email);
    try {
      await axios.post(
        "https://flightsbooking.me/changediscount",
        {
          new_discount: discount,
          email: user.email
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Configuraciones</h1>
        <div className="settings-form">
          <h2 className="settings-category">Cambiar descuento</h2>
          <input
            type="number"
            placeholder="Descuento"
            value={discount}
            onChange={changeDiscount}
            min="0"
            max="1"
            step="0.01"
          />
          <button onClick={saveDiscount}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
