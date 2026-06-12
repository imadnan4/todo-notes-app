import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { IconNotebook } from "@tabler/icons-react"

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="itemitems-center flex justify-between border-b px-6 py-3">
      <div className="flex items-center gap-2">
        <IconNotebook className="h-5 w-5" />
        <span className="text-sm font-medium">Notes App</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{user?.name}</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  )
}
