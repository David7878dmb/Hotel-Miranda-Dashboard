import React, { createContext, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const UPDATE_USER = 'UPDATE_USER';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: localStorage.getItem('auth') === 'true',
    user: null,
    token: localStorage.getItem('token'),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (username, password, navigate) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Error de autenticación');
      }

      const data = await response.json();
      const { token } = data;

      // Guarda el token en localStorage
      localStorage.setItem('auth', 'true');
      localStorage.setItem('token', token);

      // Actualiza el estado con los datos del usuario
      dispatch({ type: LOGIN, payload: { user: { username }, token } });

      // Redirige a la página de inicio
      navigate('/');
    } catch (error) {
      alert('Error de autenticación');
    }
  };

  const logout = (navigate) => {
    // Elimina el token y los datos de autenticación
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
    navigate('/login');
  };

  const updateUser = (updatedData) => {
    dispatch({ type: UPDATE_USER, payload: updatedData });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
