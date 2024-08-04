import React from 'react';
import { Link } from 'react-router-dom';
import logo from "/workspaces/ProyectoFinalPDM/src/front/img/logo.png"
import "/workspaces/ProyectoFinalPDM/src/front/styles/navbar.css"

export const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className='image-container'>
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div>
        <Link to="/Login">
          <button className="buttonN">Login</button>
        </Link>
        <Link to="/Register">
          <button className="buttonN ms-2">Register</button>
        </Link>
      </div>
    </nav>
  );
};



{/* 
<Link to={"/RegisterDate"}>
<		button> RegisterDate </button>
</Link>
<Link to={"/CreateService"}>
<button className="ms-3 me-3"> CreateService </button>
</Link>
<Link to={"/"}>
<button className="ms-3 me-3"> Home </button>
</Link>
<Link to={"/Message"}>
<button className="ms-3 me-3"> Message </button>
</Link>
<Link to={"/PerfilUsuario"}>
<button> Perfil Usuario</button>
</Link>
<Link to={"/AgendarCita"}>
<button className="ms-3 me-3"> Agendar Cita</button>
</Link>
<Link to={"/Agenda"}>
<button className="ms-3 me-3"> Agenda</button>
</Link> */}

