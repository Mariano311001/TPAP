import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TablaListaTareas from './components/tablaListaTareas'
import ItemsIngresoDatos from './components/registroTarea'



function App() {
  // Estado para almacenar los elementos de la tarea
  const [taskItems, setTaskItems] = useState([]);

  // Función para crear una nueva tarea
  function createNewTask(taskObjeto) {
    // Verifica si ya existe una tarea con el mismo nombre
    if (!taskItems.find((task) => task.tarea === taskObjeto.tarea)) {
      // Agrega la nueva tarea al estado previo
      setTaskItems((prevTaskItems) => [
        ...prevTaskItems,
        { id: taskObjeto.id, tarea: taskObjeto.tarea, comentario: taskObjeto.comentario },
      ]);
    } else {
      // Muestra una alerta si la tarea ya existe
      alert("Ya existe el nombre de esta tarea");
    }
  }

  // Efecto para cargar los datos desde el almacenamiento local al cargar la página
  useEffect(() => {
    let data = localStorage.getItem('task');
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  // Efecto para guardar los datos en el almacenamiento local cuando taskItems cambia
  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(taskItems));
  }, [taskItems]);

  // Nueva función para manejar la eliminación de tareas
  const handleDeleteClick = (selectedIds) => {
    // Filtra las tareas que no están seleccionadas
    const updatedTasks = taskItems.filter((task) => !selectedIds.includes(task.id));
    // Actualiza el estado con la nueva lista de tareas
    setTaskItems(updatedTasks);
  };

  // Renderiza los componentes ItemsIngresoDatos y TablaListaTareas con los datos actuales
  return (
    <>
      <ItemsIngresoDatos createNewTask={createNewTask} />
      {/* Pasa la función handleDeleteClick al componente TablaListaTareas */}
      <TablaListaTareas registros={taskItems} onDeleteClick={handleDeleteClick} />
    </>
  );
}

export default App;