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
    <div className="registro">
      <h2>Perfil del Usuario</h2>
      <div className="button-container">
        <Link to="/CrearSucursal">
          <button className="button">Crear Sucursal</button>
        </Link>
        <Link to="/CreateService">
          <button className="button">Crear Producto/Servicio</button>
        </Link>
        <Link to="/CrearEmpleado">
          <button className="button">Crear Empleado</button>
        </Link>
        <Link to="/CrearEmpresa">
          <button className="button">Crear Empresa</button>
        </Link>
        <button className="button logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};
