import api from './axios'

export interface AuthResponse {
    token: string
    user: { id: string, name: string, email: string }
}

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post("/api/auth/register", { name, email, password })
    return res.data
}


export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post("/api/auth/login", { email, password })
    return res.data
}
