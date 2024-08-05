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
    // Fetch inicial de sucursales
    const fetchSucursales = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sucursales');
        if (!response.ok) throw new Error('Error al obtener sucursales');
        const data = await response.json();
        setSucursales(data);
      } catch (error) {
        console.error('Error al obtener sucursales:', error);
      }
    };

    fetchSucursales();
  }, []);

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

  const handleSubmit = async (e) => {
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

    try {
      if (editandoSucursalId) {
        // Actualizar sucursal existente
        const response = await fetch(`http://localhost:5000/api/sucursales/${editandoSucursalId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevaSucursal),
        });
        if (!response.ok) throw new Error('Error al actualizar sucursal');
        const data = await response.json();
        setSucursales(sucursales.map(suc => suc.id === editandoSucursalId ? data : suc));
      } else {
        // Crear nueva sucursal
        const response = await fetch('http://localhost:5000/api/sucursales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevaSucursal),
        });
        if (!response.ok) throw new Error('Error al crear sucursal');
        const data = await response.json();
        setSucursales([...sucursales, data]);
      }

      setNombreSucursal('');
      setDireccion('');
      setTelefono('');
      setEditandoSucursalId(null);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleEdit = (id) => {
    setEditandoSucursalId(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sucursales/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar sucursal');
      setSucursales(sucursales.filter(suc => suc.id !== id));
      if (editandoSucursalId === id) {
        setEditandoSucursalId(null);
      }
    } catch (error) {
      console.error('Error al eliminar sucursal:', error);
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
              <button type="button" className="button buttonB">Cancelar</button>
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
      <div className='button-b'>
        <Link to="/PerfilUsuario">
          <button className="button button-back">Regresar al Perfil</button>
        </Link>
      </div>
    </div>
  );
};
