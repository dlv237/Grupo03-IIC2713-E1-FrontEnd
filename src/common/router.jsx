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

const ProtectedComponent = ({ component: Component }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Component /> : null;
};

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/flights" element={<ProtectedComponent component={Flights} />} />
      <Route path="/flights/:id" element={<ProtectedComponent component={Flight} />} />
      <Route path="/search" element={<ProtectedComponent component={Search} />} />
      <Route path="/my_flights" element={<ProtectedComponent component={VistaCompras} />} />
    </Routes>
  );
};

export default PageRoutes;