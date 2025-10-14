import './App.css'
import {Home, About, Product} from './pages/index'
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
          <Route path='/about' element={<About/> }/>  
          <Route path='/product' element={<Product/> }/>  
          <Route path='/insertRooms' element={<InsertPG/> }/>  
          <Route path='/insertTenant' element={<InsertTenant/> }/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route/>  
        </Routes>
      </Router> 
    </>
  )
}

export default App;