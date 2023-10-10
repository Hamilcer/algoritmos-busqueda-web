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
    //console.log(data);

    let numFilas = data.numFilas
    let numColumnas = data.numColumnas
    const rowData = [];
    const columnDefs = [];
    const insertadas = []
    const expasiones = [data.numColumnas]

    useEffect(() => {
        crearFilas(numFilas, numColumnas)
        crearColumnas(numColumnas)
    }, [1])

    function leerClave() {
        let clave = parseInt(document.getElementById("add").value)
        if ((insertadas.length + 1) / (rowData.length * columnDefs.length) >= data.doExpansion) {
            alert("expansion")
            expandir()
        }
        insertar(clave)
        insertadas.push(clave)
    }

    function insertar(clave) {
        let index = clave % columnDefs.length
        for (let i = 0; i < rowData.length; i++) {
            if (rowData[i][index] == '-') {
                rowData[i][index] = clave.toString()
                break;
            }
        }
        actualizarCells()
    }

    function expandir() {
        console.log("expasiones"+expasiones);
        if (expasiones.length < 2) {
            numColumnas = expasiones[0] + parseInt(expasiones[0] / 2)
        } else {
            numColumnas = expasiones[expasiones.length - 2] * 2
        }
        expasiones.push(numColumnas)
        crearFilas(numFilas, numColumnas)
        crearColumnas(numColumnas)

        console.log(rowData)
        console.log(columnDefs)
        console.log(insertadas);

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
        //console.log(gridRef.current.api);
    }, []);

    const actualizarColums = useCallback(() => {
        //gridRef.current.api.refreshCells();
        //gridRef.current.api.redrawRows();
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(columnDefs);
        //console.log(gridRef.current.api);
    }, []);

    const actualizarGrid = useCallback(() => {
        gridRef.current.api.refreshCells();
        //gridRef.current.api.redrawRows();
        gridRef.current.api.setRowData(rowData);
        gridRef.current.api.setColumnDefs(columnDefs);
        //console.log(gridRef.current.api);
    }, []);

    function crearFilas(filas, columnas) {
        for (let i = 0; i < filas; i++) {
            rowData[i] = {}
            for (let j = 0; j < columnas; j++) {
                rowData[i][j] = '-'
            }
        }
    }

    function crearColumnas(columnas) {
        for (let i = 0; i < columnas; i++) {
            columnDefs[i] = { "field": i.toString() };
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
                <button onClick={onColumnData}>Orto</button>
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


