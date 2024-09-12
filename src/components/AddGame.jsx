import React, { useState } from 'react';
import axios from 'axios';

const AddGame = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        category: 'action',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // Cambia a `true` para mostrar el modal

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/games', formData);
            console.log(response);
            if (response.data.status === 201) {
                setSuccess(true); // Muestra el modal de éxito
                setError(null);
            } else {
                setError('Error al agregar el juego');
            }
        } catch (error) {
            setError('Error al agregar el juego. Intenta nuevamente.');
        }
    };

    // Manejar el cierre del modal y redirigir a la página de inicio
    const handleRedirect = () => {
        setSuccess(false);
        window.location.href = '/';
    };

    return (
        <div>
            <h1>Añadir un Nuevo Juego</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre del Juego</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">URL de la Imagen</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="category">Categoría</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="action">Acción</option>
                        <option value="adventure">Aventura</option>
                        <option value="fighting">Lucha</option>
                        <option value="sports">Deportes</option>
                        <option value="RPG">RPG</option>
                        <option value="racing">Carreras</option>
                        <option value="shooter">Shooter</option>
                        <option value="simulation">Simulación</option>
                    </select>
                </div>

                <button type="submit">Añadir Juego</button>

                {error && <p className="error-message">{error}</p>}
            </form>

            {/* Modal de éxito */}
            {success && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Juego agregado con éxito</h5>
                                <button type="button" className="btn-close" onClick={handleRedirect}></button>
                            </div>
                            <div className="modal-body">
                                <p>El juego ha sido añadido correctamente.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleRedirect}>
                                    Volver al inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddGame;
