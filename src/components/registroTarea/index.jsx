import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';



//componente TaskForm.
export default function TaskForm({AddNewTask}) {
  const [values, setValues] = useState({
    taskName : "",
    comment : "",
    id : uuidv4(),
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
  AddNewTask({ ...values});
  setValues({
    taskName: "",
    comment: "",
    id : uuidv4(),
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
      id={values.id}
      name="taskName"
      label="Ingrese una tarea"
      onChange={handleInputChange}
      value={values.taskName}
      variant="outlined"
    />
    <TextField
      id="txtComment"
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