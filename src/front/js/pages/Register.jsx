import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '/workspaces/ProyectoFinalPDM/src/front/styles/register.css';
import { Context } from "../store/appContext";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { store, actions } = useContext(Context);

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
    actions.register(password, email)
          setEmail('');
					setPassword('');
					setConfirmPassword('');
          setError('');

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
