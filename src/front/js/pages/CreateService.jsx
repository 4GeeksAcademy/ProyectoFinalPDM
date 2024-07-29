import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductForm } from '../component/perfilUsuario/ProductForm.jsx';
import ServiceForm from '../component/perfilUsuario/ServiceForm.jsx';

export const CreateService = () => {
  const [cards, setCards] = useState([]);
  const [services, setServices] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const addCard = (newCard) => {
    setCards(prevCards => [...prevCards, newCard]);
  };

  const addService = (newService) => {
    setServices(prevServices => [...prevServices, newService]);
  };

  const handleSaveCard = (updatedCard) => {
    setCards(prevCards =>
      prevCards.map(card => (card.id === updatedCard.id ? updatedCard : card))
    );
    setEditingCard(null);
  };

  const handleSaveService = (updatedService) => {
    setServices(prevServices =>
      prevServices.map(service => (service.id === updatedService.id ? updatedService : service))
    );
    setEditingService(null);
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
  };

  const handleEditService = (service) => {
    setEditingService(service);
  };

  const handleDeleteCard = (id) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
    if (editingCard && editingCard.id === id) {
      setEditingCard(null);
    }
  };

  const handleDeleteService = (id) => {
    setServices(prevServices => prevServices.filter(service => service.id !== id));
    if (editingService && editingService.id === id) {
      setEditingService(null);
    }
  };

  return (
    <div className="create-service">
      <div className="form-section-container">
        <div className="form-section">
          <h2 className='centrar_texto'>Agregar Producto</h2>
          <ProductForm 
            addCard={addCard} 
            cardToEdit={editingCard} 
            onEditSave={handleSaveCard} 
          />
        </div>
        <div className="form-section">
          <h2 className='centrar_texto'>Agregar Servicio</h2>
          <ServiceForm 
            addService={addService} 
            serviceToEdit={editingService} 
            onEditSave={handleSaveService} 
          />
        </div>
      </div>
      <div className="product-list">
        <h2 className='centrar_texto'>Productos</h2>
        <div className="card-container">
          {cards.map(card => (
            <div className="card" key={card.id}>
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-body">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <p className="card-price">Precio: €{card.price}</p>
                <div className="button-container">
                  <button onClick={() => handleEditCard(card)} className="button">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteCard(card.id)} className="button delete-button">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
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
