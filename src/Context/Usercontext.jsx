import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const userData = localStorage.getItem("user")

    useEffect(() => {
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [userData])

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);


    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};
