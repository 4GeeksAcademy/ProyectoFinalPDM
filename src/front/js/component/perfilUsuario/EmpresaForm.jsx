import React from 'react';
import "/workspaces/ProyectoFinalPDM/src/front/styles/perfilUsuario.css";
import { Link } from 'react-router-dom';

export const EmpresaForm = () => {
  return (
    <div className="registro">
      <h2>Crear Empresa</h2>
      <form>
        <div className="form-group">
          <label>Nombre de la Empresa:</label>
          <input type="text" name="nombreEmpresa" />
        </div>
        <div className="form-group">
          <label>NIF:</label>
          <input type="text" name="nif" />
        </div>
        <div className="form-group">
          <label>Sucursal:</label>
          <select name="sucursal">
            <option value="">Selecciona una sucursal</option>
            {/* luego agregar las sucursales disponibles */}
          </select>
        </div>
        <div className="button-container">
          <button type="submit" className="button">Crear Empresa</button>
          <Link to="/PerfilUsuario">
            <button type="button" className="button">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
