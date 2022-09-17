import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//React.StrictMode esse cara aqui da um console duas vezes
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
