# Sonido Vivo

Tienda de instrumentos musicales ubicada en Viña del Mar.

Proyecto del caso semestral de DSY1104 - Desarrollo FullStack II.

Este repositorio es el frontend. El backend esta en:
https://github.com/SYST3M644/backend-sonido-vivo

## Tecnologias

- React 19 con TypeScript
- Vite
- React Router DOM
- Bootstrap 5
- Vitest

## Funcionalidades

- Catalogo de productos con filtros, detalle y stock al dia
- Carrito de compras con pago simulado con tarjeta
- Compra con sesion o como invitado, con despacho o retiro en tienda
- Mis pedidos: detalle y seguimiento de cada pedido
- Registro de clientes, login con JWT y pagina Mi cuenta
- Sesion guardada en localStorage, se mantiene al recargar y se renueva antes de vencer
- Panel del vendedor: pedidos y stock
- Panel del administrador: usuarios, mensajes de contacto y reportes de ventas
- Mapa con la ubicacion de la tienda
- Diseño responsive para celular, tablet y computador

## Roles

| Rol | Puede |
|---|---|
| Cliente | Comprar, ver sus pedidos y su cuenta |
| Vendedor | Ver y cambiar el estado de los pedidos, actualizar el stock |
| Administrador | Todo lo anterior, mas usuarios, mensajes y reportes |

El menu muestra solo las paginas de cada rol, y el backend tambien revisa el rol en cada peticion.

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@sonidovivo.cl | admin123 |
| Vendedor | vendedor@sonidovivo.cl | vende123 |
| Cliente | cliente@sonidovivo.cl | cliente123 |

## Tarjetas de prueba (pago simulado)

- 4111 1111 1111 1111: pago aprobado
- 4000 0000 0000 0002: pago rechazado

No se cobra dinero real. Solo se guardan los 4 ultimos numeros de la tarjeta.

## Como ejecutar

1. Levantar el backend (ver el README del backend). El frontend se conecta al API Gateway en http://localhost:6464
2. Instalar y ejecutar el frontend:

```
npm install
npm run dev
```

La aplicacion queda en http://localhost:5173

## Otros comandos

```
npm run build
npm run lint
npm test
```

## Estructura

```
src/componentes/atomos
src/componentes/moleculas
src/componentes/organismos
src/paginas
src/servicios
src/test
public/img
```

## Pendiente

- Docker y AWS
