import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '/workspaces/ProyectoFinalPDM/src/front/styles/login.css';
import { Context } from "../store/appContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { store, actions } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions.login(password, email)
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2 className='login-title'>Iniciar sesión</h2>
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
          {error && <p className='error-message'>{error}</p>}
          <div className='button-group'>
            <button type="submit" className='btn-submitL'>Iniciar sesión</button>
            <Link to="/" className='btn-cancelL'>Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
