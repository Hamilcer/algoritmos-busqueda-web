import { useState } from 'react'
import MenuInterna from './MenuInterna'
import { Link } from 'react-router-dom'

export default function Interna() {

    const [tipoBusqueda, setTipoBusqueda] = useState(1)
    const [colision, setColision] = useState(1)
    const [numClaves, setNumClaves] = useState(0)
    const [numCifras, setNumCifras] = useState(0)
    const [parametrosValidos, setParametrosValidos] = useState(false)

    let contenido;

    if (!contenido) {
        contenido = <form onSubmit={formSubmit}>
            <h4>Selecciona un tipo de busqueda: </h4>
            <label> <input type="radio" value={1} checked={tipoBusqueda == 1} onChange={cambioBusqueda} /> Secuencial </label> <br />
            <label> <input type="radio" value={2} checked={tipoBusqueda == 2} onChange={cambioBusqueda} /> Binaria </label> <br />
            <label> <input type="radio" value={3} checked={tipoBusqueda == 3} onChange={cambioBusqueda} /> Hash modulo </label> <br />
            <label> <input type="radio" value={4} checked={tipoBusqueda == 4} onChange={cambioBusqueda} /> Hash cuadrado </label> <br />
            <label> <input type="radio" value={5} checked={tipoBusqueda == 5} onChange={cambioBusqueda} /> Hash truncamiento </label> <br />
            <label> <input type="radio" value={6} checked={tipoBusqueda == 6} onChange={cambioBusqueda} /> Hash plegamiento </label> <br />

            <h4>Selecciona la solucion de colision: </h4>
            <label> <input type="radio" value={1} checked={colision == 1} onChange={cambioColision} /> Lineal </label> <br />
            <label> <input type="radio" value={2} checked={colision == 2} onChange={cambioColision} /> Cuadratica </label> <br />
            <label> <input type="radio" value={3} checked={colision == 3} onChange={cambioColision} /> Doble hash </label> <br />
            <label> <input type="radio" value={4} checked={colision == 4} onChange={cambioColision} /> Arreglos anidados </label> <br />
            <label> <input type="radio" value={5} checked={colision == 5} onChange={cambioColision} /> Listas enlazadas </label> <br />

            <h4>Ingresa el número de claves a insertar mayor o igual a 10 (debe ser potencia de 10): </h4>
            <input type="number" onChange={cambioNumClaves} /> <br />

            <h4>Ingresa el número de cifras que va a tener cada clave: </h4>
            <input type="number" onChange={cambioNumCifras} /> <br />

            <button className="btn btn-default" type="submit"> Aceptar </button>
        </form>;
    }

    const handleSeleccionar = () => {
        setParametrosValidos(true);
    }

    function cambioBusqueda(event) {
        setTipoBusqueda(event.target.value)
    }

    function cambioColision(event) {
        setColision(event.target.value)
    }

    function cambioNumClaves(event) {
        setNumClaves(event.target.value)
    }

    function cambioNumCifras(event) {
        setNumCifras(event.target.value)
    }

    function formSubmit(event) {
        event.preventDefault();
        if (numClaves < 10 || !esPotenciaDeDiez(numClaves)) {
            alert("Ingera un numero de Claves válido")
            return;
        } else if (numCifras < 1) {
            alert("Ingerse un numero de cifras válido")
            return;
        }
        handleSeleccionar();
    }

    function esPotenciaDeDiez(n) {
        if (n <= 0 || n == 1) {
            return false;
        }
        while (n > 1) {
            if (n % 10 != 0) {
                return false;
            }
            n /= 10;
        }
        return true;
    }

    return (
        <>
            {parametrosValidos ? <MenuInterna
                tipoBusqueda={tipoBusqueda}
                colision={colision}
                numClaves={numClaves}
                numCifras={numCifras}
            /> : contenido}
        </>
    )


}