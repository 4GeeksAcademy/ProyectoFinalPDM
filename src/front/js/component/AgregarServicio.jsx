import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceForm from '/workspaces/ProyectoFinalPDM/src/front/js/component/ServiceForm.jsx';
import "/workspaces/ProyectoFinalPDM/src/front/styles/agregarproducto.css"

export const AgregarServicio = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const addService = (newService) => {
    setServices(prevServices => [...prevServices, newService]);
  };

  const handleSaveService = (updatedService) => {
    setServices(prevServices =>
      prevServices.map(service => (service.id === updatedService.id ? updatedService : service))
    );
    setEditingService(null);
  };

  const handleEditService = (service) => {
    setEditingService(service);
  };

  const handleDeleteService = (id) => {
    setServices(prevServices => prevServices.filter(service => service.id !== id));
    if (editingService && editingService.id === id) {
      setEditingService(null);
    }
  };

  return (
    <div className="agregar-servicio">
      <div className="form-section-container">
        <div className="form-section">
          <h2 className='centrar_texto'>Agregar Servicio</h2>
          <ServiceForm 
            addService={addService} 
            serviceToEdit={editingService} 
            onEditSave={handleSaveService} 
          />
        </div>
      </div>
      <div className="service-list">
        <h2 className='centrar_texto'>Servicios</h2>
        <div className="card-container">
          {services.map(service => (
            <div className="card" key={service.id}>
              <div className="card-body">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                <p className="card-price">Precio: €{service.price}</p>
                <div className="button-container">
                  <button onClick={() => handleEditService(service)} className="button">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteService(service.id)} className="button delete-button">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="back-button">
        <Link to="/PerfilUsuario">
          <button className="button-service">Regresar al Perfil</button>
        </Link>
      </div>
    </div>
  );
};
