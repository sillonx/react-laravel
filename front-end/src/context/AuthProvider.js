import { createContext, useState } from 'react';

import { useCookies } from 'react-cookie';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cookies] = useCookies(['user']);

    if (cookies?.user) {
        setAuth(cookies.user);
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
