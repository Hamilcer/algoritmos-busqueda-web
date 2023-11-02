import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Binaria(props) {

    const [clavesVisitadas, setClavesVisitadas] = useState('')

    function agregarClave() {
        let clave = document.getElementById("inputClave").value
        if (validarClave(clave)) {
            props.setClaves(props.claves.push(parseInt(clave)));
            const arregloOrdenado = [...props.claves].sort((a, b) => a - b);

            props.setClaves(arregloOrdenado);
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
        if (index != -1) {
            props.setClaves(prevNumbers => prevNumbers.filter((_, i) => i !== index));
            deleteOrdenInsercion(clave)
        } else {
            alert("Clave no insertada!!")
        }
    }

    function buscarClave() {
        let clave = parseInt(document.getElementById("inputClave").value)

        let left = 0;
        let right = props.claves.length - 1;
        const registro = [];
      
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          registro.push({ posicion: (mid+1), clave: props.claves[mid] });
      
          if (props.claves[mid] === clave) {
            setClavesVisitadas(registro)
            notificar(`La clave se encuentra en la posicion: ${(mid + 1)}`);
            return;
          } else if (props.claves[mid] < clave) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
      
    setClavesVisitadas(registro)
        notificar('No se encontró la clave')
        return;




    }

    function validarClave(clave) {
        if (clave.length > props.numCifras) {
            alert("Introduzca una clave con " + props.numCifras + " cifras")
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

    function notificar(msg) {
        toast(msg)
    }

    return (
        <>
            <h1>Busqueda binaria</h1>
            <div>
                <h3>Clave:</h3>
                <input type="number" name="" id="inputClave" /> <br />
                <button onClick={agregarClave}>Insertar</button>
                <button onClick={eliminarClave}>Eliminar</button>
                <button onClick={buscarClave}>Buscar</button>
            </div>
            {clavesVisitadas &&
                <>
                <h4>Pasos realizados: </h4>
                    <div style={{ border: '1px solid #ccc', width: '300px', height: '200px', overflowY: 'scroll' }}>
                        <ol>
                            {clavesVisitadas.map((par,index) => <li key={index}>
                                {`Posición: ${par.posicion}, Clave: ${par.clave}`}
                            </li>
                            )}
                        </ol>
                    </div>
                </>
            }

            <ol>
                {props.claves.map((num, index) => <li key={index}>{num}</li>)}
            </ol>
            <Toaster />
        </>
    )
}