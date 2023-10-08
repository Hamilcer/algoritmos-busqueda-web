import { useEffect } from 'react';
import { hashModulo, hashCuadrado, hashTruncamiento, hashPlegamiento, calcularRango } from '../funcionesHash/HashModulo'
export default function ColisionLineal(props) {

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
                let i = 1;
                let maxIteration = 0;
                let libre = true;
                while (props.claves[index] != "") {
                    index = (index + i * i >= props.claves.length) ? 0 : index + i * i;
                    console.log("Nueva posicion: " + (index + 1));
                    i++;
                    maxIteration++;
                    if (maxIteration >= props.numClaves) {
                        libre = false;
                        break;
                    }
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
        } else {
            alert("Clave no insertada")
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

    return (
        <>
            <h1>{modo} - Colision: Cuadratica </h1>
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