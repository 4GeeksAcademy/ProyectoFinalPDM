import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío del formulario
    console.log(form);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Formulario de Cita</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                id="telefono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                className="form-control"
                id="observaciones"
                name="observaciones"
                value={form.observaciones}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha de la Cita</label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                min="2024-01-01"
                max="2025-12-31"
                required
              />
            </div>
            <Link to={"/Message"}>
              <button type="submit" className="ms-3 me-3">Enviar</button>
            </Link>
          </form>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1>Detalles de la Cita</h1> 
              <p className="card-text">Fecha: {form.fecha}</p>
              <p className="card-text">Servicio:</p>
              <p className="card-text">Total a pagar:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};