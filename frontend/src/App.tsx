import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/context/AuthContext'
import { PrivateRoute } from '@/components/PrivateRoute'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position='top-right' richColors />
        <Routes>
            <Route path="/" element={<Navigate to='/dashboard' replace/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

