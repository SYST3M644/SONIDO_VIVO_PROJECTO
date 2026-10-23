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
import Admin from './paginas/Admin'
import Vendedor from './paginas/Vendedor'
import Stock from './paginas/Stock'
import Reportes from './paginas/Reportes'
import Pie from './componentes/organismos/Pie'
import { productos } from './servicios/Productos'
import type { ProductoCarrito } from './servicios/Productos'
import type { Usuario } from './servicios/Autenticacion'


function App() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([])
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const guardarUsuario = (nuevoUsuario: Usuario) => {
    setUsuario(nuevoUsuario)
  }

  const cerrarSesion = () => {
    setUsuario(null)
  }

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

  let puedeComprar = false

  if (usuario !== null && usuario.rol !== "vendedor") {
    puedeComprar = true
  }

  let esVendedor = false

  if (usuario !== null && usuario.rol === "vendedor") {
    esVendedor = true
  }

  let esAdministrador = false

  if (usuario !== null && usuario.rol === "administrador") {
    esAdministrador = true
  }

  let atiendeLaTienda = false

  if (esVendedor || esAdministrador) {
    atiendeLaTienda = true
  }

  return (
      <>
        <Navbar
          cantidadCarrito={cantidadCarrito}
          usuario={usuario}
          cerrarSesion={cerrarSesion}
        />

        <div className='text-center contenido'>

        <Routes>
          <Route
            path='/'
            element={<Inicio />}
          />

          <Route
            path='/productos'
            element={<Productos agregarProducto={agregarProducto} />}
          />

          <Route
            path='/productos/:id'
            element={<DetalleProducto />}
          />

          <Route
            path='/carrito'
            element={
              esVendedor ? (
                <p className='mt-5'>
                  Los vendedores no pueden usar el carrito.
                </p>
              ) : (
                <Carrito
                  carrito={carrito}
                  sumarCantidad={sumarCantidad}
                  restarCantidad={restarCantidad}
                  quitarProducto={quitarProducto}
                  puedeComprar={puedeComprar}
                 
                />
              )
            }
          />

          <Route
            path='/vendedor'
            element={
              atiendeLaTienda ? (
                <Vendedor />
              ) : (
                <p className='mt-5'>
                  Debes iniciar sesión como vendedor para ver los pedidos.
                </p>
              )
            }
          />

          <Route
            path='/vendedor/stock'
            element={
              atiendeLaTienda ? (
                <Stock />
              ) : (
                <p className='mt-5'>
                  Debes iniciar sesión como vendedor para ver el stock.
                </p>
              )
            }
          />

          <Route
            path='/reportes'
            element={
              esAdministrador ? (
                <Reportes />
              ) : (
                <p className='mt-5'>
                  Debes iniciar sesión como administrador para ver los reportes.
                </p>
              )
            }
          />

          <Route
            path='/admin'
            element={
              esAdministrador ? (
                <Admin />
              ) : (
                <p className='mt-5'>
                  Debes iniciar sesión como administrador para ver esta página.
                </p>
              )
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
            element={<Login guardarUsuario={guardarUsuario} />}
          />

        </Routes>

        </div>

        <Pie />

      </>
  )
}

export default App