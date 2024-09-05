import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import bcrypt from 'bcryptjs'; 
import { Home } from './pages/home';
import { Booking } from './pages/booking';
import { Rooms } from './pages/rooms';
import { Dashboard } from './pages/dashboard';
import { Guest } from './pages/guest';
import { Concierge } from './pages/concierge';
import Login from './login/login';
import '../style/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });

  const handleLogin = (username, password, navigate) => {
    const testingUser = { 
      username: 'admin', 
      passwordHash: bcrypt.hashSync('1234', 10)
    };

    if (username === testingUser.username && bcrypt.compareSync(password, testingUser.passwordHash)) {
      setIsAuthenticated(true);
      localStorage.setItem('auth', 'true');
      navigate('/');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/' element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
        <Route path='/booking' element={isAuthenticated ? <Booking /> : <Login onLogin={handleLogin} />} />
        <Route path='/rooms' element={isAuthenticated ? <Rooms /> : <Login onLogin={handleLogin} />} />
        <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />} />
        <Route path='/guest' element={isAuthenticated ? <Guest /> : <Login onLogin={handleLogin} />} />
        <Route path='/concierge' element={isAuthenticated ? <Concierge /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;