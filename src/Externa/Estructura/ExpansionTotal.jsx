export default function first() {}
// import { useState } from "react";
// import ExpansionParcial from "./Estructura/ExpansionParcial";
// import { crearFilas, crearColumnas } from './functions/funcionesExterna';
// import { AgGridReact } from 'ag-grid-react'

// import 'ag-grid-community/styles/ag-grid.css'
// import "ag-grid-community/styles/ag-theme-alpine.css";

// export default function MenuExterna(props) {

//     //const [filaEstructura, setFilasEstructura] = useState(crearFilas(props.numFilas, props.numColumnas))
//     //const [columnaEstructura, setColumnaEstructura] = useState(crearColumnas(props.numColumnas))
//     const [estructura, setEstructura] = useState([crearFilas(props.numFilas, props.numColumnas), crearColumnas(props.numColumnas)])
//     const [expansiones, setExpansiones] = useState([estructura[1].length])
//     const [numInsertadas, setNumInsertadas] = useState(0)
//     const [ordenInsercion, setOrdenInsercion] = useState([])



//     let estructuraExpansion;

//     if (props.tipoExpansion == 1) {
//         //estructuraExpansion
//     } else if (props.tipoExpansion == 2) {
//         estructuraExpansion = <ExpansionParcial
//             //filasE={filaEstructura}
//             //columnasE={columnaEstructura}
//             es={estructura}
//             expansiones={expansiones}
//             numInsertadas={numInsertadas}
//             ordenInsercion={ordenInsercion}
//             doExpansion={props.doExpansion}
//             doReduccion={props.doReduccion}
//             //setFilasEstructura={setFilasEstructura}
//             //setColumnaEstructura={setColumnaEstructura}
//             setEstructura={setEstructura}
//             setExpansiones={setExpansiones}
//             setNumInsertadas={setNumInsertadas}
//             setOrdenInsercion={setOrdenInsercion}
//         />
//     }


//     function print() {
//         console.log(estructura)
//         console.log(ordenInsercion)
//         console.log("numInsertadas: " +numInsertadas)
//         console.log("doExpansion: "+props.doExpansion)
//         //console.log(filaEstructura)
//     }


//     return (
//         <div className="externa">
//             {estructuraExpansion}
//             <br />
//             <button onClick={print}>
//                 Clg
//             </button>
//         </div>
//     )
// }
//////////////////////////////////

// import { AgGridReact } from 'ag-grid-react'

// import '../../css/styleExterna.css'
// import 'ag-grid-community/styles/ag-grid.css'
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { crearColumnas, crearFilas } from '../functions/funcionesExterna';
// import { useCallback, useEffect, useState } from 'react';


// export default function ExpansionParcial(props) {

//     const [row, setRow] = useState(props.es[0])
//     function comprobarDoE() {
//         let clave = parseInt(document.getElementById('add').value)
//         if ((props.numInsertadas + 1) / (props.es[1].length * props.es[0].length) >= props.doExpansion) {
//             expandir()
//             alert("Expansion")
//         }
//         insertar(clave)
//     }


//     function insertar(clave) {
//         let index = clave % props.es[1].length
//         let nuevo = props.es
//         for (let i = 0; i < nuevo[0].length; i++) {

//             if (nuevo[0][i][index] == "-") {
//                 nuevo[0][i][index] = clave
//                 break;
//             }
//         }
//         const update = nuevo;
//         props.setEstructura(update)
//         console.log(props.es)
//         props.setNumInsertadas(props.numInsertadas + 1)
//         addOrdenInsercion(clave)

//     }

//     function addOrdenInsercion(clave) {
//         const nuevo = props.ordenInsercion
//         nuevo.push(parseInt(clave))
//         props.setOrdenInsercion(nuevo)
//     }

//     function expandir() {
//         let newNumColumn;
//         if (props.expansiones.length <= 1) {
//             newNumColumn = newNumColumn + parseInt(newNumColumn / 2)
//         } else {
//             newNumColumn = props.expansiones[props.expansiones - 2] * 2
//         }

//         const newEstructura = [crearFilas(props.es[0].length, props.es[1].length), crearColumnas(newNumColumn)]
//         props.setEstructura(newEstructura)

//         for (let i = 0; i < props.ordenInsercion.length; i++) {
//             insertar(props.ordenInsercion[i])
//         }
//     }

//     useEffect(() => {
//         setRow(row)
//     }, row)
//     function prueba() {
//         console.log("sefgerg!!!!!!!")
//         let value = parseInt(document.getElementById("add").value)
//         let aux = row
//         aux[0][0] = value
//         const update = aux
//         setRow(update)
//         //window.location.reload()
//     }
//     return (
//         <>
//             <h1>Parciales</h1>
//             <div id="myGrid" className='ag-theme-alpine-dark' >
//                 <AgGridReact
//                     rowData={row}
//                     columnDefs={props.es[1]}
//                 />
//             </div>

//             <input type="number" id='add' />
//             <button onClick={prueba}>Agregar</button>
//             <br />
//             <input type="number" id='delete' />
//             <button>Eliminar</button>
//         </>
//     )
// }