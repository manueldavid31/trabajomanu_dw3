import { Link } from 'react-router-dom';

import { API_URL } from '../config/constants';
import { useUserContext } from '../hooks/useUserContext';

export const UserList = () => {
    const { users, loading } = useUserContext();

    return (
        <div id="ListUsers">
            <h1 className="textoHead1 mt-4">Usuarios</h1>
            <h3>
                <a
                    className="name link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    href={API_URL}
                    target="_blank"
                >
                    Base de datos
                </a>
            </h3>
            <Link to="/create" className="btn btn-outline-success">Crear Usuario</Link>
            {loading ? (
                <div style={{ textAlign: 'center', margin: '.5rem' }}>
                    <h1>Cargando usuarios...</h1>
                </div>
            ) : users.length === 0 ? (
                <div style={{ textAlign: 'center', margin: '.5rem' }}>
                    <p style={{ fontSize: '34px' }}>No hay usuarios en la lista.</p>
                </div>
            ) : (
                <div id="listaCont">
                    <ul className="lista-tareas list-group list-group-numbered">
                        {users.map((user) => (
                            <li className="lista a b list-group-item list-group-item-action" key={user.id}>
                                <label className="textSpan">Usuario: {user.name}</label>
                                <label className="textSpan">Email: {user.email}</label>
                                <div className="botones">
                                    <Link to={`/users/${user.id}`} className='btn btn-outline-info'>Ver Usuario</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};