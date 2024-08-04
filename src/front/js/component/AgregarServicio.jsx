import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
// import { ServiceForm } from './ServiceForm';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Botones personalizados para el carrusel
const PrevArrow = ({ onClick }) => (
  <button className="slick-prev" onClick={onClick}>
    &lt;
  </button>
);

const NextArrow = ({ onClick }) => (
  <button className="slick-next" onClick={onClick}>
    &gt;
  </button>
);

// Configuración del carrusel
const carouselSettings = (serviceCount) => ({
  infinite: serviceCount > 1,
  slidesToShow: Math.min(serviceCount, 3),
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '20px',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(serviceCount, 2),
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: Math.min(serviceCount, 1),
        slidesToScroll: 1,
      }
    }
  ],
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />
});

export const AgregarServicio = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const addService = (newService) => {
    setServices(prevServices => [...prevServices, newService]);
  };

  const handleSaveService = (updatedService) => {
    setServices(prevServices =>
      prevServices.map(service => (service.id === updatedService.id ? updatedService : service))
    );
    setEditingService(null);
  };

  const handleEditService = (service) => {
    setEditingService(service);
  };

  const handleDeleteService = (id) => {
    setServices(prevServices => prevServices.filter(service => service.id !== id));
    if (editingService && editingService.id === id) {
      setEditingService(null);
    }
  };

  return (
    <div className="containerAs">
      <div className="aAs">
        <h2 className='perfil-titleAs'>Agregar Servicio</h2>
        {/* <ServiceForm 
          addService={addService} 
          serviceToEdit={editingService} 
          onEditSave={handleSaveService} 
        /> */}
      </div>
      <div className="product-listAs">
        <h2 className=''>Servicios</h2>
        <Slider {...carouselSettings(services.length)} className="product-carousel">
          {services.map(service => (
            <div className="cardAs" key={service.id}>
              <div className="card-bodyAs">
                <h3 className="card-titleAs">{service.title}</h3>
                <p className="card-descriptionAs">{service.description}</p>
                <p className="card-priceAs">Precio: €{service.price}</p>
                <div className="button-containerAs">
                  <button onClick={() => handleEditService(service)} className="button edit-button">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteService(service.id)} className="button delete-button">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="back-buttonAs">
        <Link to="/PerfilUsuario">
          <button className="buttonAs button-backAs">Regresar al Perfil</button>
        </Link>
      </div>
    </div>
  );
};