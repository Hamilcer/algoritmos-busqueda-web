import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import ExpansionTotal from "./Estructura/ExpansionExterna"

export default function Externa() {
    const cookies = new Cookies();

    const [tipoBusqueda, setTipoBusqueda] = useState(1)
    const [tipoExpansion, setTipoExpansion] = useState(0)
    const [numCifras, setNumCifras] = useState(0)
    const [numFilas, setNumFilas] = useState(0)
    const [numColumnas, setNumColumnas] = useState(0)
    const [doExpansion, setDoExpansion] = useState(0)
    const [doReduccion, setDoReduccion] = useState(0)
    const [parametrosValidos, setParametrosValidos] = useState(false)
    // const [tipoExpansion, setTipoExpansion] = useState(0)
    // const [numCifras, setNumCifras] = useState(4)
    // const [numFilas, setNumFilas] = useState(2)
    // const [numColumnas, setNumColumnas] = useState(2)
    // const [doExpansion, setDoExpansion] = useState(.75)
    // const [doReduccion, setDoReduccion] = useState(1.99)
    // const [parametrosValidos, setParametrosValidos] = useState(false)
    
    const [ideal, setIdeal] = useState('')


    let contenido;

    if (!contenido) {
        contenido = <form onSubmit={formSubmit}>
            {/* <h4>Selecciona un tipo de busqueda: </h4>
            <label> <input type="radio" value={1} checked={tipoBusqueda == 1} onChange={cambioBusqueda} /> Secuencial </label> <br />
            <label> <input type="radio" value={2} checked={tipoBusqueda == 2} onChange={cambioBusqueda} /> Binaria </label> <br />
            <label> <input type="radio" value={3} checked={tipoBusqueda == 3} onChange={cambioBusqueda} /> Hash modulo </label> <br /> */}

            <h4>Selecciona tipo de expansion y reduccion: </h4>
            <label> <input type="radio" value={0} checked={tipoExpansion == 0} onChange={cambioExpansion} /> Expansioes Totales </label> <br />
            <label> <input type="radio" value={1} checked={tipoExpansion == 1} onChange={cambioExpansion} /> Expansiones Parciales </label> <br />

            <h4>Ingresa el número de cifras que va a tener cada clave: </h4>
            <input type="number" onChange={cambioNumCifras} /> <br />

            <h4>Ingresa el número de registros iniciales mayor a 1: </h4>
            <input type="number" onChange={cambioNumFilas} /> <br />

            <h4>Ingresa el número de cubetas iniciales mayor a 1: </h4>
            <input type="number" onChange={cambioNumColumnas} /> <br />

            <h4>Ingresa el porcentaje de Densidad de Ocupacion para expandir: </h4>
            <p>Debe estar entre 50% y 100% (ejemplo 0.70)</p>
            <input type="number" step={0.01} onChange={cambioDoExpansion} /> <br />

            <h4>Ingresa el porcentaje de Desidad de Ocupacion para reduccir: </h4>
            <p>Ejemplo 1.2 {ideal && <> - Ideal: {ideal}</>}</p>
            <input type="number" step={0.001} onChange={cambioDoReduccion} /> <br />

            <button className="btn btn-default" type="submit"> Aceptar </button>
        </form>;
    }

    const handleSeleccionar = () => {
        setParametrosValidos(true);
    }

    function cambioBusqueda(event) {
        setTipoBusqueda(parseInt(event.target.value))
    }

    function cambioExpansion(event) {
        setTipoExpansion(parseInt(event.target.value))
    }

    function cambioNumCifras(event) {
        setNumCifras(parseInt(event.target.value))
    }

    function cambioNumFilas(event) {
        setNumFilas(parseInt(event.target.value))
    }

    function cambioNumColumnas(event) {
        setNumColumnas(parseInt(event.target.value))
    }

    function cambioDoExpansion(event) {
        setDoExpansion(parseFloat(event.target.value))
        calcularDoRIdeal(parseFloat(event.target.value))

    }

    function cambioDoReduccion(event) {
        setDoReduccion(parseFloat(event.target.value))
    }

    function calcularDoRIdeal(num) {
        
        if (num != 0 && numFilas != 0 && numColumnas != 0) {
            // (doE*totalRegistros) / (cubertas*2)
            setIdeal(`${((Math.ceil(num * numFilas * numColumnas)) / (numColumnas * 2)).toFixed(3)}`)
        }
    }

    function formSubmit(event) {
        event.preventDefault();
        if (numFilas < 2 || numColumnas < 2) {
            alert("Ingera un numero de filas y columnas válido")
            return;
        } else if (numCifras < 1) {
            alert("Ingerse un numero de cifras válido")
            return;
        }
        else if (doExpansion >= 1 || doExpansion <= .49) {
            alert("Ingrese un porcentaje de expansion valido")
            return;
        }
        else if (doReduccion < ideal) {
            alert("Ingrese un porcentaje mayor o igual al ideal")
            return;
        }
        handleSeleccionar();
        const data = { "numCifras": numCifras, "numFilas": numFilas, "numColumnas": numColumnas, "doExpansion": doExpansion, "doReduccion": doReduccion }
        cookies.set("data", data, { path: "/ ; " })
    }

    return (
        <>
            {parametrosValidos ? <ExpansionTotal tipoExpansion={tipoExpansion} /> : contenido}
        </>
    )


}