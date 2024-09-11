import React, { createContext, useReducer, useContext } from 'react';
import bcrypt from 'bcryptjs';

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
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
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
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (username, password, navigate) => {
    const testingUser = {
      username: 'admin',
      passwordHash: bcrypt.hashSync('1234', 10),
    };

    if (
      username === testingUser.username &&
      bcrypt.compareSync(password, testingUser.passwordHash)
    ) {
      localStorage.setItem('auth', 'true');
      dispatch({ type: LOGIN, payload: { username } });
      navigate('/');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('auth');
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