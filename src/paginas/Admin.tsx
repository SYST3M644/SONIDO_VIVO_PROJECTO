import { useState } from "react";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import {
    listarUsuarios,
    crearUsuario,
    editarUsuario,
    cambiarEstado,
    correoRepetido,
    roles
} from "../servicios/Usuarios";
import type { Usuario } from "../servicios/Usuarios";

type AdminProps = {
    mostrarNotificacion: (texto: string, tipo: string) => void;
};

function Admin({ mostrarNotificacion }: AdminProps) {
    const [usuarios, setUsuarios] = useState<Usuario[]>(listarUsuarios());
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("cliente");
    const [editando, setEditando] = useState(0);

    const refrescar = () => {
        setUsuarios([...listarUsuarios()]);
    };

    const limpiar = () => {
        setNombre("");
        setCorreo("");
        setRol("cliente");
        setEditando(0);
    };

    const guardar = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            mostrarNotificacion("Debe ingresar el nombre", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            mostrarNotificacion("Ingrese un correo válido", "error");
            return;
        }

        if (correoRepetido(correo, editando)) {
            mostrarNotificacion("Ese correo ya está registrado", "error");
            return;
        }

        if (editando === 0) {
            crearUsuario(nombre, correo, rol);
        } else {
            editarUsuario(editando, nombre, correo, rol);
        }

        limpiar();
        refrescar();
    };

    const empezarEdicion = (usuario: Usuario) => {
        setEditando(usuario.id);
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
        setRol(usuario.rol);
    };

    const desactivar = (id: number) => {
        cambiarEstado(id);
        refrescar();
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
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => desactivar(usuario.id)}
                                    >
                                        {usuario.activo ? "Desactivar" : "Activar"}
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
