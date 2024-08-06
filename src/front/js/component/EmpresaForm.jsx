import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "/workspaces/ProyectoFinalPDM/src/front/styles/EmpresaForm.css";
import { Context } from "../store/appContext";

export const EmpresaForm = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nif, setNif] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [editandoEmpresaId, setEditandoEmpresaId] = useState(null);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editandoEmpresaId) {
      const newCompany = {
        id: editandoEmpresaId,
        name: nombreEmpresa,
        nif
      };
      actions.updateCompany(newCompany);
    } else {
      actions.createCompany(nombreEmpresa, nif);
    }
    setNombreEmpresa('');
    setNif('');
    setSucursal('');
    setEditandoEmpresaId(null);
  };

  const handleEdit = (id) => {
    setEditandoEmpresaId(id);
    const company = store.listCompany.find(dataCompany => dataCompany.id == id);
    setNombreEmpresa(company.name);
    setNif(company.nif);
    setSucursal(company.sucursal);
  };

  const handleDelete = (id) => {
    actions.deleteCompanies(id);
  };

  return (
    <div className="registro">
      <form className="form-section" onSubmit={handleSubmit}>
        <h2 className="title2">{editandoEmpresaId ? 'Editar Empresa' : 'Agregar Empresa'}</h2>
        <div className="form-group">
          <label>Nombre de la Empresa:</label>
          <input
            type="text"
            name="nombreEmpresa"
            value={nombreEmpresa}
            onChange={(e) => setNombreEmpresa(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>NIF:</label>
          <input
            type="text"
            name="nif"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Sucursal:</label>
          <select
            name="sucursal"
            value={sucursal}
            onChange={(e) => setSucursal(e.target.value)}
          >
            <option value="">Selecciona una sucursal</option>
            <option value="Sucursal A">Sucursal A</option>
            <option value="Sucursal B">Sucursal B</option>
            <option value="Sucursal C">Sucursal C</option>
          </select>
        </div>
        <div className="button-container">
          <button type="submit" className="create-company">
            {editandoEmpresaId ? 'Guardar Cambios' : 'Crear Empresa'}
          </button>
          <Link to="/PerfilUsuario">
            <button type="button" className="button buttonB">Cancelar</button>
          </Link>
        </div>
      </form>
      <div className="empresa-list">
        <h2 className="title2">Lista de Empresas</h2>
        <ul>
          {store.listCompany.map((empresa) => (
            <li key={empresa.id}>
              {empresa.name} - {empresa.nif}
              <div>
                <button onClick={() => handleEdit(empresa.id)} className="button edit-button">Editar</button>
                <button onClick={() => handleDelete(empresa.id)} className="button delete-button">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to="/PerfilUsuario">
          <button className="button button-back">Regresar al Perfil</button>
        </Link>
      </div>
    </div>
  );
};
