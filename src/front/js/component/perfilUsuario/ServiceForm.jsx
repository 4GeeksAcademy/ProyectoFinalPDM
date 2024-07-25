import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ServiceForm = ({ addService, serviceToEdit, onEditSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

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
      // Update existing service
      onEditSave({ ...serviceData, id: serviceToEdit.id });
    } else {
      // Add new service
      addService({ ...serviceData, id: uuidv4() });
    }

    // Clear form fields
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
        <div className="button-container">
          <button type="submit" className="button1">
            {serviceToEdit ? 'Guardar Cambios' : 'Agregar Servicio'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;