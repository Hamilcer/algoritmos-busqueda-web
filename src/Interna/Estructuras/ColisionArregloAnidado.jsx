import { useEffect } from 'react';
import { hashModulo, hashCuadrado, hashTruncamiento, hashPlegamiento, calcularRango } from '../funcionesHash/HashModulo'
import toast, { Toaster } from 'react-hot-toast';


export default function ColisionArregloAnidado(props) {

    let rango;
    let funcionHash;
    let modo;

    if (props.tipoBusqueda == 3) {//modulo
        rango = calcularRango(props.numClaves)
        funcionHash = hashModulo;
        modo = "Hash modulo"
    } else if (props.tipoBusqueda == 4) {//cuadrado
        rango = props.numClaves
        funcionHash = hashCuadrado;
        modo = "Hash cuadrado"
    } else if (props.tipoBusqueda == 5) {// truncamiento
        rango = props.numClaves
        funcionHash = hashTruncamiento;
        modo = "Hash truncamiento"
    } else if (props.tipoBusqueda == 6) {//plegamiento
        rango = props.numClaves
        funcionHash = hashPlegamiento;
        modo = "Hash plegamiento"
    }


    useEffect(() => {//llenar el arreglo para poder insertar
        if (props.claves.length < props.numClaves) {
            let nuevo = props.claves;
            for (let i = 0; i < props.numClaves; i++) {
                nuevo.push([])
                for (let j = 0; j < props.numClaves; j++) {
                    nuevo[i].push([])
                    nuevo[i][j] = "-"
                }
            }
            const final = nuevo;
            props.setClaves(final)
        }
    }, [false])

    function agregarClave() {
        let clave = document.getElementById("inputClave").value
        if (validarClave(clave)) {
            let index = funcionHash(clave, rango, props.numClaves)
            if (props.claves[index][0] == "-") {
                insertar(clave, index)
            } else {
                alert("Colision!!!\nEn la posciion: " + (index + 1))
                insertar(clave, index)
            }
        }
    }

    function insertar(clave, index) {
        let nuevo = props.claves
        for (let i = 0; i < props.numClaves; i++) {
            if (nuevo[index][i] == "-") {
                nuevo[index][i] = parseInt(clave)
                break;
            }
        }
        const actualizado = nuevo
        props.setClaves(actualizado)
        props.setNumInsertadas(props.numInsertadas + 1)
        addOrdenInsercion(clave)
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
        let nuevo = props.claves

        for (let i = 0; i < props.numClaves; i++) {
            for (let j = 0; j < props.numClaves; j++) {
                if (nuevo[i][j] == clave) {
                    for (let k = j; k < nuevo[i].length - 1; k++) {
                        nuevo[i][k] = nuevo[i][k + 1];
                    }
                    // Coloca "-" en la última posición del arreglo.
                    nuevo[i][nuevo.length - 1] = "-";
                    const actualizado = nuevo
                    props.setClaves(actualizado)
                    props.setNumInsertadas(props.numInsertadas - 1)
                    deleteOrdenInsercion(clave)
                    return;
                }
            }
        }
        alert("Clave no insertada")
    }

    function buscarClave() {
        let clave = parseInt(document.getElementById("inputClave").value)
        let nuevo = props.claves

        for (let i = 0; i < props.numClaves; i++) {
            for (let j = 0; j < props.numClaves; j++) {
                if (nuevo[i][j] == clave) {
                    notificar(`Clave en la posición: ${i + 1} ${(j > 0) ? ' en area de colisón' : ''}`)
                    return;
                }
            }
        }
        notificar("Clave no encontrada")
    }

    function validarClave(clave) {
        if (clave.length > props.numCifras) {
            alert("Introduzca una clave con " + props.numCifras + " cifras")
            return false;
        } else if (+clave < 1) {
            alert("Ingrese un numero entero positivo")
            return false;
        } else if (props.ordenInsercion.indexOf(+clave) != -1) {
            alert("Numero ya ingresado")
            return false;
        } else if (props.numInsertadas >= props.numClaves) {
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
            <h1>{modo} - Colision: Arreglos anidados</h1>
            <div>
                <h3>Clave:</h3>
                <input type="number" name="" id="inputClave" /> <br />
                <button onClick={agregarClave}>Insertar</button>
                <button onClick={eliminarClave}>Eliminar</button>
                <button onClick={buscarClave}>Buscar</button>
            </div>
            <ol>
                {props.claves.map((element, index) =>
                    <li key={index}>
                        {element.map((num, index) =>
                            <b className='cuadro-arreglo-anidado' key={index} > {num} </b>
                        )}
                    </li>
                )}
            </ol>
            <Toaster />
        </>
    )

}