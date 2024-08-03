import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '/workspaces/ProyectoFinalPDM/src/front/styles/agregarproducto.css'; // Asegúrate de que el import sea correcto

export const ProductForm = ({ addCard, cardToEdit, onEditSave }) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (cardToEdit) {
      setImage(cardToEdit.image || '');
      setTitle(cardToEdit.title || '');
      setDescription(cardToEdit.description || '');
      setPrice(cardToEdit.price || '');
    } else {
      setImage('');
      setTitle('');
      setDescription('');
      setPrice('');
    }
  }, [cardToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !title || !description || !price) {
      alert('Por favor completa todos los campos');
      return;
    }
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      alert('Por favor ingresa un precio válido');
      return;
    }
    const cardData = { image, title, description, price: numericPrice };

    if (cardToEdit) {
      onEditSave({ ...cardData, id: cardToEdit.id });
    } else {
      addCard({ ...cardData, id: uuidv4() });
    }

    setImage('');
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="card-form">
        <div className="form-group">
          <label>Imagen URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
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
          <button type="submit" className="button-product">
            {cardToEdit ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};
