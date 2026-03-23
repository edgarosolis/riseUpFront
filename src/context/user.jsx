import { createContext, useEffect, useState } from "react";
import { getUserById } from "../axios/axiosFunctions";

export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=>null,
});

export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('userRiseUp')) || null);

    // Refresh user data from server to keep name/profile in sync
    useEffect(() => {
        const refreshUser = async () => {
            if (currentUser?._id) {
                const res = await getUserById(currentUser._id);
                if (res?.user) {
                    setCurrentUser(res.user);
                    localStorage.setItem('userRiseUp', JSON.stringify(res.user));
                }
            }
        };
        refreshUser();
    }, []);

    const value = {currentUser,setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
