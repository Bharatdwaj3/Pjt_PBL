import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ManagePGListings from "./pages/Managepglisting";
import OwnerDashboard from "./pages/Ownerdashboard";
import LocationBasedSearch from "./pages/LocationBasedSearch";
import PGDetails from "./pages/PGDetails"; // New page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<OwnerDashboard />} />
        <Route path="/manage-pgs" element={<ManagePGListings />} />
        <Route path="/search-location" element={<LocationBasedSearch />} />
        <Route path="/pg/:id" element={<PGDetails />} /> {/* PG detail page */}
      </Routes>
    </Router>
  );
}

export default App;
