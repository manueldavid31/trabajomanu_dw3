import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../hooks/useUserContext';
import { addUser } from '../hooks/UserServices';

export const UserForm = () => {
    const navigate = useNavigate();
    const { users, refreshUsers } = useUserContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleAddUser = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const userExist = users.find(u =>
            u.name.trim().toLowerCase() === name.trim().toLowerCase() &&
            u.email.trim().toLowerCase() === email.trim().toLowerCase()
        );

        if (userExist) {
            alert("Ya existe un usuario con ese nombre o email.");
            return;
        }

        try {
            const response = await addUser({
                name: name.trim(),
                email: email.trim().toLowerCase()
            });

            if (response.ok) {
                refreshUsers();
                alert("Usuario agregado con éxito");
                navigate("/");
            } else if (response.status === 400) {
                alert("Se ha alcanzado el máximo de usuarios permitidos.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form id="FormUser" onSubmit={handleAddUser}>
            <h1 className="textoHead1 mb-2">Crear usuario</h1>

            <label className="labText" htmlFor="name">Nombre: </label>
            <input
                id="name"
                className="form-control"
                type="text"
                value={name}
                maxLength={50}
                placeholder={"John Doe"}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="labText" htmlFor="email">Email: </label>
            <input
                id="email"
                className="form-control"
                type="text"
                value={email}
                maxLength={50}
                placeholder={"johndoe@gmail.com"}
                onChange={(e) => setEmail(e.target.value)}
            />

            <div className='botones'>
                <button className="btn btn-outline-success" type="submit">
                    Agregar Usuario
                </button>
                <button className='btn btn-outline-info' type='button' onClick={() => navigate('/')}>
                    Volver
                </button>
        </div>
        </form >
    );
};