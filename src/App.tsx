import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Producto'
import Contacto from './paginas/Contacto'
import Nosotros from './paginas/Nosotros'
import DetalleProducto from './paginas/DetalleProducto'
import Login from './paginas/Login'
import Carrito from './paginas/Carrito'
import Pie from './componentes/organismos/Pie'
import RutaProtegida from './componentes/RutaProtegida'
import { productos } from './servicios/Productos'
import type { ProductoCarrito } from './servicios/Productos'


function App() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([])

  const agregarProducto = (id: number) => {
    const producto = productos.find(producto => producto.id === id)

    if (producto === undefined) {
      return
    }

    const yaEstaEnCarrito = carrito.find(item => item.id === id)

    if (yaEstaEnCarrito) {
      sumarCantidad(id)
      return
    }

    const nuevoProducto = {
      id: producto.id,
      titulo: producto.titulo,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    }

    setCarrito([...carrito, nuevoProducto])
  }

  const sumarCantidad = (id: number) => {
    const nuevoCarrito = carrito.map(item => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + 1 }
      }
      return item
    })
    setCarrito(nuevoCarrito)
  }

  const restarCantidad = (id: number) => {
    const nuevoCarrito = carrito.map(item => {
      if (item.id === id && item.cantidad > 1) {
        return { ...item, cantidad: item.cantidad - 1 }
      }
      return item
    })
    setCarrito(nuevoCarrito)
  }

  const quitarProducto = (id: number) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id)
    setCarrito(nuevoCarrito)
  }

  let cantidadCarrito = 0

  for (const item of carrito) {
    cantidadCarrito += item.cantidad
  }

  return (
      <>
        <Navbar cantidadCarrito={cantidadCarrito} />

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
                <Productos agregarProducto={agregarProducto} />
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
            path='/carrito'
            element={
              <RutaProtegida>
                <Carrito
                  carrito={carrito}
                  sumarCantidad={sumarCantidad}
                  restarCantidad={restarCantidad}
                  quitarProducto={quitarProducto}
                />
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
