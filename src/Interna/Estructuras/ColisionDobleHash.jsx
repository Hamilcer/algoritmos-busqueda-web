import { useEffect } from 'react';
import { hashModulo, hashCuadrado, hashTruncamiento, hashPlegamiento, calcularRango } from '../funcionesHash/HashModulo'
import toast, { Toaster } from 'react-hot-toast';


export default function ColisionDobleHash(props) {

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
                nuevo.push("")
            }
            const final = nuevo;
            props.setClaves(final)
        }
    }, [false])

    function agregarClave() {
        let clave = document.getElementById("inputClave").value
        if (validarClave(clave)) {
            let index = funcionHash(clave, rango, props.numClaves)
            if (props.claves[index] == "") {
                insertar(clave, index)
            } else {
                alert("Colision!!!\nEn la posciion: " + (index + 1))
                let intento = 1;
                let maxIteration = 0;
                let libre = true;

                while (props.claves[index] != "") {
                    index = ((index + 1) % rango)+1
                    index = (index >= props.numClaves) ? index%props.numClaves : index;

                    if (maxIteration >= props.numClaves) {
                        libre = false;
                        break;
                    }

                    intento++;
                    maxIteration++;
                }

                if (!libre) {
                    alert("No se pudo insertar")
                } else {
                    insertar(clave, index)
                }
            }
        }
    }

    function insertar(clave, index) {
        let nuevo = props.claves
        nuevo[index] = parseInt(clave);
        const actualizado = nuevo
        props.setClaves(actualizado)
        props.setNumInsertadas(props.numInsertadas + 1)
        addOrdenInsercion(clave)
        notificar(`Clave insertada en la posicion ${index + 1}`)
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
        console.log(index)
        let nuevo = props.claves
        if (index != -1 && nuevo[index] != "") {
            nuevo[index] = "";
            const actualizado = nuevo
            props.setClaves(actualizado)
            props.setNumInsertadas(props.numInsertadas - 1)
            deleteOrdenInsercion(clave)
        } else {
            alert("Clave no insertada")
        }
    }

    function buscarClave() {
        let clave = parseInt(document.getElementById("inputClave").value)
        let index = props.claves.indexOf(clave)
        if (index != -1) {
            notificar(`Clave encontrada en la posicion ${index + 1}`)
        } else {
            notificar("Clave no encontrada")
        }
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
            <h1>{modo} - Colision: Doble hash</h1>
            <div>
                <h3>Clave:</h3>
                <input type="number" name="" id="inputClave" /> <br />
                <button onClick={agregarClave}>Insertar</button>
                <button onClick={eliminarClave}>Eliminar</button>
                <button onClick={buscarClave}>Buscar</button>
            </div>
            <ol>
                {props.claves.map((num, index) => <li key={index}>{num}</li>)}
            </ol>
            <Toaster />
        </>
    )

}