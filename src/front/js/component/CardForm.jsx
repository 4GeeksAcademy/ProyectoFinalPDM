import React, { useState } from 'react';

const CardForm = ({ addCard }) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica (puedes añadir más validaciones según tus necesidades)
    if (!image || !title || !description || !price) {
      alert('Por favor completa todos los campos');
      return;
    }
    // Llamar a la función para agregar la card con los datos ingresados
    addCard({ image, title, description, price });
    // Limpiar el formulario después de agregar la card
    setImage('');
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <label>
        Imagen URL:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <label>
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Descripción:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Precio:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <button type="submit">Agregar Card</button>
    </form>
  );
}

export default CardForm;
