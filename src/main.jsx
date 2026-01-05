import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Переконайся, що шлях веде до App.jsx у цій же папці
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)