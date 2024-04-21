import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./common/navbar";
import PageRoutes from "./common/router";
import { Auth0Provider } from "@auth0/auth0-react";

const authorizationParams = {
  redirect_uri: window.location.origin + "/flights", // Auth0 redirige a "flights"
  // audience:,  // aqui deberia ir un API_IDENTIFIER, me imagino que
  // cuando conectemos con el backend se dara
  scope: "openid profile email",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      // Esto necesita con urgencia pasar a un .env
      // domain = {process.env.REACT_APP_AUTH0_DOMAIN"
      // clientId = {process.env.REACT_APP_AUTH0_CLIENT_ID}
      // (por alguna razon eso no funciona)
      domain="dev-6znmz2b0w2tu4n0r.us.auth0.com"
      clientId="Awl8nOgpDj5sL1tNcQrTuCXSuPkTPVc8"
      authorizationParams={authorizationParams}
    >
      <BrowserRouter>
        <Navbar />
        <PageRoutes />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
);
