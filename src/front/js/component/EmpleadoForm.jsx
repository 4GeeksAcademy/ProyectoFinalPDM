import React, { useState, useEffect } from 'react';
import "/workspaces/ProyectoFinalPDM/src/front/styles/EmpleadoForm.css";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const EmpleadoForm = () => {
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [apellidoEmpleado, setApellidoEmpleado] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSalida, setHorarioSalida] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [editandoEmpleadoId, setEditandoEmpleadoId] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/empleados');
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Error fetching empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  useEffect(() => {
    if (editandoEmpleadoId) {
      const empleado = empleados.find(emp => emp.id === editandoEmpleadoId);
      if (empleado) {
        setNombreEmpleado(empleado.nombre);
        setApellidoEmpleado(empleado.apellido);
        setHorarioEntrada(empleado.horarioEntrada);
        setHorarioSalida(empleado.horarioSalida);
      }
    } else {
      setNombreEmpleado('');
      setApellidoEmpleado('');
      setHorarioEntrada('');
      setHorarioSalida('');
    }
  }, [editandoEmpleadoId, empleados]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreEmpleado || !apellidoEmpleado || !horarioEntrada || !horarioSalida) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevoEmpleado = {
      nombre: nombreEmpleado,
      apellido: apellidoEmpleado,
      horarioEntrada,
      horarioSalida
    };

    try {
      if (editandoEmpleadoId) {
        await fetch(`http://localhost:5000/api/empleados/${editandoEmpleadoId}`, { 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoEmpleado),
        });
        setEmpleados(prevEmpleados =>
          prevEmpleados.map(emp => emp.id === editandoEmpleadoId ? { ...emp, ...nuevoEmpleado } : emp)
        );
        setEditandoEmpleadoId(null);
      } else {
        const response = await fetch('http://localhost:5000/api/empleados', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoEmpleado),
        });
        const addedEmpleado = await response.json();
        setEmpleados(prevEmpleados => [...prevEmpleados, addedEmpleado]);
      }

      setNombreEmpleado('');
      setApellidoEmpleado('');
      setHorarioEntrada('');
      setHorarioSalida('');
    } catch (error) {
      console.error('Error saving empleado:', error);
    }
  };

  const handleEdit = (id) => {
    setEditandoEmpleadoId(id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/empleados/${id}`, { 
        method: 'DELETE',
      });
      setEmpleados(prevEmpleados => prevEmpleados.filter(emp => emp.id !== id));
      if (editandoEmpleadoId === id) {
        setEditandoEmpleadoId(null);
      }
    } catch (error) {
      console.error('Error deleting empleado:', error);
    }
  };

  return (
    <div className="registro">
      <div className="form-section">
        <h2 className='title2'>{editandoEmpleadoId ? 'Editar Empleado' : 'Crear Empleado'}</h2>
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
            <button type="submit" className="button button-create">
              {editandoEmpleadoId ? 'Guardar Cambios' : 'Crear Empleado'}
            </button>
            <Link to="/PerfilUsuario">
              <button type="button" className="button back-button">Cancelar</button>
            </Link>
          </div>
        </form>
      </div>
      <div className="empleado-list">
        <h2>Lista de Empleados</h2>
        <ul>
          {empleados.map((empleado) => (
            <li key={empleado.id}>
              {empleado.nombre} {empleado.apellido} - {empleado.horarioEntrada} a {empleado.horarioSalida}
              <div className="button-container">
                <button onClick={() => handleEdit(empleado.id)} className="button">Editar</button>
                <button onClick={() => handleDelete(empleado.id)} className="button">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to="/PerfilUsuario">
          <button className="button button-back">Regresar al Perfil</button>
        </Link>
      </div>
    </div>
  );
};
