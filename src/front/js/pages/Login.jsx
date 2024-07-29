import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'password') {
      alert('Inicio de sesión exitoso');
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group-login'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className='form-group-login'>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        {error && <p className='error'>{error}</p>}
        <div className='button-container-login'>
          <button type="submit" className='button'>Login</button>
          <Link to="/">
            <button type="button" className='button'>Cancelar</button>
          </Link>
        </div>
      </form>
    </div>

  );
};

export default Login;
