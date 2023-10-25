import { useState } from "react"
import '../css/Indices.css';

export default function EstructuraIndices() {

    const Archivo = 109
    const LongRegDato = 150
    const LongRegIndice = 15
    const CantBloqDicoDuro = 8192

    let RegBloq = Math.floor(CantBloqDicoDuro / LongRegDato)
    let Bloques = Math.ceil(Archivo / RegBloq)
    let RegIndBloq = Math.floor(CantBloqDicoDuro / LongRegIndice)
    let BloqRegInd = Math.ceil(Bloques / RegIndBloq)

    // es => estructura
    const [esPrimario, setEsPrimario] = useState(crearEsPrimario())
    const [esData, setEsData] = useState(crearEsData())

    function crearEsPrimario() {
        let arr = []
        for (let i = 0; i < BloqRegInd; i++) {
            arr.push({})
            arr[i].bloque = (i + 1)
            arr[i].reg = []
            arr[i].show = false
            for (let j = RegIndBloq * i + 1; j <= RegIndBloq * (i + 1); j++) {
                arr[i].reg.push(j)
                // arr[i].reg.push(0)

            }
        }
        return arr
    }

    function crearEsData() {
        let arr = []
        for (let i = 0; i < Bloques; i++) {
            arr.push({})
            arr[i].bloque = (i + 1)
            arr[i].reg = []
            arr[i].show = false
            for (let j = RegBloq * i + 1; j <= RegBloq * (i + 1); j++) {
                arr[i].reg.push(j)
                // arr[i].reg.push(0)

            }
        }
        return arr
    }

    function mostrarBloquePrimario(e) {
        setEsPrimario(
            esPrimario.map(item => {
                if (item.bloque == e.target.id) {
                    return { ...item, show: item.show ? false : true }
                }
                else {
                    return item
                }
            })
        )
    }

    function mostrarBloqueData(e) {
        setEsData(
            esData.map(item => {
                if (item.bloque == e.target.id) {
                    return { ...item, show: item.show ? false : true }
                }
                else {
                    return item
                }
            })
        )
    }

    //console.log(esPrimario);
    console.log(esData);

    return (
        <>
            <h1>
                Indices
            </h1>
            <p>Archivo {Archivo}</p>
            <p>Longitud registro dato {LongRegDato}</p>
            <p>Longitud registro indice {LongRegIndice}</p>
            <p>Cantidad bloques disco duro {CantBloqDicoDuro}</p>
            <hr></hr>
            <p>Registro x Bloque: {RegBloq} </p>
            <p>Bloques: {Bloques} </p>
            <p>Registro indice x Bloque: {RegIndBloq} </p>
            <p>Bloque x Registro indice: {BloqRegInd} </p>


            <div className="container">
                <div>
                    <h4>Bloques indices</h4>
                    <ul>
                        {esPrimario.map(item => (
                            <li key={item.bloque}>
                                <button onClick={mostrarBloquePrimario} id={item.bloque}>{item.bloque}</button>
                                {
                                    item.reg.map((registro, index) => {
                                        if (item.show) {
                                            return (
                                                <p className="reg" key={index} >{(registro == 0) ? '' : registro}</p>
                                            )
                                        }
                                    }

                                    )
                                }

                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                <h4>Bloques registros</h4>
                    <ul>
                        {esData.map(item => (
                            <li key={item.bloque}>
                                <button onClick={mostrarBloqueData} id={item.bloque}>{item.bloque}</button>
                                {
                                    item.reg.map((registro, index) => {
                                        if (item.show) {
                                            return (
                                                <p className="reg" key={index} >{(registro == 0) ? '' : registro}</p>
                                            )
                                        }
                                    }

                                    )
                                }

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}