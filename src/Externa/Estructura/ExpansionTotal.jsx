import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Cookies from 'universal-cookie';
import toast, { Toaster } from 'react-hot-toast';

const cookies = new Cookies()

export default function ExpansionParcial() {

    const gridRef = useRef();
    const data = cookies.get('data')

    const numFilas = data.numFilas
    let numColumnas = data.numColumnas
    const rowData = [];
    const columnDefs = [];
    const insertadas = []
    const expasiones = [data.numColumnas]
    const nameColumn = "Cubeta: "

    const doE = data.doExpansion
    const doR = data.doReduccion

    useEffect(() => {
        crearFilas(numFilas, numColumnas)
        crearColumnas(numColumnas)
    }, [])

    // useEffect(()=>{
    //     // gridRef.current.api.refreshCells();
    // }, [rowData, columnDefs])

    function leerClave() {
        let clave = parseInt(document.getElementById("add").value)
        if (validarCalve(clave)) {
            if ((insertadas.length) / (numFilas * numColumnas) >= doE) {
                alert("expansion")
                expandir()
            }
            insertar(clave)
            insertadas.push(clave)
            notificar(`Clave insertada en la posicion ${clave % numColumnas}`)
        }

    }

    function eliminarClave() {
        let clave = parseInt(document.getElementById("add").value)
        if (!insertadas.includes(clave)) {
            alert("La clave no está insertada")
            return;
        }

        let index = clave % numColumnas
        for (let i = 0; i < rowData.length; i++) {
            if (rowData[i][nameColumn + index.toString()] == clave.toString()) {
                rowData[i][nameColumn + index.toString()] = (i < numFilas) ? '-' : ''
                insertadas.splice(insertadas.indexOf(clave), 1)
                break;
            }
        }

        if ((insertadas.length) / (columnDefs.length) <= doR && expasiones.length > 1) {
            alert("Reduccion")
            reducir()
        }
        actualizarCells()
    }

    function insertar(clave) {
        let index = clave % numColumnas
        let i = 0;
        while (true) {
            if (i < rowData.length && rowData[i][nameColumn + index.toString()] == '-') { //inserta a la primera
                rowData[i][nameColumn + index.toString()] = clave.toString()
                break;
            } else if (i >= numFilas && !rowData[i]) {  //area colision
                if (!rowData[i]) {
                    rowData[i] = {}
                }
                rowData[i][nameColumn + index.toString()] = clave.toString()
                actualizarColums()
                break;
            } else if (i >= numFilas && rowData[i] && !rowData[i][nameColumn + index.toString()]) { //
                rowData[i][nameColumn + index.toString()] = clave.toString()
                actualizarColums()
                break;
            }
            i++
        }
        actualizarCells()
    }

    function expandir() {
        numColumnas = expasiones[expasiones.length - 1] * 2

        expasiones.push(numColumnas)
        crearFilas(numFilas, numColumnas)
        crearColumnas(numColumnas)
        for (let i = 0; i < insertadas.length; i++) {
            insertar(insertadas[i])
        }
        actualizarColums()

    }

    function reducir() {
        numColumnas = expasiones[expasiones.length - 2]
        expasiones.pop()
        crearFilas(numFilas, numColumnas)
        crearColumnas(numColumnas)
        for (let i = 0; i < insertadas.length; i++) {
            insertar(insertadas[i])
        }
        actualizarColums()
    }

    const actualizarCells = useCallback(() => {
        gridRef.current.api.refreshCells();
    }, []);

    const actualizarColums = useCallback(() => {
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(columnDefs);
    }, []);

    const actualizarGrid = useCallback(() => {
        gridRef.current.api.refreshCells();
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(columnDefs);
        console.log(rowData)
        console.log(columnDefs)
    }, []);

    function crearFilas(filas, columnas) {
        
        for (let i = 0; i < filas; i++) {
            rowData[i] = {}
            rowData[i][' '] = "Registro: " + i
            for (let j = 1; j < columnas+1; j++) {
                rowData[i][nameColumn + (j-1).toString()] = '-'
            }
        }
        let actualRows = rowData.length
        for (let j = numFilas; j < actualRows; j++) {
            rowData.pop()
        }

    }

    function crearColumnas(columnas) {
        columnDefs[0] = { "field": " ", "lockPosition": 'left'};
        for (let i = 1; i < columnas+1; i++) {
            columnDefs[i] = { "field": nameColumn + (i-1).toString(), "lockPosition": 'left'};
        }
        let sobrante = columnDefs.length
        for (let j = columnas+1; j < sobrante; j++) {
            columnDefs.pop()
        }
    }

    function validarCalve(clave) {
        if (clave < 0 || !clave) {
            alert("Introduzca un numero positivo")
            return false
        }
        if (insertadas.indexOf(clave) != -1) {
            alert("Clave ya insertada")
            return false
        }
        return true
    }

    function notificar(msg) {
        toast(msg)
    }

    return (
        <>
            <h1>Expansión Total</h1>
            <input type="number" id='add' />
            <div style={{ marginBottom: '5px', minHeight: '30px' }}>
                <button onClick={leerClave}>Insertar</button>
                <button onClick={eliminarClave}>Eliminar</button>
            </div>
            <div style={{ height: 500 }} className="ag-theme-alpine-dark">
                <AgGridReact

                    ref={gridRef}

                    rowData={rowData}
                    columnDefs={columnDefs}
                    rowSelection={'single'}
                    lockPosition ={true}
                    // animateRows={true}
                />
            </div>
            <button onClick={actualizarGrid}>Actualizar</button>
            <Toaster />
        </>
    );
};


