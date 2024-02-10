import { React, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Select, MenuItem, InputLabel, Container, Grid, } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import DataGridDemo from "./GridPacientes";
import axios from 'axios';


export default function App() {
  const initPaciente = {
    nombre: ""
    , tipoIdentificacion: ""
    , numeroDocumento: ""
    , fechaNacimiento: new Date()
    , talla: ""
    , peso: ""
  };

  const [listaPacientes, setListaPacientes] = useState([]);
  const [totalpacientes, setTotalPacientes] = useState(0);
  const [formData, setFormData] = useState(initPaciente);

  useEffect(() => {
    apiConsultaPacientes();
  }, [totalpacientes]);


  const apiConsultaPacientes = async () => {
    try {
      const url = 'http://localhost:8080/api/pacientes/consultarTodos';
      const response = await fetch(url);
      const result = await response.json();
      setListaPacientes(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const apiCrearPaciente = async (rows) => {
    try {
      const url = 'http://localhost:8080/api/pacientes/crear';
      const { data, status } = await axios.post(url, rows);
      if (status === 200) {
        setFormData(initPaciente);
        alert('Registro guardado con exito');
      } else {
        alert('Error guardando registro');
      }
      setTotalPacientes(data.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const apiActualizarPaciente = async (rows) => {
    try {
      const url = `http://localhost:8080/api/pacientes/update/${rows.tipoIdentificacion}/${rows.numeroDocumento}`;
      const { status } = await axios.put(url, rows);
      if (status === 200) {
        setFormData(initPaciente);
        alert('Registro actualizado con exito');
      } else {
        alert('Error actualizando registro');
      }
      setTotalPacientes(Math.random());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const apiConsultaPaciente = async (tipo, numero) => {
    try {
      if (tipo === '' || numero === '') {
        alert('Campos "Tipo identificación" y "Número documento" son obligatorios');
        return;
      }
      const url = `http://localhost:8080/api/pacientes/consultar?tipoIdentificacion=${tipo}&numeroDocumento=${numero}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result?.message) {
        setFormData(initPaciente);
        alert('No se encontraron datos para el paciente');
        return;
      }
      setFormData({ ...result });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const apiEliminar = async (tipo, numero) => {
    try {
      if (tipo === '' || numero === '') {
        alert('Campos "Tipo identificación" y "Número documento" son obligatorios');
        return;
      }
      const url = `http://localhost:8080/api/pacientes/delete/${tipo}/${numero}`;
      const { status } = await axios.delete(url);

      if (status === 200) {
        setTotalPacientes(Math.random());
        alert('Paciente eliminado con exito');
        return;
      }
      alert('No se elimino paciente');

    } catch (error) {
      console.error('Error eliminando paciente:', error);
    }
  };

  const options = [
    { value: "CC", label: "Cedula" },
    { value: "TI", label: "Tarjeta de identidad" },
    { value: "RC", label: "Registro civil" },
  ];

  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'numeroDocumento') {
      const re = /^[0-9\b]+$/;
      if (value === '' || re.test(value) === false) {
        alert('Solo se permiten números para el campo Número documento');
        setFormData((prevFormData) => ({ ...prevFormData, numeroDocumento: '' }));
        return;
      }
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeDate = (event) => {
    const fechaNacimiento = event;
    setFormData((prevFormData) => ({ ...prevFormData, fechaNacimiento }));
  };

  const handleSubmit = () => {
    let data = formData;
    data.fechaNacimiento = moment(data.fechaNacimiento).format("YYYY-MM-DD");

    const lista = Object.values(data).find((element) => element === '');
    if (lista === '') {
      alert('Todos los campos son requeridos!');
      return;
    }
    const row = listaPacientes.find(x => x.tipoIdentificacion === data.tipoIdentificacion && x.numeroDocumento === data.numeroDocumento);
    if (row?.nombre) {
      alert('El paciente ya existe!');
      return;
    }
    apiCrearPaciente(data);
  }
  const handleBuscar = () => {
    apiConsultaPaciente(formData.tipoIdentificacion, formData.numeroDocumento);
  }

  const handleActualizar = () => {
    let data = formData;
    data.fechaNacimiento = moment(data.fechaNacimiento).format("YYYY-MM-DD");

    const lista = Object.values(data).find((element) => element === '');
    if (lista === '') {
      alert('Todos los campos son requeridos!');
      return;
    }
    const row = listaPacientes.find(x => x.tipoIdentificacion === data.tipoIdentificacion && x.numeroDocumento === data.numeroDocumento);
    if (!row?.nombre) {
      alert('El paciente no existe para actualizarlo!');
      return;
    }
    apiActualizarPaciente(data);
  }

  const handleEliminar = () => {
    apiEliminar(formData.tipoIdentificacion, formData.numeroDocumento);
  }

  return (
    <Container>
      <FormControl>
        <h2>Registrar pacientes</h2>
        <TextField size='small' onChange={handleChange} value={formData.nombre}
          name='nombre' label={"Nombre"} />
        <br></br>
        <FormControl>
          <InputLabel id="test-select-label">Tipo identicación</InputLabel>
          <Select
            labelId='test-select-label'
            label="Tipo documento" name='tipoIdentificacion'
            onChange={handleChange} value={formData.tipoIdentificacion}>
            {generateSingleOptions()}
          </Select>
        </FormControl>
        <br></br>
        <TextField size='small' onChange={handleChange} value={formData.numeroDocumento}
          name='numeroDocumento' label={"Número documento"} />
        <br></br>
        <FormControl>
          <InputLabel id="test-date-label">Fecha nacimiento</InputLabel>
          <DatePicker
            id="test-date-label"
            selected={formData.fechaNacimiento}
            onChange={handleChangeDate}
            // dateFormat="YYYY-MM-DD"
            name="fechaNacimiento"
          />
        </FormControl>
        <br></br>
        <TextField size='small' onChange={handleChange} value={formData.peso}
          name='peso' label={"Peso"} />
        <br></br>
        <TextField size='small' onChange={handleChange} value={formData.talla}
          name='talla' label={"Talla"} />
        <FormControl>
          <Grid container spacing={1}>
            <Grid item xs={0}>
              <Tooltip title="Para consultar se debe ingresar Tipo identificación y Número documento"
                placement="top-start">
                <Button onClick={handleBuscar}>Consultar</Button>
              </Tooltip>
            </Grid>
            <Grid item xs={0}>
              <Button onClick={handleSubmit}>Guardar</Button>
            </Grid>
            <Grid item xs={0}>
              <Tooltip title="Para Actualizar se debe ingresar Tipo identificación y Número documento para cargar datos a actualizar"
                placement="top-start">
                <Button onClick={handleActualizar}>Actualizar</Button>
              </Tooltip>
            </Grid>
            <Grid item xs={0}>
              <Tooltip title="Para Eliminar se debe ingresar Tipo identificación y Número documento"
                placement="top-start">
                <Button onClick={handleEliminar}>Eliminar</Button>
              </Tooltip>
            </Grid>
          </Grid>
        </FormControl>
        <br></br>
        <DataGridDemo data={listaPacientes}></DataGridDemo>
      </FormControl>
    </ Container>
  );
}

