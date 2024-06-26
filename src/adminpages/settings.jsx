import "./settings.css";
import axios from "axios";
import { useState } from "react";
import Button from "../common/button.jsx";
import { User } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

function Settings() {
  const [discount, setDiscount] = useState(0);
  const { user } = useAuth0();

  const changeDiscount = (event) => {
    setDiscount(event.target.value);
  };

  const saveDiscount = async () => {
    console.log("Guardando descuento", discount, user.email)
    try {
      await axios.post(
        "https://flightsbooking.me/changediscount",
        {
          email: user.email,
          discount: discount,
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

  if (user.email == "admin@example.com") {
    saveDiscount();
  }
  

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
        <div className="settings-container-addadmin">
          <h2 className="settings-category">Subastas</h2>
            <Button>Revisar subastas</Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
