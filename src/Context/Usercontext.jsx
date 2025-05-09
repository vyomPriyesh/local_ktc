import { createContext, useContext, useEffect, useState } from "react";
import { encryptDecrypt } from "../Apis/encryptDecrypt";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { decryptData } = encryptDecrypt();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [custData, setCustdata] = useState(null)

    const storedUser = localStorage.getItem("data");

    useEffect(() => {
        if (storedUser) {
            const decrypted = decryptData(storedUser);
            if (decrypted) setUser(decrypted); setCustdata(decrypted);
        }
    }, [storedUser]);

    const logout = () => {
        setUser(null)
        localStorage.removeItem("data");
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading, logout, custData, setCustdata }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};
