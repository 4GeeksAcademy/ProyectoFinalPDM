import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "/workspaces/ProyectoFinalPDM/src/front/styles/perfilUsuario.css";

export const PerfilUsuario = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el estado de autenticación.
    navigate('/');
  };

  return (
    <div className="registro-profile">
      <h2>Perfil del Usuario</h2>
      <div className="button-container-profile">
        <Link to="/CrearSucursal">
          <button className="button-profile">Crear Sucursal</button>
        </Link>
        <Link to="/CreateService">
          <button className="button-profile">Crear Producto/Servicio</button>
        </Link>
        <Link to="/CrearEmpleado">
          <button className="button-profile">Crear Empleado</button>
        </Link>
        <Link to="/CrearEmpresa">
          <button className="button-profile">Crear Empresa</button>
        </Link>
        <button className="button-profile logout-button-profile" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};
