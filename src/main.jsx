import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./common/navbar";
import PageRoutes from "./common/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <PageRoutes/>
    </BrowserRouter>
  </React.StrictMode>,
);
