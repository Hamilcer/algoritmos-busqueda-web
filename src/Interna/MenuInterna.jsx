import { useState } from "react";
import Secuencial from "./Estructuras/Secuencial";
import Binaria from "./Estructuras/Binaria";
import ColisionLineal from "./Estructuras/ColisionLineal";
import ColisionCuadratica from './Estructuras/ColisionCuadratica'
import ColisionDobleHash from "./Estructuras/ColisionDobleHash";
import ColisionArregloAnidado from "./Estructuras/ColisionArregloAnidado";
import ColisionListaEnlazada from "./Estructuras/ColisionListaEnlazada";

export default function MenuInterna({ tipoBusqueda, colision, numClaves, numCifras }) {

    const [mensaje, setMensaje] = useState("");
    const [claves, setClaves] = useState([]);
    const [numInsertadas, setNumInsertadas] = useState(0)
    const [ordenInsercion, setOrdenInsercion] = useState([])

    let estructuraHash;

    if (tipoBusqueda == 1) {
        estructuraHash = <Secuencial claves={claves} setClaves={setClaves} numCifras={numCifras} numClaves={numClaves} ordenInsercion={ordenInsercion} setOrdenInsercion={setOrdenInsercion} />
    } else if (tipoBusqueda == 2) {
        estructuraHash = <Binaria claves={claves} setClaves={setClaves} numCifras={numCifras} numClaves={numClaves} ordenInsercion={ordenInsercion} setOrdenInsercion={setOrdenInsercion} />
    } else if (colision == 1) {
        estructuraHash = <ColisionLineal claves={claves} setClaves={setClaves} numCifras={numCifras} numClaves={numClaves} tipoBusqueda={tipoBusqueda} numInsertadas={numInsertadas} setNumInsertadas={setNumInsertadas} ordenInsercion={ordenInsercion} setOrdenInsercion={setOrdenInsercion} />
    } else if (colision == 2) {
        estructuraHash = <ColisionCuadratica claves={claves} setClaves={setClaves} numCifras={numCifras} numClaves={numClaves} tipoBusqueda={tipoBusqueda} numInsertadas={numInsertadas} setNumInsertadas={setNumInsertadas} ordenInsercion={ordenInsercion} setOrdenInsercion={setOrdenInsercion} />
    } else if (colision == 3) {
        estructuraHash = <ColisionDobleHash claves={claves} setClaves={setClaves} numCifras={numCifras} numClaves={numClaves} tipoBusqueda={tipoBusqueda} numInsertadas={numInsertadas} setNumInsertadas={setNumInsertadas} ordenInsercion={ordenInsercion} setOrdenInsercion={setOrdenInsercion} />
    } else if (colision == 4){
        estructuraHash = <ColisionArregloAnidado claves={claves} setClaves={setClaves} numCifras={numCifras} numClaves={numClaves} tipoBusqueda={tipoBusqueda} numInsertadas={numInsertadas} setNumInsertadas={setNumInsertadas} ordenInsercion={ordenInsercion} setOrdenInsercion={setOrdenInsercion} />
    } else if (colision == 5){
        estructuraHash = <ColisionListaEnlazada claves={claves} setClaves={setClaves} numCifras={numCifras} numClaves={numClaves} tipoBusqueda={tipoBusqueda} numInsertadas={numInsertadas} setNumInsertadas={setNumInsertadas} ordenInsercion={ordenInsercion} setOrdenInsercion={setOrdenInsercion} />
    }

    function print() {
        console.log(claves)
        console.log("numInsertadas: " + numInsertadas)
        console.log(ordenInsercion)
    }

    return (
        <>

            {estructuraHash}

            <button onClick={print}>Clg</button>

        </>
    )
}