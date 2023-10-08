import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Bienvenido al Sistema de información</h1>
      <p>Selecciona un tipo de busqueda:</p>
      <Link to={"/interna"}>
        <button >Interna</button>
      </Link>
      <Link to={"/externa"}>
      <button>Externa</button>
      </Link>
    </>
  )
}

export default App
