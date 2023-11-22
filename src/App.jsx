import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tabla from './components/tabla'
import ItemsIngresoDatos from './components/ingresoDatos'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      
      <ItemsIngresoDatos/>
      <Tabla/>
      
    </>
  )
}

export default App
