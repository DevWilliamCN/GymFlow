import { useEffect, useState } from 'react';
import { API } from '../utils/axios';
import { toast } from 'react-toastify';
import styles from './components/Login.module.css'; // Reutiliza el CSS unificado que ya tienes

const Dashboard = () => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Obtener datos protegidos del backend
  useEffect(() => {
    const obtenerDatosProtegidos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token no encontrado. Inicia sesión nuevamente.');
        setLoading(false);
        return;
      }

      try {
        const res = await API.get('/auth/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setNombre(res.data.name);

          // ✅ Mostrar mensaje de bienvenida solo si está marcado
          const mostrarBienvenida = localStorage.getItem('mostrarBienvenida');
          if (mostrarBienvenida === 'true') {
            toast.success(`Bienvenido ${res.data.name}, un gusto verte de nuevo.`);
            localStorage.removeItem('mostrarBienvenida');
          }
        } else {
          setError('Error al obtener datos protegidos');
        }
      } catch (err) {
        console.error('Error en la petición protegida:', err);
        setError('Acceso denegado. Token inválido o expirado.');
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosProtegidos();
  }, []);

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      {/* Nombre del usuario arriba a la derecha */}
      {!loading && nombre && (
        <div className={styles.usuarioInfo}>
          👤 {nombre}
        </div>
      )}

      {/* Mostrar errores */}
      {!loading && error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {/* Contenido principal */}
      <h1>Dashboard</h1>
      <p>Aquí irá el contenido del sistema...</p>
    </div>
  );
};

export default Dashboard;
