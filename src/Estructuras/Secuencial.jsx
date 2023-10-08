export default function Secuencial(props) {

    function agregarClave() {
        let clave = document.getElementById("inputClave").value
        if (validarClave(clave)) {
            props.setClaves(prevNumbers => [...prevNumbers, parseInt(clave)]);
            addOrdenInsercion(clave)
        }

    }

    function addOrdenInsercion(clave) {
        const nuevo = props.ordenInsercion
        nuevo.push(parseInt(clave))
        props.setOrdenInsercion(nuevo)
    }

    function deleteOrdenInsercion(clave) {
        const nuevo = props.ordenInsercion
        nuevo.splice(nuevo.indexOf(parseInt(clave)), 1)
        props.setOrdenInsercion(nuevo)
    }

    function eliminarClave() {
        let clave = parseInt(document.getElementById("inputClave").value)
        let index = props.claves.indexOf(clave)
        props.setClaves(prevNumbers => prevNumbers.filter((_, i) => i !== index));
        deleteOrdenInsercion(clave);
    }

    function validarClave(clave) {
        if (clave.length > props.numCifras) {
            alert("Introduzca una clave con " + numCifras + "cifras")
            return false;
        } else if (+clave < 1) {
            alert("Ingrese un numero entero positivo")
            return false;
        } else if (props.claves.indexOf(+clave) != -1) {
            alert("Numero ya ingresado")
            return false;
        } else if (props.claves.length >= props.numClaves) {
            alert("Estructura llena")
            return false;
        }
        return true;
    }

    return (
        <>
            <h1>Busqueda secuencial</h1>
            <div>
                <h3>Clave:</h3>
                <input type="number" name="" id="inputClave" /> <br />
                <button onClick={agregarClave}>Insertar</button>
                <button onClick={eliminarClave}>Eliminar</button>
            </div>
            <ol>
                {props.claves.map((num, index) => <li key={index}>{num}</li>)}
            </ol>
        </>
    )
}