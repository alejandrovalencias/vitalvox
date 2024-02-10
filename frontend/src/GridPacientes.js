import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

function getTipoIdentificacion(tipoDocumento) {
    const listaTipos = [
        { tipo: 'CC', nombre: "Cedula ciudadania" },
        { tipo: 'TI', nombre: "Tarjeta identidad" },
        { tipo: 'RC', nombre: "Registro civil" },
    ];
    const response = listaTipos.find(c => c.tipo === tipoDocumento);
    if (!response?.nombre) return '';

    return response.nombre;
}

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'nombre',
        headerName: 'Nombre',
        width: 150,
    },
    {
        field: 'tipoIdentificacion',
        headerName: 'Tipo documento',
        width: 150,
        valueGetter: (params) => {
            return getTipoIdentificacion(params.row.tipoIdentificacion);
        },
    },
    {
        field: 'numeroDocumento',
        headerName: 'Numero documento',
        // type: 'number',
        width: 150,
    },
    {
        field: 'fechaNacimiento',
        headerName: 'Fecha nacimiento',
        width: 150,
        valueGetter: (params) => {
            return moment(params.row.fechaNacimiento).format("YYYY-MM-DD");
        },
    },
    {
        field: 'peso',
        headerName: 'Peso',
        width: 110,
    },
    {
        field: 'talla',
        headerName: 'Talla',
        width: 110,
    },
];

export default function DataGridDemo({ data }) {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection={false}
                disableRowSelectionOnClick
            />
        </Box>
    );
}