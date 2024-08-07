import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "/workspaces/ProyectoFinalPDM/src/front/styles/serviceform.css"
import { Context } from '../store/appContext';

const ServiceForm = ({ addService, serviceToEdit, onEditSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (serviceToEdit) {
      setTitle(serviceToEdit.title || '');
      setDescription(serviceToEdit.description || '');
      setPrice(serviceToEdit.price || '');
    } else {
      setTitle('');
      setDescription('');
      setPrice('');
    }
  }, [serviceToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price) {
      alert('Por favor completa todos los campos');
      return;
    }
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      alert('Por favor ingresa un precio válido');
      return;
    }
    const serviceData = { title, description, price: numericPrice };

    if (serviceToEdit) {
   
      onEditSave({ ...serviceData, id: serviceToEdit.id });
    } else {
      
     actions.addService(title, price)
    }


    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="button-containerAs">
          <button type="submit" className="button-service">
            {serviceToEdit ? 'Guardar Cambios' : 'Agregar Servicio'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;