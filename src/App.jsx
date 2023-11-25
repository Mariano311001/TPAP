import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tabla from './components/tabla'
import ItemsIngresoDatos from './components/ingresoDatos'



function App() {



  const [taskItems, setTaskItems] = useState([])

  function createNewTask(taskObjeto) {
    if (!taskItems.find((task) => task.tarea === taskObjeto.tarea)) {
      setTaskItems((prevTaskItems) => [
        ...prevTaskItems,
        { id: prevTaskItems.length, tarea: taskObjeto.tarea, comentario: taskObjeto.comentario },
      ]);
    } else {
      alert("Ya existe");
    }
  }

useEffect(() =>{
 let data = localStorage.getItem('task')
 if(data){
  setTaskItems(JSON.parse(data))
 }
}, [ ])

useEffect(() =>{
  localStorage.setItem('task', JSON.stringify(taskItems))
}, [ taskItems ])

  return (
    <>
      <ItemsIngresoDatos createNewTask={createNewTask}/>
      <Tabla registros={taskItems}/>
    </>
  )
}

export default App
