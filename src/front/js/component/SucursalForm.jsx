import React, { useState, useEffect } from 'react';
// import "/workspaces/ProyectoFinalPDM/src/front/styles/perfilUsuario.css";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const SucursalForm = () => {
  const [nombreSucursal, setNombreSucursal] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [editandoSucursalId, setEditandoSucursalId] = useState(null);

  useEffect(() => {
    if (editandoSucursalId) {
      const sucursal = sucursales.find(suc => suc.id === editandoSucursalId);
      if (sucursal) {
        setNombreSucursal(sucursal.nombre);
        setDireccion(sucursal.direccion);
        setTelefono(sucursal.telefono);
      }
    } else {
      setNombreSucursal('');
      setDireccion('');
      setTelefono('');
    }
  }, [editandoSucursalId, sucursales]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombreSucursal || !direccion || !telefono) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevaSucursal = {
      id: editandoSucursalId || uuidv4(),
      nombre: nombreSucursal,
      direccion,
      telefono
    };

    if (editandoSucursalId) {
      setSucursales(sucursales.map(suc => suc.id === editandoSucursalId ? nuevaSucursal : suc));
      setEditandoSucursalId(null);
    } else {
      setSucursales([...sucursales, nuevaSucursal]);
    }

    setNombreSucursal('');
    setDireccion('');
    setTelefono('');
  };

  const handleEdit = (id) => {
    setEditandoSucursalId(id);
  };

  const handleDelete = (id) => {
    setSucursales(sucursales.filter(suc => suc.id !== id));
    if (editandoSucursalId === id) {
      setEditandoSucursalId(null);
    }
  };

  return (
    <div className="registro">
      <h2>{editandoSucursalId ? 'Editar Sucursal' : 'Crear Sucursal'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Sucursal:</label>
          <input
            type="text"
            name="nombreSucursal"
            value={nombreSucursal}
            onChange={(e) => setNombreSucursal(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="button">
            {editandoSucursalId ? 'Guardar Cambios' : 'Crear Sucursal'}
          </button>
          <Link to="/PerfilUsuario">
            <button type="button" className="button">Cancelar</button>
          </Link>
        </div>
      </form>
      <div className="sucursal-list">
        <h2>Lista de Sucursales</h2>
        <ul>
          {sucursales.map((sucursal) => (
            <li key={sucursal.id}>
              {sucursal.nombre} - {sucursal.direccion} - {sucursal.telefono}
              <button onClick={() => handleEdit(sucursal.id)} className="button">Editar</button>
              <button onClick={() => handleDelete(sucursal.id)} className="button">Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
