import { useEffect, useState } from 'react';
import { API } from '../utils/axios';

const Dashboard = () => {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerDatosProtegidos = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Token no encontrado. Inicia sesión nuevamente.');
        return;
      }

      try {
        const res = await API.get('/auth/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setMensaje(res.data.message);
        } else {
          setError('Error al obtener datos protegidos');
        }
      } catch (err) {
        console.error('Error en la petición protegida:', err);
        setError('Acceso denegado. Token inválido o expirado.');
      }
    };

    obtenerDatosProtegidos();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {mensaje && <h2>✅ {mensaje}</h2>}
    </div>
  );
};

export default Dashboard;
