/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react"
import { loginUser, registerUser, type AuthResponse } from "@/api/auth"

interface User {id: string; name: string; email: string}

interface AuthContextType {
    user : User | null
    token : string | null
    login: (email:string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null >(null)


export function AuthProvider({children}: {children: ReactNode}){
    const [token, setToken] = useState<string | null>(()=> localStorage.getItem("token"))
    const [user, setUser] = useState<User | null> (()=>{
        const stored = localStorage.getItem("user")
        return stored ? JSON.parse(stored) : null
    })

    const saveAuth = (data: AuthResponse) =>{
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
    }

    const login = async(email: string, password: string)=>{
        const data = await loginUser(email, password)
        saveAuth(data)
    }

    const register = async(name: string, email: string, password: string)=>{
        const data = await registerUser(name, email, password)
        saveAuth(data)
    }

    const logout = () =>{
        setToken(null)
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return(
        <AuthContext.Provider value={{user, token, login , register, logout, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("useAuth must be used inside AuthProvider ")
        return ctx
}

