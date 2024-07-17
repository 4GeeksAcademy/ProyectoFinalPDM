import React, { useState } from 'react';
import Card from '/workspaces/ProyectoFinalPDM/src/front/js/component/Card.jsx'; 
import CardForm from '/workspaces/ProyectoFinalPDM/src/front/js/component/CardForm.jsx';

export const SelectProduct = () => {
  const [cards, setCards] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar una card al estado de cards
  const addCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  // Función para agregar un item al carrito
  const addToCart = (item) => {
    const itemInCart = cartItems.find((cartItem) => cartItem.title === item.title);

    if (itemInCart) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Función para calcular el total de la compra
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="app">
      <h1>Mis Cards</h1>
      <CardForm addCard={addCard} />
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            price={card.price}
            onAddToCart={addToCart}
          />
        ))}
      </div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.title} - Cantidad: {item.quantity} - Total: ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
    </div>
  );
}
