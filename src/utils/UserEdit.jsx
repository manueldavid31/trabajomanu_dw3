import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUserContext } from "../hooks/useUserContext";
import { updateUser, getUser } from "../hooks/UserServices";

export const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users, refreshUsers } = useUserContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const data = await getUser(id);
            if (data) {
                setUser(data);
                setName(data.name);
                setEmail(data.email);
                setError(false);
            } else {
                setError(true);
            }
        } catch (error) {
            console.log("Error al conseguir el usuario:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            alert('Por favor, complete todos los campos.')
            return;
        };

        const userExist = users.find(u =>
            u.id !== user.id &&
            (u.name.trim().toLowerCase() === name.trim().toLowerCase() ||
                u.email.trim().toLowerCase() === email.trim().toLowerCase())
        );

        if (userExist) {
            alert("Ya existe un usuario con ese nombre o email.");
            return;
        }

        const updatedUser = {
            name: name.trim(),
            email: email.trim().toLowerCase()
        };

        try {
            const response = await updateUser(
                user.id,
                updatedUser
            );

            if (response.ok) {
                refreshUsers();
                alert("Usuario actualizado con éxito");
                navigate("/")
            } else {
                alert("Error al actualizar el usuario");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al actualizar el usuario");
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        error ? (
            <div className="error">
                <h1 className="text-danger">Error!!!</h1>
            </div>
        ) : (
            <form id="FormUser" onSubmit={handleUpdate}>
                <h1 className="textoHead1 mb-2">Editar usuario</h1>

                <label className="labText" htmlFor="name">Nombre: </label>
                <input
                    id="name"
                    className="form-control"
                    type="text"
                    value={name}
                    maxLength={50}
                    placeholder={user ? user.name : "Actualiza el nombre"}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="labText" htmlFor="email">Email: </label>
                <input
                    id="email"
                    className="form-control"
                    type="text"
                    value={email}
                    maxLength={50}
                    placeholder={user ? user.email : "Actualiza el email"}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className='botones'>
                    <button className="btn btn-outline-success" type="submit">
                        Actualizar Usuario
                        </button>
                        <button className='btn btn-outline-info' type='button' onClick={() => navigate('/')}>
                            Volver
                        </button>
                </div>
            </form>
        )
    )
};
