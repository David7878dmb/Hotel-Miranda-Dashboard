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
import { AuthProvider, useAuth } from './login/authContext';
import '../style/App.css';

function App() {
  const { isAuthenticated } = useAuth(); // Accedemos al estado de autenticación


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
        <Route path='/booking' element={isAuthenticated ? <Booking /> : <Login />} />
        <Route path='/rooms' element={isAuthenticated ? <Rooms /> : <Login />} />
        <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Login />} />
        <Route path='/guest' element={isAuthenticated ? <Guest /> : <Login />} />
        <Route path='/concierge' element={isAuthenticated ? <Concierge /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function AppWithAuthProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}