import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('');
  const [serviceArea, setServiceArea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      phone,
      branch,
      serviceArea,
    };
    console.log('User Registered:', userData);
    alert('Usuario registrado con éxito');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sucursal:</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <option value="" disabled>Seleccione una sucursal</option>
            <option value="sucursal1">Sucursal 1</option>
            <option value="sucursal2">Sucursal 2</option>
          </select>
        </div>
        <div>
          <label>Área de Servicio:</label>
          <select
            value={serviceArea}
            onChange={(e) => setServiceArea(e.target.value)}
            required
          >
            <option value="" disabled>Seleccione un área de servicio</option>
            <option value="servicio1">Servicio 1</option>
            <option value="servicio2">Servicio 2</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
        <Link to="/">
          <button type="button">Cancelar</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
