import './App.css'
import {Home, Product} from './pages/index'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { Navigation, InsertPG } from './components'
import InsertTenant from './components/InsertTenant'
import { Login, Profile } from './components/User/index'
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
          <Route path='/profile' element={<Profile/>} />
          <Route path='/login' element={<Login/>} />
          <Route/>  
        </Routes>
      </Router> 
    </>
  )
}

export default App
