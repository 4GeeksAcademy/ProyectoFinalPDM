import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaUserTie, FaBuilding, FaBox, FaSignOutAlt } from 'react-icons/fa';
import "/workspaces/ProyectoFinalPDM/src/front/styles/perfilusuario.css";
import { Context } from "../store/appContext";

export const PerfilUsuario = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [empresaCreada, setEmpresaCreada] = useState(false);

  useEffect(() => {
    if (store.empresas && store.empresas.length > 0) {
      setEmpresaCreada(true);
    }
  }, [store.empresas]);

  const handleLogout = () => {
    navigate('/');
  };

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
          <button
            className={`button-profile ${!empresaCreada ? 'button-disabled' : ''}`}
            disabled={!empresaCreada}
          >
            <FaBuilding className="button-icon" />
            Crear Sucursal
          </button>
        </Link>
        <Link to="/AgregarProducto" className="button-link">
          <button
            className={`button-profile ${!empresaCreada ? 'button-disabled' : ''}`}
            disabled={!empresaCreada}
          >
            <FaBox className="button-icon" />
            Agregar Producto
          </button>
        </Link>
        <Link to="/AgregarServicio" className="button-link">
          <button
            className={`button-profile ${!empresaCreada ? 'button-disabled' : ''}`}
            disabled={!empresaCreada}
          >
            <FaBox className="button-icon" />
            Agregar Servicio
          </button>
        </Link>
        <Link to="/CrearEmpleado" className="button-link">
          <button
            className={`button-profile ${!empresaCreada ? 'button-disabled' : ''}`}
            disabled={!empresaCreada}
          >
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
