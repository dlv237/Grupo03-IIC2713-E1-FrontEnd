import { Routes, Route } from "react-router-dom";
import Landingpage from "../landingpage";
import Login from "../userpages/login";
import Register from "../userpages/register";
import Flights from "../flights/index";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/flights" element={<Flights/>} />
      <Route path="/flights/id" element={<Flights/>} />
    </Routes>
  );
};

export default PageRoutes;
