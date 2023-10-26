import { useReducer, useState } from "react"
import '../css/Indices.css';

export default function IndicesDos() {

    const Archivo = 250000
    const LongRegDato = 150
    const LongRegIndice = 15
    const CantBloqDicoDuro = 8192

    let RegBloq = Math.floor(CantBloqDicoDuro / LongRegDato)
    let Bloques = Math.ceil(Archivo / RegBloq)
    let RegIndBloq = Math.floor(CantBloqDicoDuro / LongRegIndice)
    let BloqRegInd = Math.ceil(Bloques / RegIndBloq)

    // es => estructura
    const [bloqIndices, dispatchBloqIndices] = useReducer(reducerBloqIndices, crearBloqIndices())
    const [bloqRegistros, dispatchBloqueRegistros] = useReducer(reduceBloqRegistros, crearBloqRegistros())

    function crearBloqIndices() {
        let arr = []
        for (let i = 0; i < BloqRegInd; i++) {
            arr.push({})
            arr[i].bloque = (i + 1)
            arr[i].reg = []
            arr[i].show = false
            for (let j = RegIndBloq * i + 1; j <= RegIndBloq * (i + 1); j++) {
                // arr[i].reg.push(j)
                arr[i].reg.push(0)

            }
        }
        return arr
    }

    function crearBloqRegistros() {
        let arr = []
        for (let i = 0; i < Bloques; i++) {
            arr.push({})
            arr[i].bloque = (i + 1)
            arr[i].reg = []
            arr[i].show = false
            for (let j = RegBloq * i + 1; j <= RegBloq * (i + 1); j++) {
                // arr[i].reg.push(j)
                arr[i].reg.push(0)

            }
        }
        return arr
    }

    function reducerBloqIndices(state, action) {
        if (action.type === 'show') {
            console.log(action.id);
            return (state.map(item => {
                if (item.bloque == action.id) {
                    return { ...item, show: item.show ? false : true }
                }
                else {
                    return item
                }
            }))
        }

    }

    function reduceBloqRegistros(state, action) {
        if (action.type === 'show') {
            console.log(action.id);
            return (state.map(item => {
                if (item.bloque == action.id) {
                    return { ...item, show: item.show ? false : true }
                }
                else {
                    return item
                }
            }))
        } else if (action.type === 'insertar') {

            return(state.map(item => {
                item.map()
            }))

        }
        return state
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
    // console.log(bloqIndices);

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

            <input type="number" id="input"></input>
            <button onClick={() => {
                dispatchBloqueRegistros({ type: 'insertar', clave: document.getElementById('input').value })
            }}>Insertar</button>

            <div className="container">
                <div>
                    <h4>Bloques indices</h4>
                    <ul>
                        {bloqIndices.map(item => (
                            <li key={item.bloque}>
                                <button onClick={() => {
                                    dispatchBloqIndices({ type: 'show', id: item.bloque })
                                }} id={item.bloque}>{item.bloque}</button>
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
                        {bloqRegistros.map(item => (
                            <li key={item.bloque}>
                                <button onClick={() => {
                                    dispatchBloqueRegistros({ type: 'show', id: item.bloque })
                                }} id={item.bloque}>{item.bloque}</button>
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