import React, { useState } from 'react';

function TableComponent() {
    const [isInitialized, setIsInitialized] = useState(false);
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);
    const [data, setData] = useState([]);
    const [inputNumber, setInputNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setData(Array(rows).fill(Array(columns).fill('')));
        setIsInitialized(true);
    };

    const addRow = () => {
        setData([...data, Array(columns).fill('')]);
        setRows(rows + 1);
    }

    const addColumn = () => {
        setData(data.map(row => [...row, '']));
        setColumns(columns + 1);
    }

    const numberExistsInMatrix = (number) => {
        const num = parseInt(number, 10);
        for (let row of data) {
            for (let cell of row) {
                if (parseInt(cell, 10) === num) {
                    return true;
                }
            }
        }
        return false;
    }

    const handleNumberSubmit = (e) => {
        e.preventDefault();

        if (numberExistsInMatrix(inputNumber)) {
            alert('El número ya existe en la tabla.');
            setInputNumber('');
            return;
        }

        const colIndex = inputNumber % columns;
        let rowIndex = 0;

        while (rowIndex < rows && data[rowIndex][colIndex] !== '') {
            rowIndex++;
        }

        if (rowIndex < rows) {
            const newData = [...data];
            newData[rowIndex][colIndex] = inputNumber;
            setData(newData);
        } else {
            alert('No hay espacio disponible en la columna calculada.');
        }

        setInputNumber('');
    }

    if (!isInitialized) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Número de filas:
                        <input type="number" value={rows} onChange={(e) => setRows(Math.max(0, +e.target.value))} required />
                    </label>
                    <label>
                        Número de columnas:
                        <input type="number" value={columns} onChange={(e) => setColumns(Math.max(0, +e.target.value))} required />
                    </label>
                    <button type="submit">Inicializar Tabla</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <table border="1">
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex} style={{ width: '50px', height: '50px', textAlign: 'center' }}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <form onSubmit={handleNumberSubmit}>
                <label>
                    Introduce un número:
                    <input type="number" value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} required />
                </label>
                <button type="submit">Agregar Número</button>
            </form>
            <button onClick={addColumn}>Añadir Columna</button>
            <button onClick={addRow}>Añadir Fila</button>
        </div>
    );
}

export default TableComponent;
