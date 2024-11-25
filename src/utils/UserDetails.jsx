import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { getUser } from '../hooks/UserServices';


export const UserDetails = () => {
    const { id } = useParams();
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

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        error ? (
            <div className="error">
                <h1 className="text-danger">Error!!!</h1>
            </div>
        ) : (
            <div className="detailUser">
                <h1 className="textoHead1 mt-4">Detalles del usuario</h1>
                <div className="userInfo">
                    <h3 className="text-info">ID: {loading ? "Cargando..." : user.id}</h3>
                    <h3 className="text-info">Nombre: {loading ? "Cargando..." : user.name}</h3>
                    <h3 className="text-info">Email: {loading ? "Cargando..." : user.email}</h3>
                </div>
                {!loading && (
                    <div className='botones'>
                        <Link to={`/edit/${user.id}`} type="button" className='btn btn-outline-success'>Editar Usuario</Link>
                        <Link to={`/delete/${user.id}`} type="button" className='btn btn-outline-warning'>Borrar Usuario</Link>
                        <Link to={"/"} type="button" className='btn btn-outline-info'>Volver a la lista</Link>
                    </div>
                )}
            </div>
        )
    );
};
