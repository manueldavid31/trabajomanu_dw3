import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { deleteUser, getUser } from '../hooks/UserServices';
import { useUserContext } from '../hooks/useUserContext';


export const UserDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { refreshUsers } = useUserContext();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getUser(id);
            if (data) {
                setUser(data);
                setError(false);
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (error) {
            console.log("Error al conseguir el usuario:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteUser(user.id);

            if (response.ok) {
                refreshUsers();
                alert("Usuario eliminado con éxito");
                navigate("/");
            } else if (response.status === 404) {
                alert("El usuario ya no existe en la base de datos");
                navigate("/");
            } else {
                alert("Error al borrar el usuario");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al procesar la solicitud");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        error ? (
            <div className="error">
                <h1 className="text-danger">Error!!!</h1>
            </div>
        ) : (
            <div className="deleteUser">
                <h1 className="textoHead1 mt-4 text-danger">¿Estás seguro de que quieres borrar este usuario?</h1>
                <div className="userInfo">
                    <h3 className="text-info">ID: {loading ? "Cargando..." : user.id}</h3>
                    <h3 className="text-info">Nombre: {loading ? "Cargando..." : user.name}</h3>
                    <h3 className="text-info">Email: {loading ? "Cargando..." : user.email}</h3>
                </div>
                {!loading && (
                    <div className="botones">
                        <button className="btn btn-outline-danger" type='submit' onClick={handleDelete}>Si, eliminar</button>
                        <button className="btn btn-outline-primary" type='button' onClick={() => navigate("/")}>No, volver</button>
                    </div>
                )}
            </div>
        )
    );
};