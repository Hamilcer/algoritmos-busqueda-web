import { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuExterna from './MenuExterna'
import Cookies from 'universal-cookie';

export default function Externa() {
    const cookies = new Cookies();

    const [tipoBusqueda, setTipoBusqueda] = useState(1)
    const [tipoExpansion, setTipoExpansion] = useState(0)
    const [numCifras, setNumCifras] = useState(4)
    const [numFilas, setNumFilas] = useState(2)
    const [numColumnas, setNumColumnas] = useState(2)
    const [doExpansion, setDoExpansion] = useState(.75)
    const [doReduccion, setDoReduccion] = useState(1.2)
    const [parametrosValidos, setParametrosValidos] = useState(true)

    let contenido;

    if (!contenido) {
        contenido = <form onSubmit={formSubmit}>
            <h4>Selecciona un tipo de busqueda: </h4>
            <label> <input type="radio" value={1} checked={tipoBusqueda == 1} onChange={cambioBusqueda} /> Secuencial </label> <br />
            <label> <input type="radio" value={2} checked={tipoBusqueda == 2} onChange={cambioBusqueda} /> Binaria </label> <br />
            <label> <input type="radio" value={3} checked={tipoBusqueda == 3} onChange={cambioBusqueda} /> Hash modulo </label> <br />

            <h4>Selecciona tipo de expansion y reduccion: </h4>
            <label> <input type="radio" value={1} checked={tipoExpansion == 1} onChange={cambioExpansion} /> Expansioes Totales </label> <br />
            <label> <input type="radio" value={0} checked={tipoExpansion == 0} onChange={cambioExpansion} /> Expansiones Parciales </label> <br />

            <h4>Ingresa el número de cifras que va a tener cada clave: </h4>
            <input type="number" onChange={cambioNumCifras} /> <br />

            <h4>Ingresa el número de registros iniciales mayor a 1: </h4>
            <input type="number" onChange={cambioNumFilas} /> <br />

            <h4>Ingresa el número de cubetas iniciales mayor a 1: </h4>
            <input type="number" onChange={cambioNumColumnas} /> <br />

            <h4>Ingresa el porcentaje de Desidad de Ocupacion para expandir: </h4>
            <p>Debe estar entre 50% y 100% (ejemplo 0.70)</p>
            <input type="number" step={0.01} onChange={cambioDoExpansion} /> <br />

            <h4>Ingresa el porcentaje de Desidad de Ocupacion para reduccir: </h4>
            <p>Debe estar entre 100% y 200% (ejemplo 1.2)</p>
            <input type="number" step={0.01} onChange={cambioDoReduccion} /> <br />

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
    }

    function cambioDoReduccion(event) {
        setDoReduccion(parseFloat(event.target.value))
    }

    function formSubmit(event) {
        event.preventDefault();
        if (numFilas < 2 || numColumnas < 2) {
            alert("Ingera un numero de filas y columnas válido")
            return;
        } else if (numCifras < 1) {
            alert("Ingerse un numero de cifras válido")
            return;
        } else if (doExpansion >= 1 || doExpansion <= .49) {
            alert("Ingrese un porcentaje de expansion valido")
            return;
        } else if (doReduccion <= 1 || doReduccion >= 2) {
            alert("Ingrese un porcentaje de reduccion valido")
            return;
        }
        handleSeleccionar();
        const data = { "numCifras": numCifras, "numFilas": numFilas, "numColumnas":numColumnas, "doExpansion":doExpansion, "doReduccion":doReduccion}
        cookies.set("data", data, { path: "/ ; " })
    }

    //cookies.set("nombre", "hamilton", { path: "/ ; " })
    //cookies.set("nombre2", "ElCristian", { path: "/ ; " })


    //cookies.get('nombre') 


    return (
        <>
            {parametrosValidos ? <MenuExterna tipoExpansion={tipoExpansion} /> : contenido}
        </>
    )


}