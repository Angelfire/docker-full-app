import { useNavigate } from "react-router-dom"
import { httpClient } from "../api/http-client"

interface UserLoginResponse {
  user: {
    id: number
    username: string
    email: string
    accessToken: string
  }
}

export const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { data } = await httpClient.post<UserLoginResponse>(
        "/users/login",
        {
          email,
          password,
        }
      )

      sessionStorage.setItem("token", data.user.accessToken)
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
          username: data.user.username,
        })
      )

      navigate("/")
    } catch (error) {
      console.error("Error logging in: ", error)
    }
  }

  return (
    <main className="container">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
        />

        <button type="submit">Login</button>
      </form>
    </main>
  )
}
