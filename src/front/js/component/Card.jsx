// Card.js

import React from 'react';

const Card = ({ image, title, description, price, onAddToCart }) => {
  const handleAddToCart = () => {
    // Llamar a la función que maneja la acción de agregar al carrito
    onAddToCart({ title, price });
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <p className="card-price">${price}</p>
        <button onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
}

export default Card;
