import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid



//Se define el componente funcional RegistroTarea.
export default function TaskForm({createNewTask}) {
  //Se utiliza el hook useState para inicializar el estado del componente con un objeto que contiene los valores de taskName y comment.
  const [values, setValues] = useState({
    taskName : "",
    comment : "",
  });


const handleInputChange = (event) =>{
  const {name, value} = event.target
  setValues({
    ...values,
    [name]:value,
  })
}

const handleForm = (event) => {
  event.preventDefault();
  const id = uuidv4();
  createNewTask({ ...values, id });
  setValues({
    taskName: "",
    comment: "",
  });
};

return (
  <Box
    component="form"
    onSubmit={handleForm}
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField
      id="textBox-Tarea"
      name="taskName"
      label="Ingrese una tarea"
      onChange={handleInputChange}
      value={values.taskName}
      variant="outlined"
    />
    <TextField
      id="textBox-comment"
      label="Ingrese un comentario"
      name="comment"
      onChange={handleInputChange}
      value={values.comment}
      variant="outlined"
    />

    <Button type="submit" variant="contained">
      Agregar
    </Button>
  </Box>
);
}