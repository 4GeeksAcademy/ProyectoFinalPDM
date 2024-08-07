import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '/workspaces/ProyectoFinalPDM/src/front/styles/sucursalform.css';
import { Context } from "../store/appContext";

export const SucursalForm = () => {
  const [nombreSucursal, setNombreSucursal] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editandoSucursalId, setEditandoSucursalId] = useState(null);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getSucursales();
  }, []);

  useEffect(() => {
    if (editandoSucursalId) {
      const sucursal = store.listSucursales.find(suc => suc.id === editandoSucursalId);
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
  }, [editandoSucursalId, store.listSucursales]);

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
        await actions.updateSucursal(nuevaSucursal);
      } else {
        await actions.createSucursal(nombreSucursal, direccion, telefono);
      }
      setNombreSucursal('');
      setDireccion('');
      setTelefono('');
      setEditandoSucursalId(null);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Hubo un error al procesar la solicitud. Por favor intenta nuevamente.');
    }
  };

  const handleEdit = (id) => {
    setEditandoSucursalId(id);
  };

  const handleDelete = async (id) => {
   actions.deleteSucursales(id);
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
            {store.listSucursales.map((sucursal) => (
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
