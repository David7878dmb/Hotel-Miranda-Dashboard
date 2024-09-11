import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWithAuthProvider from './App.jsx'
import { Provider } from 'react-redux'
import { store } from '../app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppWithAuthProvider />
    </Provider>
  </StrictMode>,
)
