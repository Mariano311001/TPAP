import { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/tablaListaTareas';
import TaskForm from './components/registroTarea';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function App() {
  const [taskItems, setTaskItems] = useState([]);

  // Función para crear una nueva tarea
  function createNewTask(newTaskObject) {
    const REGEX = /^[A-Za-z]+$/;
    if (newTaskObject.taskName !== "" && newTaskObject.taskName.length > 2) {
      if (REGEX.test(newTaskObject.taskName)) {
        if (!taskItems.find((taskObject) => taskObject.taskName === newTaskObject.taskName)) {
          setTaskItems([
            ...taskItems,
            { id: newTaskObject.id, taskName: newTaskObject.taskName, comment: newTaskObject.comment },
          ]);
        } else {
          alert("Ya existe el nombre de esta tarea");
        }
      } else {
        alert("El campo tarea debe contener solo palabras");
      }
    } else {
      alert("Campo vacío o dato menor a 3 letras");
    }
  }

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  // useEffect que guardar los datos en el localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  const handleDeleteClick = (selectedIds) => {
    // Filtra las tareas que no están seleccionadas
    const updatedTasks = taskItems.filter((taskObject) => !selectedIds.includes(taskObject.id));
    setTaskItems(updatedTasks);
  };

  return (
    <>
      <h1 className="titulo">Lista de tareas</h1>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <TaskForm createNewTask={createNewTask} />
        </Box>
        <Box sx={{ mt: 4 }}>
          <TaskList taskItems={taskItems} onDeleteClick={handleDeleteClick} />
        </Box>
      </Container>
    </>
  );
}

export default App;
