import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useSesion } from "../contexto/SesionContext";

type Props = {
    children: ReactNode;
    roles?: string[];
}

function RutaProtegida({ children, roles }: Props) {
    const { usuario } = useSesion();

    if (usuario === null) {
        return <Navigate to="/login" replace />;
    }

    if (roles !== undefined && !roles.includes(usuario.rol)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default RutaProtegida
