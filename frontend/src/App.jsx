<<<<<<< HEAD
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
=======
import './App.css'
import {Home, Product} from './pages/index'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { Navigation, InsertPG } from './components'
import InsertTenant from './components/InsertTenant'
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {

  return (
    <> 
      <Router>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/> }/>  
          <Route path='/product' element={<Product/> }/>  
          <Route path='/insertRooms' element={<InsertPG/> }/>  
          <Route path='/insertTenant' element={<InsertTenant/> }/>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route/>  
        </Routes>
      </Router> 
    </>
  )
}

export default App;
>>>>>>> ba8bd5e3922e82240ef14c79024b1a5216d289fb
