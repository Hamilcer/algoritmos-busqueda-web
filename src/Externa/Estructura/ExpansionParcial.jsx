import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
} from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Cookies from 'universal-cookie';


// specify the data
const rowDataA = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Aston Martin', model: 'DBX', price: 190000 },
];

const rowDataB = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'BMW', model: 'M50', price: 60000 },
    { make: 'Aston Martin', model: 'DBX', price: 190000 },
];
const cookies = new Cookies();
export default function ExpansionParcial() {


    console.log(cookies.get('data'))

    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState(rowDataA);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
    ]);

    const onRowDataA = useCallback(() => {
        setRowData(rowDataA);
    }, [rowDataA]);

    const onRowDataB = useCallback(() => {
        setRowData(rowDataB);
    }, [rowDataB]);

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ marginBottom: '5px', minHeight: '30px' }}>
                <button onClick={onRowDataA}>Row Data A</button>
                <button onClick={onRowDataB}>Row Data B</button>
            </div>
            <div style={{ flex: '1 1 0px' }}>
                <div style={{ height: 1000 }} className="ag-theme-alpine">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        rowSelection={'single'}
                        animateRows={true}
                    />
                </div>
            </div>
        </div>
    );
};


