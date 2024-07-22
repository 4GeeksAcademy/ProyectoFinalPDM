import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const RegisterDate = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      observaciones: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes agregar la lógica para enviar el formulario
      console.log(formData);
    };
  
    const handleCancel = () => {
      // Reset the form or handle the cancel action
      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        observaciones: "",
      });
    };
  
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Rellene sus datos</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellido">Apellido *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono *</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="observaciones">Notas sobre la cita (opcional)</label>
                    <textarea
                      className="form-control"
                      id="observaciones"
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                      Enviar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Detalles de la Cita</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Servicio:</strong>
                  </li>
                  <li className="list-group-item">
                    <strong>Fecha:</strong>
                  </li>
                  <li className="list-group-item">
                    <strong>Coste:</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };