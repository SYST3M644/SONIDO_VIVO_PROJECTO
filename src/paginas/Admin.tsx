import { useEffect, useState } from "react";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import {
    listarUsuarios,
    crearUsuario,
    editarUsuario,
    cambiarEstado,
    eliminarUsuario,
    roles
} from "../servicios/Usuarios";
import type { Usuario } from "../servicios/Usuarios";

type AdminProps = {
    token: string;
};

function Admin({ token }: AdminProps) {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [rol, setRol] = useState("cliente");
    const [editando, setEditando] = useState(0);
    const [porEliminar, setPorEliminar] = useState(0);
    const [mensaje, setMensaje] = useState("");

    const refrescar = () => {
        listarUsuarios(token)
            .then((datos) => setUsuarios(datos))
            .catch(() => setMensaje("No se pudo cargar la lista de usuarios"));
    };

    useEffect(() => {
        listarUsuarios(token)
            .then((datos) => setUsuarios(datos))
            .catch(() => setMensaje("No se pudo cargar la lista de usuarios"));
    }, [token]);

    const limpiar = () => {
        setNombre("");
        setCorreo("");
        setClave("");
        setRol("cliente");
        setEditando(0);
    };

    const guardar = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMensaje("");

        if (nombre.trim() === "") {
            setMensaje("Debe ingresar el nombre");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            setMensaje("Ingrese un correo válido");
            return;
        }

        if (editando === 0 && clave.length < 8) {
            setMensaje("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        try {
            if (editando === 0) {
                await crearUsuario(nombre, correo, clave, rol, token);
            } else {
                await editarUsuario(editando, nombre, correo, rol, token);
            }

            limpiar();
            refrescar();
        } catch (error) {
            if (error instanceof Error && error.message === "Ese correo ya esta registrado") {
                setMensaje("Ese correo ya está registrado");
            } else {
                setMensaje("No se pudo guardar el usuario");
            }
        }
    };

    const empezarEdicion = (usuario: Usuario) => {
        setEditando(usuario.id);
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
        setClave("");
        setRol(usuario.rol);
    };

    const activarODesactivar = async (id: number) => {
        try {
            await cambiarEstado(id, token);
            refrescar();
        } catch {
            setMensaje("No se pudo cambiar el estado del usuario");
        }
    };

    // Primer clic: pide confirmar. Segundo clic: elimina.
    const eliminar = async (id: number) => {
        if (porEliminar !== id) {
            setPorEliminar(id);
            return;
        }

        try {
            await eliminarUsuario(id, token);
            setPorEliminar(0);
            refrescar();
        } catch {
            setMensaje("No se pudo eliminar el usuario");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="titulo-seccion">Administración de Usuarios</h1>

            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-3">
                            {editando === 0 ? "Nuevo Usuario" : "Editar Usuario"}
                        </h2>

                        <form onSubmit={guardar} noValidate>
                            <CampoFormulario
                                etiqueta="Nombre Completo"
                                tipo="text"
                                nombre="nombre"
                                valor={nombre}
                                alCambiar={setNombre}
                            />

                            <CampoFormulario
                                etiqueta="Correo Electrónico"
                                tipo="email"
                                nombre="correo"
                                valor={correo}
                                alCambiar={setCorreo}
                            />

                            {editando === 0 && (
                                <CampoFormulario
                                    etiqueta="Contraseña"
                                    tipo="password"
                                    nombre="contraseña"
                                    valor={clave}
                                    alCambiar={setClave}
                                />
                            )}

                            <div className="mb-3">
                                <label className="form-label">Rol</label>

                                <select
                                    className="form-select"
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                >
                                    {roles.map((unRol) => (
                                        <option key={unRol} value={unRol}>
                                            {unRol}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {mensaje !== "" && (
                                <p className="mensaje-error">{mensaje}</p>
                            )}

                            <button type="submit" className="btn boton-tienda">
                                {editando === 0 ? "Crear Usuario" : "Guardar Cambios"}
                            </button>

                            {editando !== 0 && (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary ms-2"
                                    onClick={limpiar}
                                >
                                    Cancelar
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.rol}</td>
                                <td>
                                    {usuario.activo ? (
                                        <span className="badge text-bg-success">Activo</span>
                                    ) : (
                                        <span className="badge text-bg-secondary">Inactivo</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-sm boton-tienda me-2"
                                        onClick={() => empezarEdicion(usuario)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary me-2"
                                        onClick={() => activarODesactivar(usuario.id)}
                                    >
                                        {usuario.activo ? "Desactivar" : "Activar"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => eliminar(usuario.id)}
                                    >
                                        {porEliminar === usuario.id ? "¿Seguro? Eliminar" : "Eliminar"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin
