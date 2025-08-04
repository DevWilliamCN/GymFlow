import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Usuario registrado');
      } else {
        alert(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error('Error al registrar', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <h2>Registro</h2>
      <input
        name="username"
        className="form-control my-2"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="password"
        type="password"
        className="form-control my-2"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-success" type="submit">Registrar</button>
    </form>
  );
};

export default Register;
