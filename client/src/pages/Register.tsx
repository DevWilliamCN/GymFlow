import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils/axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './components/Register.css';

registerLocale('es', es);

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateOfBirth) {
      toast.error('⚠️ Por favor seleccione su fecha de nacimiento');
      return;
    }

    try {
      const formattedDate = format(dateOfBirth, 'yyyy-MM-dd');

      await API.post('/auth/register', {
        firstName,
        lastName,
        dateOfBirth: formattedDate,
        email,
        password,
      });

      toast.success('✅ Registro exitoso');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      console.error('❌ Error al registrar:', err);
      const msg = err.response?.data?.message || 'Error al registrar';
      toast.error(`❌ ${msg}`);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Crear cuenta</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Apellidos"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <DatePicker
          locale="es"
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha de nacimiento"
          className="datepicker"
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">CREAR CUENTA</button>

        <p style={{ marginTop: '1rem' }}>
          ¿Ya tienes cuenta?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Iniciar sesión
          </span>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
}
