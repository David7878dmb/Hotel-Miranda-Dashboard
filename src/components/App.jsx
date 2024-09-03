import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Booking } from './pages/booking'
import '../style/App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/booking' element={<Booking/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
