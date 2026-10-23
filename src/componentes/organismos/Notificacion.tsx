type NotificacionProps = {
    texto: string;
    tipo: string;
    cerrar: () => void;
};

function Notificacion({ texto, tipo, cerrar }: NotificacionProps) {
    let estilo = "notificacion notificacion-exito";

    if (tipo === "error") {
        estilo = "notificacion notificacion-error";
    }

    return (
        <div className={estilo} role="alert">
            <span>{texto}</span>

            <button
                type="button"
                className="btn-close btn-close-white ms-3"
                aria-label="Cerrar notificacion"
                onClick={cerrar}
            ></button>
        </div>
    );
}

export default Notificacion
