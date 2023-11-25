import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tabla from './components/tabla'
import ItemsIngresoDatos from './components/ingresoDatos'



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
        { id: prevTaskItems.length, tarea: taskObjeto.tarea, comentario: taskObjeto.comentario },
      ]);
    } else {
      // Muestra una alerta si la tarea ya existe
      alert("Ya existe");
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

  // Renderiza los componentes ItemsIngresoDatos y Tabla con los datos actuales
  return (
    <>
      <ItemsIngresoDatos createNewTask={createNewTask} />
      <Tabla registros={taskItems} />
    </>
  );
}

export default App;