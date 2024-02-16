import { Link } from "react-router-dom"

import { httpClient, HttpResponse } from "../api/http-client"

interface UserRegisterResponse {
  message: string
}

// TODO: implement form validation and error handling for the registration form fields (username, email, password)
export const Register = () => {
  // const [usernameError, setUsernameError] = useState<string | null>(null)
  // const [emailError, setEmailError] = useState<string | null>(null)
  // const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Clear existing errors
    // setUsernameError(null)
    // setEmailError(null)
    // setPasswordError(null)

    // const usernameRegex = /^[a-zA-Z0-9-_]{3,30}$/
    // if (!usernameRegex.test(username)) {
    //   setUsernameError(
    //     "Username must be 3-30 characters long and contain only letters, numbers, underscores, or hyphens."
    //   )
    // }

    // const emailRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // if (!emailRegex.test(email)) {
    //   setEmailError("Please enter a valid email address.")
    // }

    // if (!password) {
    //   setPasswordError("Please enter a password. It cannot be empty.")
    // }

    // Check if any errors exist or if the fields are empty
    if (
      // usernameError ||
      // emailError ||
      // passwordError ||
      !username ||
      !email ||
      !password
    ) {
      return // Prevent submission if errors exist or fields are empty
    }

    try {
      const { data, status }: HttpResponse<UserRegisterResponse> =
        await httpClient.post("/users/register", {
          username,
          email,
          password,
        })

      // Ideally we would show a success message to the user here instead of logging to the console :)
      if (status === 200) {
        console.log(data?.message)
      }

      form.reset()
    } catch (error) {
      console.error("Error de red", error)
    }
  }

  return (
    <main className="container">
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                  placeholder="username"
                  aria-label="Username"
                  required
                />
              </div>
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
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-sky-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
