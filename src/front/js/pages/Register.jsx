import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/workspaces/ProyectoFinalPDM/src/front/styles/register.css'; // Asegúrate de tener este archivo CSS

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    const userData = {
      name,
      lastname,
      email,
      password,
    };
    console.log('User Registered:', userData);
    alert('Usuario registrado con éxito');
  };

  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2 className='register-title'>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
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
