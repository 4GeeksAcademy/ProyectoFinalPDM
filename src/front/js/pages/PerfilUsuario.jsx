import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaUserTie, FaBuilding, FaBox, FaSignOutAlt } from 'react-icons/fa';
import "/workspaces/ProyectoFinalPDM/src/front/styles/perfilusuario.css";
import { Context } from "../store/appContext";

export const PerfilUsuario = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el estado de autenticación.
    navigate('/');
  };
  // useEffect(()=>{
  //   actions.verifyIdentity()
  // },[])

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Perfil del Usuario</h2>
      <div className="button-grid">
      <Link to="/CrearEmpresa" className="button-link">
          <button className="button-profile">
            <FaPlusCircle className="button-icon" />
            Agregar Empresa
          </button>
        </Link>
        <Link to="/CrearSucursal" className="button-link">
          <button className="button-profile">
            <FaBuilding className="button-icon" />
            Crear Sucursal
          </button>
        </Link>
        <Link to="/AgregarProducto" className="button-link">
          <button className="button-profile">
            <FaBox className="button-icon" />
            Agregar Producto
          </button>
        </Link>
        <Link to="/AgregarServicio" className="button-link">
          <button className="button-profile">
            <FaBox className="button-icon" />
            Agregar Servicio
          </button>
        </Link>
        <Link to="/CrearEmpleado" className="button-link">
          <button className="button-profile">
            <FaUserTie className="button-icon" />
            Crear Empleado
          </button>
        </Link>
        
        <button className="button-profile logout-button-profile" onClick={handleLogout}>
          <FaSignOutAlt className="button-icon" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
