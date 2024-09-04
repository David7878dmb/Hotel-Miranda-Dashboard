import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Booking } from './pages/booking'
import '../style/App.css'
import { Rooms } from './pages/rooms'
import { Dashboard } from './pages/dashboard'
import { Guest } from './pages/guest'
import { Concierge } from './pages/concierge'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/rooms' element={<Rooms/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/guest' element={<Guest/>}/>
        <Route path='/concierge' element={<Concierge/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
