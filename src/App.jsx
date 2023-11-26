import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/tablaListaTareas'
import TaskForm from './components/registroTarea'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function App() {
  // Estado para almacenar los elementos de la tarea
  const [taskItems, setTaskItems] = useState([]);

  // Función para crear una nueva tarea
  function createNewTask(newTaskObject) {
    const REGEX = /^[A-Za-z]+$/;
    // Validación del campo tarea
    if(newTaskObject.taskName != "" && newTaskObject.taskName.length > 2)
    {
      if (REGEX.test(newTaskObject.taskName))
      {
        // Verifica si ya existe una tarea con el mismo nombre
          if (!taskItems.find((taskObject) => taskObject.taskName === newTaskObject.taskName)) {
            
            // Agrega la nueva tarea al estado previo
            setTaskItems((prevTaskItems) => [
              ...prevTaskItems,
              { id: newTaskObject.id, taskName: newTaskObject.taskName, comment: newTaskObject.comment },
            ]);
          }else{
            alert("Ya existe el nombre de esta tarea");
          }
      }
      else {
        alert("El campo tarea debe contener solo palabras");
      }
    }
    else {
      // Muestra una alerta si la tarea ya existe
      alert("Campo tarea invalido");
    }
  }

  // Efecto para cargar los datos desde el almacenamiento local al cargar la página
  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  // Efecto para guardar los datos en el almacenamiento local cuando taskItems cambia
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  // Nueva función para manejar la eliminación de tareas
  const handleDeleteClick = (selectedIds) => {
    // Filtra las tareas que no están seleccionadas
    const updatedTasks = taskItems.filter((taskObject) => !selectedIds.includes(taskObject.id));
    // Actualiza el estado con la nueva lista de tareas
    setTaskItems(updatedTasks);
  };

  // Renderiza los componentes TaskForm y TaskList con los datos actuales
  return (
    <>
      <h1 className = "titulo">Lista de tareas</h1>
      <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <TaskForm createNewTask={createNewTask} />
      </Box>
      <Box sx={{ mt: 4 }}>
        {/* Pasa la función handleDeleteClick al componente TaskList */}
        <TaskList taskItems={taskItems} onDeleteClick={handleDeleteClick} />
      </Box>
    </Container>
    </>
  );
}

export default App;