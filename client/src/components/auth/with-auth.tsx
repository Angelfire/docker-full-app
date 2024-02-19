import { FC, ReactNode } from "react"
import { Navigate } from "react-router-dom"

// import { AuthContext } from "../../context/auth-provider"

// TODO: Find a way to make this work with the context and not with sessionStorage directly
// In this point user and accessToken are always null because the context is not being updated in time to be used here
interface MyOwnRouteProps {
  children: ReactNode
}

export const WithAuth: FC<MyOwnRouteProps> = ({ children }) => {
  // const { user, accessToken } = useContext(AuthContext)
  const storedToken = sessionStorage.getItem("token")
  const storedUser = sessionStorage.getItem("user")

  return storedUser && storedToken ? children : <Navigate to="/login" />
}
