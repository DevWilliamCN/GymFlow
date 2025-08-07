import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './components/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('mostrarBienvenida', 'true'); // ✅ MARCA PARA DASHBOARD

        toast.success('✅ Inicio de sesión exitoso');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error(`❌ ${data.message || data.error || 'Credenciales inválidas'}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('⚠️ No se pudo conectar con el servidor');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2 className={styles.title}>GymFlow Login 🚀</h2>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Correo</label>
          <div className={styles.inputWrapper}>
            <span className={styles.icon}><FaEnvelope /></span>
            <input
              type="email"
              className={styles.inputField}
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.inputWrapper}>
            <span className={styles.icon}><FaLock /></span>
            <input
              type="password"
              className={styles.inputField}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.button}>Entrar</button>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleLogin}
        >
          Iniciar sesión con Google
        </button>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿No tienes cuenta?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Regístrate
          </span>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Login;

