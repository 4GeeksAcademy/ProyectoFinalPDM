import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/workspaces/ProyectoFinalPDM/src/front/styles/agendarCitas.css';  // Asegúrate de crear este archivo CSS

const mockProducts = [
  { id: 1, title: "Producto 1", description: "Descripción del producto 1", price: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-leZ2_Oj0jLsQ3c0Zl9kiPDCaNQuGXT06pw&s" },
  { id: 2, title: "Producto 2", description: "Descripción del producto 2", price: 20, image: "https://files.merca20.com/uploads/2016/03/marcas-blancas.jpg" },
  // Agrega más productos según sea necesario
];

const mockServices = [
  { id: 1, title: "Servicio 1", description: "Descripción del servicio 1", price: 30 },
  { id: 2, title: "Servicio 2", description: "Descripción del servicio 2", price: 40 },
  // Agrega más servicios según sea necesario
];

export const AgendarCita = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id && cartItem.type === item.type);
      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id, type) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === id && cartItem.type === type);
      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        if (newCart[existingItemIndex].quantity > 1) {
          newCart[existingItemIndex].quantity -= 1;
        } else {
          newCart.splice(existingItemIndex, 1);
        }
        return newCart;
      }
      return prevCart;
    });
  };

  const deleteFromCart = (id, type) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id || item.type !== type));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="agendar-cita">
      <div className="product-list">
        <h2 className='centrar_texto'>Productos</h2>
        <div className="card-container">
          {mockProducts.map(product => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.title} className="card-image" />
              <div className="card-body">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-description">{product.description}</p>
                <p className="card-price">Precio: €{product.price}</p>
                <button onClick={() => addToCart({ ...product, type: 'product' })} className="button add-to-cart">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="service-list">
        <h2 className='centrar_texto'>Servicios</h2>
        <div className="card-container">
          {mockServices.map(service => (
            <div className="card" key={service.id}>
              <div className="card-body">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                <p className="card-price">Precio: €{service.price}</p>
                <button onClick={() => addToCart({ ...service, type: 'service' })} className="button add-to-cart">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart">
        <h2 className='centrar_texto'>Carrito de Compras</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Producto/Servicio</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Precio Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={`${item.type}-${item.id}`}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>€{item.price}</td>
                <td>€{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => addToCart(item)} className="button">+</button>
                  <button onClick={() => removeFromCart(item.id, item.type)} className="button">-</button>
                  <button onClick={() => deleteFromCart(item.id, item.type)} className="button delete-from-cart">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-total">
          <h3>Total: €{calculateTotal().toFixed(2)}</h3>
        </div>
      </div>

      <div className="back-button">
        <Link to="/PerfilUsuario">
          <button className="btn btn-primary">Continuar</button>
        </Link>
      </div>
    </div>
  );
};
