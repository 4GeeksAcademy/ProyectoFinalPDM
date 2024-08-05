import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '/workspaces/ProyectoFinalPDM/src/front/styles/registerdate.css'; 

export const RegisterDate = () => {
  const { store, actions } = useContext(Context);

  const [form, setForm] = useState({
    nombre: "", 
    apellido: "",
    telefono: "", 
    email: "",
    observaciones: "",
    fecha: ""
  });

  const [citaDetails, setCitaDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Error en el envío del formulario');
      }
      const data = await response.json();
      setCitaDetails(data); 
      console.log('Cita registrada:', data);
    } catch (error) {
      console.error('Error al registrar la cita:', error);
    }
  };

  return (
    <div className="registerdate-container">
      <div className="registerdate-box">
        <h2 className="registerdate-title">Formulario de Cita</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="fecha">Fecha de la Cita</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              min="2024-01-01"
              max="2025-12-31"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-submit">Enviar</button>
            <Link to={"/"} className="btn-cancel">Cancelar</Link>
          </div>
        </form>
      </div>
      {citaDetails && (
        <div className="card-container">
          <div className="card">
            <div className="card-body">
              <h3>Detalles de la Cita</h3> 
              <p className="card-text">Fecha: {citaDetails.fecha}</p>
              <p className="card-text">Nombre: {citaDetails.nombre} {citaDetails.apellido}</p>
              <p className="card-text">Teléfono: {citaDetails.telefono}</p>
              <p className="card-text">Email: {citaDetails.email}</p>
              <p className="card-text">Observaciones: {citaDetails.observaciones}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
