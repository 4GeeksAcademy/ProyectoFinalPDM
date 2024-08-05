import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/workspaces/ProyectoFinalPDM/src/front/styles/register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setError('');

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccessMessage(result.msg);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Registration Error:', error);
      setError('No se pudo registrar el usuario. Inténtalo de nuevo.');
    }
  };

  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2 className='register-title'>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className='error-message'>{error}</p>}
          {successMessage && <p className='success-message'>{successMessage}</p>}
          <div className='input-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Contraseña:</label>
            <input
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor='confirmPassword'>Confirmar Contraseña:</label>
            <input
              type="password"
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className='button-group'>
            <button type="submit" className='btn-submit'>Registrar</button>
            <Link to="/" className='btn-cancel'>Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
