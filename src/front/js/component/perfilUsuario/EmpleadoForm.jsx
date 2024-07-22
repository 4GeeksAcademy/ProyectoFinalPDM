import React, { useState } from 'react';
import "/workspaces/ProyectoFinalPDM/src/front/styles/perfilUsuario.css";
import { Link } from 'react-router-dom';

export const EmpleadoForm = () => {
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [apellidoEmpleado, setApellidoEmpleado] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSalida, setHorarioSalida] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log(`Empleado ${nombreEmpleado} ${apellidoEmpleado} trabaja de ${horarioEntrada} a ${horarioSalida}`);
  };

  return (
    <div className="registro">
      <h2>Crear Empleado</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombreEmpleado"
            value={nombreEmpleado}
            onChange={(e) => setNombreEmpleado(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellidoEmpleado"
            value={apellidoEmpleado}
            onChange={(e) => setApellidoEmpleado(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Horario de Entrada:</label>
          <input
            type="time"
            name="horarioEntrada"
            value={horarioEntrada}
            onChange={(e) => setHorarioEntrada(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Horario de Salida:</label>
          <input
            type="time"
            name="horarioSalida"
            value={horarioSalida}
            onChange={(e) => setHorarioSalida(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="button">Crear Empleado</button>
          <Link to="/PerfilUsuario">
            <button type="button" className="button">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
