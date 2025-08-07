import { useEffect, useState } from 'react';
import { API } from '../utils/axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Obtener datos protegidos
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
          setNombre(res.data.name); // 👈 Guardamos el nombre
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

  // ✅ Mostrar mensaje de bienvenida después de tener el nombre
  useEffect(() => {
    const mostrarBienvenida = localStorage.getItem('mostrarBienvenida');
    if (nombre && mostrarBienvenida === 'true') {
      toast.success(`Bienvenido ${nombre}, un gusto verte de nuevo.`);
      localStorage.removeItem('mostrarBienvenida');
    }
  }, [nombre]);

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      {/* Nombre arriba a la derecha */}
      {!loading && nombre && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1.5rem',
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#444',
            backgroundColor: '#f3f3f3',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          👤 {nombre}
        </div>
      )}

      {/* Error */}
      {!loading && error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {/* Contenido */}
      <h1>Dashboard</h1>
      <p>Aquí irá el contenido del sistema...</p>
    </div>
  );
};

export default Dashboard;
