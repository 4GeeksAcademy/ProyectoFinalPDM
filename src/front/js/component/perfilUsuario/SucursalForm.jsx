import React from 'react';
import "/workspaces/ProyectoFinalPDM/src/front/styles/perfilUsuario.css";
import { Link } from 'react-router-dom';

export const SucursalForm = () => {
  return (
    <div className="registro">
      <h2>Crear Sucursal</h2>
      <form>
        <div className="form-group">
          <label>Nombre de la Sucursal:</label>
          <input type="text" name="nombreSucursal" />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input type="text" name="direccion" />
        </div>
        <div className="form-group">
          <label>Telefono:</label>
          <input type="text" name="telefono" />
        </div>
        <div className="button-container">
          <button type="submit" className="button">Crear Sucursal</button>
          <Link to="/PerfilUsuario">
            <button type="button" className="button">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
