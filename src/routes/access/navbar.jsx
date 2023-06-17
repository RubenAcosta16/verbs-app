import { Link } from "react-router-dom";
import { useRef } from "react";

import LogoutIcon from "./css/logout_icon_151219.svg";
import "./css/navbar.css"

const navbar = ({ children }) => {
  const menuRef = useRef(null)
  // const closeMenuRef = useRef(null)
  // const openMenuRef = useRef(null)

  // const menu = document.querySelector(".menu");

  // const openMenu = document.querySelector(".open-menu");
  // const closeMenu = document.querySelector(".close-menu");

  // openMenu.addEventListener("click", menuToggle);
  // closeMenu.addEventListener("click", menuToggle);

  function menuToggle() {
    menuRef.current.classList.toggle("menu_opened");
  }

  // const menuLinks=document.querySelectorAll(".menu a[href^='#']");
  // const menuLinks = document.querySelectorAll(".menu a[href^='#']");

  // menuLinks.forEach((menuLink) => {
  //   menuLink.addEventListener("click", function () {
  //     menu.classList.remove("menu_opened");
  //     console.log("si");
  //   });
  // });


//p-2 border-bottom border-2 border-dark py
  return (
    <div>
      <header className="topheader">
        <nav className="topnav">
          <a className="nav-back" href="index.html">
            {/* <img src={arrow} alt="" /> */}
          </a>
          <Link to="/" className="nav-logo">
          <img
              src="https://static-00.iconduck.com/assets.00/layout-grid-3x3-icon-512x512-1gz5wevr.png"
              alt=""
            />
            <div>Verbos de Ruben</div>
          </Link>


          <button className="open-menu" aria-label="Abrir menú" onClick={menuToggle}>
            <i className="fa-solid fa-bars"></i>
          </button>

          <ul className="menu" ref={menuRef}>
            <button className="close-menu" aria-label="Cerrar menú" onClick={menuToggle}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <li className="menu-item">
            <Link to="/" className="link">Pagina principal</Link>
            </li>
            <li className="menu-item">
            <Link to="/signout" className="link"><i class="fa-solid fa-right-from-bracket"></i> Cerrar sesion</Link>
            </li>


          </ul>
        </nav>
      </header>

      {children}
    </div>
  );
};

export default navbar;
