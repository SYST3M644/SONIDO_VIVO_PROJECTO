import InputTextS64 from "../atomos/InputText";

type Props = {
    etiqueta: string;
    tipo: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
}

function CampoFormulario({etiqueta, tipo, nombre, valor, alCambiar}: Props){
    return(
        <div className="mb-3">
            <label className="form-label">
                {etiqueta}
            </label>

            <InputTextS64 tipo={tipo} nombre={nombre} valor={valor} alCambiar={alCambiar}/>
        </div>

    );
}

export default CampoFormulario