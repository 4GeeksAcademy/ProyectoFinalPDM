import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "/workspaces/ProyectoFinalPDM/src/front/styles/EmpresaForm.css";

export const EmpresaForm = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nif, setNif] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [empresas, setEmpresas] = useState([]);
  const [editandoEmpresaId, setEditandoEmpresaId] = useState(null);

  useEffect(() => {
    if (editandoEmpresaId) {
      const empresa = empresas.find(emp => emp.id === editandoEmpresaId);
      if (empresa) {
        setNombreEmpresa(empresa.nombre);
        setNif(empresa.nif);
        setSucursal(empresa.sucursal);
      }
    } else {
      setNombreEmpresa('');
      setNif('');
      setSucursal('');
    }
  }, [editandoEmpresaId, empresas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombreEmpresa || !nif || !sucursal) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevaEmpresa = {
      id: editandoEmpresaId || uuidv4(),
      nombre: nombreEmpresa,
      nif,
      sucursal
    };

    if (editandoEmpresaId) {
      setEmpresas(empresas.map(emp => emp.id === editandoEmpresaId ? nuevaEmpresa : emp));
      setEditandoEmpresaId(null);
    } else {
      setEmpresas([...empresas, nuevaEmpresa]);
    }

    setNombreEmpresa('');
    setNif('');
    setSucursal('');
  };

  const handleEdit = (id) => {
    setEditandoEmpresaId(id);
  };

  const handleDelete = (id) => {
    setEmpresas(empresas.filter(emp => emp.id !== id));
    if (editandoEmpresaId === id) {
      setEditandoEmpresaId(null);
    }
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
            required
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
          {empresas.map((empresa) => (
            <li key={empresa.id}>
              {empresa.nombre} - {empresa.nif} - {empresa.sucursal}
              <button onClick={() => handleEdit(empresa.id)} className="button">Editar</button>
              <button onClick={() => handleDelete(empresa.id)} className="button">Eliminar</button>
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