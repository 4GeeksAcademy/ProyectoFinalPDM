import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '/workspaces/ProyectoFinalPDM/src/front/styles/productform.css'; // Asegúrate de crear este archivo

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
        <h2 className='form-title'>{cardToEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='image'>Imagen URL:</label>
            <input
              type='text'
              id='image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor='title'>Título:</label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor='description'>Descripción:</label>
            <input
              type='text'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor='price'>Precio:</label>
            <input
              type='number'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className='button-group'>
            <button type='submit' className='btn-submit'>
              {cardToEdit ? 'Guardar Cambios' : 'Agregar Producto'}
            </button>
          </div>
        </form>
      </div>
    
  );
};
