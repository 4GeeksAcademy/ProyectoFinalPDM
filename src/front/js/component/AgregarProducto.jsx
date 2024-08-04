import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ProductForm } from '/workspaces/ProyectoFinalPDM/src/front/js/component/ProductForm.jsx';
import '/workspaces/ProyectoFinalPDM/src/front/styles/agregarproducto.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Botones personalizados
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
const carouselSettings = (productCount) => ({
  infinite: productCount > 1,
  slidesToShow: Math.min(productCount, 3),
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '20px',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(productCount, 2),
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: Math.min(productCount, 1),
        slidesToScroll: 1,
      }
    }
  ],
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />
});

export const AgregarProducto = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = (newProduct) => {
    setProducts(prevProducts => {
      if (prevProducts.some(product => product.id === newProduct.id)) {
        return prevProducts;
      }
      return [...prevProducts, newProduct];
    });
  };

  const handleSaveProduct = (updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(product => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    if (editingProduct && editingProduct.id === id) {
      setEditingProduct(null);
    }
  };

  return (
    <div className="containerA">
      <div className='a'>
      <ProductForm
        addCard={addProduct}
        cardToEdit={editingProduct}
        onEditSave={handleSaveProduct}
      />
      </div>
      <div className="product-list">
        <h2>Productos</h2>
        <Slider {...carouselSettings(products.length)} className="product-carousel">
          {products.map(product => (
            <div className="card text-center" key={product.id}>
              <img src={product.image} alt={product.title} className="card-image" />
              <div className="card-body">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-description">{product.description}</p>
                <p className="card-price">Precio: €{product.price}</p>
                <div className="button-container">
                  <button onClick={() => handleEditProduct(product)} className="button edit-button">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="button delete-button">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="back-button">
        <Link to="/PerfilUsuario">
          <button className="button button-back">Regresar al Perfil</button>
        </Link>
      </div>
    </div>
  );
};
