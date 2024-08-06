import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '/workspaces/ProyectoFinalPDM/src/front/styles/EmpresaForm.css';
import { Context } from "../store/appContext";

export const EmpresaForm = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nif, setNif] = useState('');
  const [sucursal, setSucursal] = useState('');
  // const [empresas, setEmpresas] = useState([]);
  const [editandoEmpresaId, setEditandoEmpresaId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCompanies()
  }, []);

  // useEffect(() => {
  //   if (editandoEmpresaId) {
  //     const empresa = empresas.find(emp => emp.id === editandoEmpresaId);
  //     if (empresa) {
  //       setNombreEmpresa(empresa.nombre);
  //       setNif(empresa.nif);
  //       setSucursal(empresa.sucursal);
  //     }
  //   } else {
  //     setNombreEmpresa('');
  //     setNif('');
  //     setSucursal('');
  //   }
  // }, [editandoEmpresaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    actions.createCompany(nombreEmpresa, nif)

    const nuevaEmpresa = {
      name: nombreEmpresa,
      nif,
      sucursal,
    };

    try {
      if (editandoEmpresaId) {
        await fetch(`http://localhost:5000/api/company/${editandoEmpresaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevaEmpresa),
        });
        setEmpresas(prevEmpresas =>
          prevEmpresas.map(emp => emp.id === editandoEmpresaId ? { ...emp, ...nuevaEmpresa } : emp)
        );
        setEditandoEmpresaId(null);
      } else {
        const response = await fetch(process.env.BACKEND_URL + "/api/company", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevaEmpresa),
        });
        const addedEmpresa = await response.json();
        setEmpresas(prevEmpresas => [...prevEmpresas, addedEmpresa]);
      }

      setNombreEmpresa('');
      setNif('');
      setSucursal('');
    } catch (error) {
      console.error('Error saving empresa:', error);
    }

    // Mostrar el modal para preguntar si desea agregar una sucursal
    setShowModal(true);
  };


  const handleEdit = (id) => {
    setEditandoEmpresaId(id);
    const company = store.listCompany.find(dataCompany => dataCompany.id == id)
    setNombreEmpresa(company.name);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(process.env.BACKEND_URL + `/api/company/"${id}`, {
        method: 'DELETE',
      });
      setEmpresas(prevEmpresas => prevEmpresas.filter(emp => emp.id !== id));
      if (editandoEmpresaId === id) {
        setEditandoEmpresaId(null);
      }
    } catch (error) {
      console.error('Error deleting empresa:', error);
    }
  };

  const handleModalResponse = (response) => {
    setShowModal(false);
    if (response === 'yes') {
      navigate('/CrearSucursal');
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
              {empresa.name} - {empresa.id}
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

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Desea agregar una sucursal?</h3>
            <div className="modal-buttons">
              <button
                className="modal-button yes"
                onClick={() => handleModalResponse('yes')}
              >
                Sí
              </button>
              <button
                className="modal-button no"
                onClick={() => handleModalResponse('no')}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
