import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { httpClient } from "../api/http-client"
import { AuthContext } from "../context/auth-provider"

import { Button } from "../components/ui/button"

import { DeletePost } from "../components/delete-post"
import { AddPost } from "../components/add-post"

interface User {
  userId: number
  username: string
  email: string
  expiresAt: Date
}

interface Post {
  id: number
  title: string
  content: string
  created_at: Date
}

export const Home = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  const isTokenExpired = (expiresAt: Date): boolean => {
    const now = new Date()
    const expirationDate = new Date(expiresAt)

    return expirationDate < now
  }

  const handleDeletePost = async (id: number) => {
    try {
      const token = sessionStorage.getItem("token")

      if (!token) {
        console.error("No token found. Redirecting to login...")

        navigate("/login")

        return
      }

      await httpClient.delete(`/posts/${id}`, {
        Authorization: `Bearer ${token}`,
      })

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = sessionStorage.getItem("token")

        if (!token) {
          console.error("No token found. Redirecting to login...")

          navigate("/login")

          return
        }

        const { data } = await httpClient.get<Post[]>("/posts", {
          Authorization: `Bearer ${token}`,
        })

        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user")

    if (!storedUser) {
      navigate("/login")
    } else {
      const parsedUser = JSON.parse(storedUser)

      if (isTokenExpired(parsedUser.expiresAt)) {
        console.error("Token expired. Redirecting to login...")

        logout()
      } else {
        setUser(parsedUser)
      }
    }
  }, [])

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] bg-slate-50">
      <aside className="p-3">
        <div className="border-b flex flex-col gap-y-1 mb-3">
          <span className="text-sm font-semibold text-slate-600">
            Welcome, {user?.username}!
          </span>
          <span className="text-sm font-semibold text-slate-600">
            {user?.email}
          </span>
        </div>

        <Button variant="primary" onClick={logout}>
          Logout
        </Button>
      </aside>
      <main className="m-3 ml-4 flex flex-1 flex-col gap-4 rounded-lg border bg-white p-4 md:gap-8 md:p-6">
        <div className="flex flex-row gap-x-2">
          <h2 className="text-3xl font-bold">Posts</h2>
          <AddPost />
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Created at
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="bg-white border-b">
                    <td className="px-6 py-4">{post.id}</td>
                    <td className="px-6 py-4">{post.title}</td>
                    <td className="px-6 py-4">{post.content}</td>
                    <td className="px-6 py-4">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeletePost
                        postId={post.id}
                        handleDelete={handleDeletePost}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No posts found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
