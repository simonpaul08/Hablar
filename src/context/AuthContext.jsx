import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../services/Firebase";


const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrenUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const signup = (auth, email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (auth, email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const username = (currentUser, item) => {
        return updateProfile(currentUser, item)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrenUser(user)
            console.log(user)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])


    let value = {
        currentUser,
        signup,
        login,
        logout,
        username
    }

    return(
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )

}

