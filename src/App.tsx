import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Producto'
import Contacto from './paginas/Contacto'
import Nosotros from './paginas/Nosotros'
import DetalleProducto from './paginas/DetalleProducto'
import Login from './paginas/Login'


function App() {

  return (
      <div className='container text-center mt-5'>

        <Navbar />

        <Routes>
          <Route 
            path='/' 
            element={<Inicio />}
          />

          <Route 
            path='/productos' 
            element={<Productos />}
          />

          <Route 
            path='/productos/:id' 
            element={<DetalleProducto />}
          />

          <Route 
            path='/contacto' 
            element={<Contacto />}
          />

          <Route 
            path='/nosotros' 
            element={<Nosotros />}
          />

          <Route 
            path='/login' 
            element={<Login />}
          />

        </Routes>

      </div>
  )
}

export default App
