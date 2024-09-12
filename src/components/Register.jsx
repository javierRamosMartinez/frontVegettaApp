import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        mail: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/register', formData);

            if (response.status === 200) {
                setSuccess('Registro exitoso');
                setError(null);

                const loginResponse = await axios.post('http://localhost:3000/auth/login', {
                    mail: formData.mail,
                    password: formData.password
                })
                localStorage.setItem('authToken', loginResponse.data.data.token);
                localStorage.setItem('userInfo', JSON.stringify(loginResponse.data.data.user));
                window.location.href = '/';
            } else {
                setError('Hubo un problema con el registro');
                setSuccess(null);
            }
        } catch (error) {
            console.error('Error al registrarse:', error);
            setError('Error al registrarse. Intenta nuevamente.');
            setSuccess(null);
        }
    };

    return (
        <div className="register-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="mail">Correo Electrónico</label>
                    <input
                        type="email"
                        id="mail"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        placeholder="Ingresa tu correo"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>

                <button type="submit">Registrar</button>
            </form>

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;
