//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './index.css'
import App from './App.tsx'
import { ProveedorSesion } from './contexto/SesionContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ProveedorSesion>
      <App />
    </ProveedorSesion>
  </BrowserRouter>,
)
