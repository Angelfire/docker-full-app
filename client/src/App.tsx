import { BrowserRouter, Routes, Route } from "react-router-dom"

import { WithAuth } from "./components/auth/with-auth"

import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { ErrorPage } from "./pages/error-page"
import { AuthProvider } from "./context/auth-provider"

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <WithAuth>
                <Home />
              </WithAuth>
            }
            errorElement={<ErrorPage />}
          />
          <Route path="login/" element={<Login />} />
          <Route path="register/" element={<Register />} />
          <Route path="/:any" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
