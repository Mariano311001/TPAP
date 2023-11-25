import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateCalendar } from '@mui/x-date-pickers';
import { useState } from 'react';


export default function RegistroTarea({createNewTask}) {
  //2da opcion
  const [values, setValues] = useState({
    //id : 0,
    tarea : "",
    comentario : "",
    //fecha : "",

  });



const handleInputChange = (event) =>{
  const {name, value} = event.target
  setValues({
    ...values,
    [name]:value,
  })
}

const handleForm = (event) =>{
  event.preventDefault()
  //console.log(values)
  createNewTask(values)
  localStorage.setItem("task", values)
};


//retorna el valor de la fecha seleccionada en el Datepicker
const handleDateChange = (date) => {
  //setValues.fecha = date
};

  return (
    
    <Box
      component="form" onSubmit={handleForm}
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
       id="textBox-Tarea" 
       name = "tarea"
       label="Ingrese una tarea" 
       onChange={handleInputChange}
       value = {values.tarea}
       variant="outlined" 
       />
      <TextField 
      id="textBox-Comentario" 
      label="Ingrese un comentario" 
      name = "comentario"
      onChange={handleInputChange}
      value = {values.comentario}
      variant="outlined" 
      />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        name = "fecha"
        valueType = "date"
        >
          <DatePicker /*onChange={handleDateChange}*//>
      </LocalizationProvider>
      <Button type = "submit" variant="contained">Agregar</Button>
    </Box>
    
    );
}