import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ProductForm } from '/workspaces/ProyectoFinalPDM/src/front/js/component/ProductForm.jsx';
import '/workspaces/ProyectoFinalPDM/src/front/styles/agregarproducto.css';
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

  // Cargar productos desde la API al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:5000/api/products', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const addedProduct = await response.json();
      setProducts(prevProducts => [...prevProducts, addedProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleSaveProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${updatedProduct.id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      const updated = await response.json();
      setProducts(prevProducts =>
        prevProducts.map(product => (product.id === updated.id ? updated : product))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, { 
        method: 'DELETE',
      });
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      if (editingProduct && editingProduct.id === id) {
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
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
      <div>
        <Link to="/PerfilUsuario">
          <button className="button button-back">Regresar al Perfil</button>
        </Link>
      </div>
    </div>
  );
};
