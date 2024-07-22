import React, { useState } from 'react';

export const ProductForm = ({ addCard }) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

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
    addCard({ image, title, description, price: numericPrice });
    setImage('');
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
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
      <button type="submit" className="button1">Agregar Card</button>
    </form>
  );
};

