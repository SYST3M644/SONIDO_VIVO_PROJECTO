import './App.css'
import { useEffect, useState } from 'react'
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
import MisPedidos from './paginas/MisPedidos'
import Mensajes from './paginas/Mensajes'
import Registro from './paginas/Registro'
import MiCuenta from './paginas/MiCuenta'
import Pie from './componentes/organismos/Pie'
import { listarProductos } from './servicios/Productos'
import type { Producto, ProductoCarrito } from './servicios/Productos'
import type { Usuario } from './servicios/Autenticacion'
import { renovarToken } from './servicios/Autenticacion'
import { leerSesion, guardarSesion, borrarSesion, vencimientoToken } from './servicios/Sesion'


function App() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([])
  const [usuario, setUsuario] = useState<Usuario | null>(leerSesion)
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [errorCatalogo, setErrorCatalogo] = useState("")

  useEffect(() => {
    listarProductos()
      .then((datos) => {
        setProductos(datos)
        setErrorCatalogo("")
      })
      .catch(() => {
        setProductos([])
        setErrorCatalogo("No se pudo cargar el catálogo. Revisa que el backend esté encendido.")
      })
      .finally(() => setCargando(false))
  }, [])

  const guardarUsuario = (nuevoUsuario: Usuario) => {
    setUsuario(nuevoUsuario)
    guardarSesion(nuevoUsuario)
  }

  const cerrarSesion = () => {
    setUsuario(null)
    borrarSesion()
  }

  // 5 minutos antes de que venza el token se pide uno nuevo.
  useEffect(() => {
    if (usuario === null) {
      return
    }

    const vence = vencimientoToken(usuario.token)

    // Un token sin fecha de vencimiento no es un JWT real (por ejemplo en los tests)
    if (vence === 0) {
      return
    }

    const cincoMinutos = 5 * 60 * 1000
    const faltan = vence - Date.now() - cincoMinutos

    const renovar = setTimeout(() => {
      renovarToken(usuario.token)
        .then((renovado) => {
          setUsuario(renovado)
          guardarSesion(renovado)
        })
        .catch(() => {
          console.error("No se pudo renovar el token")
        })
    }, Math.max(faltan, 0))

    // Si no se pudo renovar, la sesión se cierra cuando el token vence
    const cerrar = setTimeout(() => {
      setUsuario(null)
      borrarSesion()
    }, Math.max(vence - Date.now(), 0))

    return () => {
      clearTimeout(renovar)
      clearTimeout(cerrar)
    }
  }, [usuario])

  const agregarProducto = (id: number) => {
    const producto = productos.find(producto => producto.id === id)

    if (producto === undefined) {
      return
    }

    if (producto.stock === 0) {
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

  const stockDe = (id: number) => {
    const producto = productos.find(producto => producto.id === id)

    if (producto === undefined) {
      return 0
    }

    return producto.stock
  }

  const sumarCantidad = (id: number) => {
    const disponible = stockDe(id)

    const nuevoCarrito = carrito.map(item => {
      if (item.id === id && item.cantidad < disponible) {
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

  const vaciarCarrito = () => {
    setCarrito([])
  }

  let cantidadCarrito = 0

  for (const item of carrito) {
    cantidadCarrito += item.cantidad
  }

  let puedeComprar = true

  if (usuario !== null && usuario.rol === "vendedor") {
    puedeComprar = false
  }

  let hayUsuario = false

  if (usuario !== null) {
    hayUsuario = true
  }

  let nombreCliente = ""
  let correoCliente = ""

  if (usuario !== null) {
    nombreCliente = usuario.nombre
    correoCliente = usuario.correo
  }

  let esCliente = false

  if (usuario !== null && usuario.rol === "cliente") {
    esCliente = true
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
            element={<Productos productos={productos} cargando={cargando} error={errorCatalogo} agregarProducto={agregarProducto} />}
          />

          <Route
            path='/productos/:id'
            element={<DetalleProducto agregarProducto={agregarProducto} />}
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
                  vaciarCarrito={vaciarCarrito}
                  nombreCliente={nombreCliente}
                  correoCliente={correoCliente}
                  stockDe={stockDe}
                  hayUsuario={hayUsuario}
                  token={usuario?.token ?? ""}
                />
              )
            }
          />

          <Route
            path='/mis-pedidos'
            element={
              esCliente ? (
                <MisPedidos nombreCliente={nombreCliente} token={usuario?.token ?? ""} />
              ) : (
                <p className='mt-5'>
                  Debes iniciar sesión como cliente para ver tus pedidos.
                </p>
              )
            }
          />

          <Route
            path='/vendedor'
            element={
              atiendeLaTienda ? (
                <Vendedor token={usuario?.token ?? ""} />
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
                <Stock token={usuario?.token ?? ""} />
              ) : (
                <p className='mt-5'>
                  Debes iniciar sesión como vendedor para ver el stock.
                </p>
              )
            }
          />

          <Route
            path='/mensajes'
            element={
              esAdministrador && usuario !== null ? (
                <Mensajes token={usuario.token} />
              ) : (
                <p className='mt-5'>
                  Debes iniciar sesión como administrador para ver los mensajes.
                </p>
              )
            }
          />

          <Route
            path='/reportes'
            element={
              esAdministrador ? (
                <Reportes token={usuario?.token ?? ""} />
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
                <Admin token={usuario?.token ?? ""} />
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

          <Route
            path='/registro'
            element={<Registro guardarUsuario={guardarUsuario} />}
          />

          <Route
            path='/mi-cuenta'
            element={
              usuario !== null ? (
                <MiCuenta usuario={usuario} cerrarSesion={cerrarSesion} />
              ) : (
                <p className='mt-5'>
                  Debes iniciar sesión para ver tu cuenta.
                </p>
              )
            }
          />

        </Routes>

        </div>

        <Pie />

      </>
  )
}

export default App