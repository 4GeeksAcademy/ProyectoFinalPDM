import React, { useState } from 'react';
import { ProductForm } from '/workspaces/ProyectoFinalPDM/src/front/js/component/ProductForm.jsx';
import ServiceForm from '/workspaces/ProyectoFinalPDM/src/front/js/component/ServiceForm.jsx';

export const CreateService = () => {
    const [cards, setCards] = useState([]);
    const [services, setServices] = useState([]);

    const addCard = (newCard) => {
        console.log('Adding card:', newCard);
        setCards((prevCards) => [...prevCards, newCard]);
    };

    const addService = (newService) => {
        console.log('Adding service:', newService);
        setServices((prevServices) => [...prevServices, newService]);
    };

    const renderCard = (card) => (
        <div className="card" key={card.title}>
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-body">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <p className="card-price">Precio: €{card.price}</p>
            </div>
        </div>
    );

    const renderService = (service) => (
        <div className="card" key={service.title}>
            <div className="card-body">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                <p className="card-price">Precio: €{service.price}</p>
            </div>
        </div>
    );

    return (
        <div className="create-service">
            <div className="form-section-container">
                <div className="form-section">
                    <h2 className='centrar_texto'>Agregar Producto</h2>
                    <ProductForm addCard={addCard} />
                </div>
                <div className="form-section">
                    <h2 className='centrar_texto'>Agregar Servicio</h2>
                    <ServiceForm addService={addService} />
                </div>
            </div>
            <div className="product-list">
                <h2 className='centrar_texto'>Productos</h2>
                <div className="card-container">
                    {cards.map(renderCard)}
                </div>
            </div>
            <div className="service-list">
                <h2 className='centrar_texto'>Servicios</h2>
                <div className="card-container">
                    {services.map(renderService)}
                </div>
            </div>
        </div>
    );
};
