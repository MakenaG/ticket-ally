import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; 
import Events from "./components/Events";
import Event from "./components/Event"; 
import Reservation from "./components/Reservation";
import Admin from "./components/Admin"; 
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> // Render the Home component for the root path
        <Route path="/events" element={<Events />} /> // Render the Events component for the /events path
        <Route path="/events/:id" element={<Event />} /> // Render the Event component for the /events/:id path, where :id is a dynamic parameter
        <Route path="/reservation" element={<Reservation />} /> // Render the Reservation component for the /reservation path
        <Route path="/admin" element={<Admin />} /> // Render the Admin component for the /admin path
      </Routes>
      <Footer /> {/* Include the Footer component */}
    </Router>
  );
}

export default App;