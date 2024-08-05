import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ServiceForm from '/workspaces/ProyectoFinalPDM/src/front/js/component/ServiceForm.jsx';
import '/workspaces/ProyectoFinalPDM/src/front/styles/agregarservicio.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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

  // Cargar servicios desde la API al montar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const addService = async (newService) => {
    try {
      const response = await fetch('http://localhost:5000/api/services', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });
      const addedService = await response.json();
      setServices(prevServices => [...prevServices, addedService]);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleSaveService = async (updatedService) => {
    try {
      const response = await fetch(`http://localhost:5000/api/services/${updatedService.id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });
      const updated = await response.json();
      setServices(prevServices =>
        prevServices.map(service => (service.id === updated.id ? updated : service))
      );
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
  };

  const handleDeleteService = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
      });
      setServices(prevServices => prevServices.filter(service => service.id !== id));
      if (editingService && editingService.id === id) {
        setEditingService(null);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="containerAs">
      <div className="aAs">
        <h2 className='perfil-titleAs'>Agregar Servicio</h2>
        <ServiceForm 
          addService={addService} 
          serviceToEdit={editingService} 
          onEditSave={handleSaveService} 
        />
      </div>
      <div className="service-listAs">
        <h2>Servicios</h2>
        <Slider {...carouselSettings(services.length)} className="service-carousel">
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
