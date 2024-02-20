import { useState } from "react"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

import { AddPlus } from "./icons/add-plus"

import { httpClient } from "../api/http-client"

export const AddPost = () => {
  const [open, setOpen] = useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const title = formData.get("title") as string
    const content = formData.get("content") as string

    try {
      const token = sessionStorage.getItem("token")

      if (!token) {
        console.error("No token found. Redirecting to login...")

        return
      }

      const { status } = await httpClient.post(
        "/posts/create",
        {
          title,
          content,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (status === 201) {
        setOpen(false)
      }
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <AddPlus className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" name="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Input id="content" name="content" className="col-span-3" />
            </div>
          </div>
          <Button variant="primary" type="submit">
            Create Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
