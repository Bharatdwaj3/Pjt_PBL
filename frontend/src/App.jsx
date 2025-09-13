import './App.css'
import {Home, About, Product} from './pages/index'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import  Navigation from './components/Navigation'
function App() {

  return (
    <> 
      <Router>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/> }/>  
          <Route path='/about' element={<About/> }/>  
          <Route path='/product' element={<Product/> }/>  
          <Route/>  
        </Routes>
      </Router> 
    </>
  )
}

export default App
