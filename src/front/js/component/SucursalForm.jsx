import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '/workspaces/ProyectoFinalPDM/src/front/styles/sucursalform.css'; // Asegúrate de que este archivo de estilos esté correctamente importado

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
    <div className='sucursal-container'>
      <div className="sucursal-form-containerS">
        <h2 className='sucursal-title text-center'>{editandoSucursalId ? 'Editar Sucursal' : 'Crear Sucursal'}</h2>
        <form onSubmit={handleSubmit} className="sucursal-form">
          <div className="form-group">
            <label>Nombre de la Sucursal:</label>
            <input
              type="text"
              value={nombreSucursal}
              onChange={(e) => setNombreSucursal(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="button submit-button">
              {editandoSucursalId ? 'Guardar Cambios' : 'Crear Sucursal'}
            </button>
            <Link to="/PerfilUsuario">
              <button type="button" className="button cancel-button">Cancelar</button>
            </Link>
          </div>
        </form>
        <div className="sucursal-list">
          <h2 className='text-center sucursal-title2'>Lista de Sucursales</h2>
          <ul>
            {sucursales.map((sucursal) => (
              <li key={sucursal.id} className="sucursal-item">
                {sucursal.nombre} - {sucursal.direccion} - {sucursal.telefono}
                <div className="sucursal-actions">
                  <button onClick={() => handleEdit(sucursal.id)} className="button edit-button">Editar</button>
                  <button onClick={() => handleDelete(sucursal.id)} className="button delete-button">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
