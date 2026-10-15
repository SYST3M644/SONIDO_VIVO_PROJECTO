import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Producto'
import Contacto from './paginas/Contacto'
import Nosotros from './paginas/Nosotros'
import DetalleProducto from './paginas/DetalleProducto'
import Login from './paginas/Login'
import Pie from './componentes/organismos/Pie'
import RutaProtegida from './componentes/RutaProtegida'


function App() {

  return (
      <>
        <Navbar />

        <div className='text-center contenido'>

        <Routes>
          <Route 
            path='/' 
            element={<Inicio />}
          />

          <Route 
            path='/productos' 
            element={
              <RutaProtegida>
                <Productos />
              </RutaProtegida>
            }
          />

          <Route 
            path='/productos/:id' 
            element={
              <RutaProtegida>
                <DetalleProducto />
              </RutaProtegida>
            }
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

        <Pie />
      </>
  )
}

export default App
