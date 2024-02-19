import { useContext } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../context/auth-provider"

import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"

export const Login = () => {
  const { login } = useContext(AuthContext)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await login(email, password)
    } catch (error) {
      console.error("Error logging in: ", error)
    }
  }

  return (
    <main className="container">
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  aria-label="Email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  aria-label="Password"
                  required
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Sign in
              </Button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-sky-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
