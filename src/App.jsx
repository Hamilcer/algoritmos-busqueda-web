import './App.css'
import { Link } from 'react-router-dom'

function App() {

  function vaciarCookies() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var igual = cookie.indexOf('=');
      var nombre = igual > -1 ? cookie.substr(0, igual) : cookie;
      document.cookie = nombre + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };
  vaciarCookies()


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