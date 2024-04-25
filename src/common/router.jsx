import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Landingpage from "../landingpage";
import Login from "../userpages/login";
import Register from "../userpages/register";
import Flight from "../flights/show";
import Flights from "../flights/index";
import Search from "../flights/search";
import UserFlights from "../flights/userflights";
import VistaCompras from "../flights/userBuys";
import Forbidden from "../flights/forbidden";

const PageRoutes = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/flights" element={isAuthenticated ? <Flights /> : <Navigate to="/forbidden" />} />
      <Route path="/flights/:id" element={isAuthenticated ? <Flight /> : <Navigate to="/forbidden" />} />
      <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/forbidden" />} />
      <Route path="/xd" element={isAuthenticated ? <UserFlights /> : <Navigate to="/forbidden" />} />
      <Route path="/my_flights" element={isAuthenticated ? <VistaCompras /> : <Navigate to="/forbidden" />} />
    </Routes>
  );
};

export default PageRoutes;