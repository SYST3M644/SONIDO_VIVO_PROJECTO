# Sonido Vivo

Tienda de instrumentos musicales, equipos de sonido y accesorios para músicos,
ubicada en Viña del Mar, Región de Valparaíso.

Proyecto del **Caso Semestral del curso DSY1104 – Desarrollo FullStack II (Forma B)**.

## El negocio

Sonido Vivo lleva 11 años de funcionamiento y es atendida por el dueño y dos
vendedores. El catálogo incluye guitarras, bajos, baterías, teclados,
amplificadores, micrófonos, pedales de efectos y accesorios. También se ofrece
reparación de instrumentos de cuerda.

La tienda vende principalmente de forma presencial, pero en los últimos tres años
comenzó a recibir pedidos por WhatsApp e Instagram de clientes de otras ciudades.
Eso genera una carga que el equipo no alcanza a manejar: 3 de cada 10 mensajes
quedan sin respuesta el mismo día, el stock se lleva en un Excel que queda
desactualizado por horas y no existe un registro centralizado de los pedidos.

## Tecnologías usadas

- React 19 con TypeScript
- Vite como herramienta de construcción
- React Router DOM para la navegación
- Bootstrap 5 para los estilos y el diseño responsive
- Vitest y Testing Library para las pruebas

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

Otros comandos:

```bash
npm run build     # compila para producción
npm run lint      # revisa el código con ESLint
npm test          # ejecuta las pruebas
```

## Estructura

```
src/
  componentes/
    atomos/        Boton, InputText, Regresar, Referencias
    moleculas/     CampoFormulario, CardProductos
    organismos/    Navbar, FormularioLogin, FormularioContacto
  paginas/         Inicio, Producto, DetalleProducto, Contacto, Nosotros, Login
  test/            pruebas con Vitest
public/img/        ilustraciones de los instrumentos del catálogo
```

## Estado del proyecto

Hasta ahora está construido el frontend de la aplicación. Según los requisitos
técnicos obligatorios del caso, falta desarrollar:

- Backend con microservicios Spring Boot y API REST en JSON
- Base de datos MySQL normalizada en tercera forma normal
- Autenticación segura con roles (Administrador, Vendedor y Cliente)
- Panel de administración para gestionar usuarios
- Carrito de compras y flujo de pedidos con seguimiento de estado
- Mapa interactivo con la ubicación de la tienda y los puntos de retiro
- Despliegue en AWS usando Docker
