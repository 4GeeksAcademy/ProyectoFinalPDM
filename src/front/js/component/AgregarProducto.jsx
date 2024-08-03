import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductForm } from '/workspaces/ProyectoFinalPDM/src/front/js/component/ProductForm.jsx'; // Asegúrate de que el import sea correcto
import '/workspaces/ProyectoFinalPDM/src/front/styles/agregarproducto.css'; // Importa el CSS adaptado

export const AgregarProducto = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
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
    <div className="create-product">
      <div className="form-section-container">
        <div className="form-section">
          <h2 className='center-text'>Agregar Producto</h2>
          <ProductForm 
            addCard={addProduct} 
            cardToEdit={editingProduct} 
            onEditSave={handleSaveProduct} 
          />
        </div>
        <div className="product-list">
          <h2 className='center-text'>Productos</h2>
          <div className="card-container">
            {products.map(product => (
              <div className="card" key={product.id}>
                <img src={product.image} alt={product.title} className="card-image" />
                <div className="card-body">
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-description">{product.description}</p>
                  <p className="card-price">Precio: €{product.price}</p>
                  <div className="button-container">
                    <button onClick={() => handleEditProduct(product)} className="button">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="button delete-button">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="back-button">
        <Link to="/PerfilUsuario">
          <button className="button-back">Regresar al Perfil</button>
        </Link>
      </div>
    </div>
  );
};
