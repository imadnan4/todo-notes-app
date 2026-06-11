import { type ReactNode } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
    children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to='/login' replace />
}