import { Link, useNavigate } from "react-router-dom"

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
          expiresAt: new Date(Date.now() + data.user.expiresIn * 1000),
        })
      )

      navigate("/")
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
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  aria-label="Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                  aria-label="Password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
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
