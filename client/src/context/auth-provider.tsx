import { FC, ReactNode, createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { httpClient } from "../api/http-client"

interface UserLoginResponse {
  user: {
    id: number
    username: string
    email: string
    accessToken: string
    expiresIn: number
  }
}

interface User {
  userId: number
  email: string
  username: string
  expiresAt: Date
}

interface AuthContextProps {
  user: User | null
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  accessToken: null,
  login: async () => {},
  logout: () => {},
})

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user")
    const storedToken = sessionStorage.getItem("token")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedToken) {
      setAccessToken(storedToken)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { data } = await httpClient.post<UserLoginResponse>(
        "/users/login",
        {
          email,
          password,
        }
      )

      const currentUser = {
        userId: data.user.id,
        email: data.user.email,
        username: data.user.username,
        expiresAt: new Date(Date.now() + data.user.expiresIn * 1000),
      }

      const newAccessToken = data.user.accessToken

      sessionStorage.setItem("token", newAccessToken)
      sessionStorage.setItem("user", JSON.stringify(currentUser))

      setUser(currentUser)
      setAccessToken(newAccessToken)

      navigate("/")
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
    }
  }

  const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")

    setUser(null)
    setAccessToken(null)

    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
