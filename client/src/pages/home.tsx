import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface User {
  userId: number
  username: string
  email: string
}

export const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const user = sessionStorage.getItem("user")

    if (!user) {
      navigate("/register")
    } else {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <p>User ID: {user?.userId}</p>
      <p>Email: {user?.email}</p>
    </div>
  )
}
