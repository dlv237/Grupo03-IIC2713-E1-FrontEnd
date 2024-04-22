import { Routes, Route } from "react-router-dom";
import Landingpage from "../landingpage";
import Login from "../userpages/login";
import Register from "../userpages/register";
import Flight from "../flights/show";
import Flights from "../flights/index";
import Search from "../flights/search";
import UserFlights from "../flights/userflights";


const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/flights/:id" element={<Flight />} />
      <Route path="/search" element={<Search />} />
      <Route path="/my_flights" element={<UserFlights />} />
    </Routes>
  );
};

export default PageRoutes;
