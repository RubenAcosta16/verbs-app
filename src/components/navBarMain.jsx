import moduleName from '../css/nav-bar.css'
import {Link} from 'react-router-dom'
    

const navBarMain = ({children}) => {
    return <div>
        nav

        <header className="topheader">
        <nav className="topnav">
          <a className="nav-back" href="index.html">
            <img src="./past/assets/arrow.svg" alt="" />
          </a>

          <a href="#" className="nav-logo">
            <img
              src="https://static-00.iconduck.com/assets.00/layout-grid-3x3-icon-512x512-1gz5wevr.png"
              alt=""
            />
            <div>Verbos de Ruben</div>
          </a>

          <button className="open-menu" aria-label="Abrir menú">
            <i className="fa-solid fa-bars"></i>
          </button>

          <ul className="menu">
            <button className="close-menu" aria-label="Cerrar menú">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <li className="menu-item">
              <a href="#verbos">Verbos</a>
            </li>
            <li className="menu-item">
              <a href="./contacto.html">Contacto</a>
            </li>

            <li className="menu-item">
              <a href="./about.html">Acerca de</a>
            </li>
            <li className="menu-item">

              {/* <Link to="/past-verbs">Page verbs</Link> */}
              <Link to="/dashboard">Edit Verbs</Link>
            </li>
          </ul>
        </nav>
      </header>



        {children}
    </div>;
}


export default navBarMain;