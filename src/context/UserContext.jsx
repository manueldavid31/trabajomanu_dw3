import { createContext, useEffect, useState } from "react";
import { getUsers } from "../hooks/UserServices";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.log("Error al conseguir los usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const refreshUsers = () => {
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, loading, refreshUsers }}>
            {children}
        </UserContext.Provider>
    );
};