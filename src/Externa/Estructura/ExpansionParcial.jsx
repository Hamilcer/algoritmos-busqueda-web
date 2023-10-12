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

const cookies = new Cookies();

const columnData2 = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "nueva" }
];

export default function ExpansionParcial() {

    const gridRef = useRef();
    const data = cookies.get('data')

    const numFilas = data.numFilas
    let numColumnas = data.numColumnas
    const rowData = [];
    const columnDefs = [];
    const insertadas = []
    const expasiones = [data.numColumnas]

    const doE = data.doExpansion
    const doR = data.doReduccion

    useEffect(() => {
        crearFilas(numFilas, numColumnas)
        crearColumnas(numColumnas)
    }, [1])

    function leerClave() {
        let clave = parseInt(document.getElementById("add").value)
        if ((insertadas.length + 1) / (numFilas * columnDefs.length) >= doE) {
            alert("expansion")
            expandir()
        }
        insertar(clave)
        insertadas.push(clave)
    }

    function eliminarClave() {
        let clave = parseInt(document.getElementById("add").value)
        if (!insertadas.includes(clave)) {
            alert("La clave no está insertada")
            return;
        }

        let index = clave % columnDefs.length
        for (let i = 0; i < rowData.length; i++) {
            if (rowData[i][index] == clave.toString()) {
                rowData[i][index] = (i < numFilas) ? '-' : ''
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
        let index = clave % columnDefs.length
        let i = 0;
        while (true) {
            if (i < rowData.length && rowData[i][index] == '-') {
                rowData[i][index] = clave.toString()
                break;
            } else if (i >= numFilas && !rowData[i]) {
                if (!rowData[i]) {
                    rowData[i] = {}
                }
                rowData[i][index] = clave.toString()
                actualizarColums()
                break;
            } else if (i >= numFilas && rowData[i] && !rowData[i][index]) {
                rowData[i][index] = clave.toString()
                actualizarColums()
                break;
            }
            i++
        }
        actualizarCells()
    }

    function expandir() {
        if (expasiones.length < 2) {
            numColumnas = expasiones[0] + parseInt(expasiones[0] / 2)
        } else {
            numColumnas = expasiones[expasiones.length - 2] * 2
        }
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
        //gridRef.current.api.redrawRows();
        //gridRef.current.api.setRowData(rowData);
        //gridRef.current.api.setColumnDefs(columnDefs);
    }, []);

    const actualizarColums = useCallback(() => {
        //gridRef.current.api.refreshCells();
        //gridRef.current.api.redrawRows();
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(columnDefs);
    }, []);

    const actualizarGrid = useCallback(() => {
        gridRef.current.api.refreshCells();
        //gridRef.current.api.redrawRows();
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(columnDefs);
    }, []);

    function crearFilas(filas, columnas) {
        for (let i = 0; i < filas; i++) {
            rowData[i] = {}
            for (let j = 0; j < columnas; j++) {
                rowData[i][j] = '-'
            }
        }
        let actualRows = rowData.length
        for (let j = numFilas; j < actualRows; j++) {
            rowData.pop()
        }

    }

    function crearColumnas(columnas) {
        for (let i = 0; i < columnas; i++) {
            columnDefs[i] = { "field": i.toString() };
        }
        let sobrante = columnDefs.length
        for (let j = columnas; j < sobrante; j++) {
            columnDefs.pop()
        }
    }


    const onColumnData = useCallback(() => {
        //setColumnDefs(columnData2);
    }, []);


    return (
        <>
            <h1>Parcial</h1>
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
                    animateRows={true}

                //onGridReady={actualizarGrid}

                />
            </div>
        </>
    );
};


