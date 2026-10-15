type Props = {
    tipo: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
}

function InputTextS64({tipo, nombre, valor, alCambiar}: Props) {
    return (
        <input 
            type={tipo} 
            placeholder={nombre} 
            className="form-control"
            value={valor}
            onChange={(e) => alCambiar(e.target.value)}
        />
    );
}

export default InputTextS64