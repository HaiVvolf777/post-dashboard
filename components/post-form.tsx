"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCreatePost, useUpdatePost } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X } from "lucide-react"
import type { Post } from "@/lib/api"

interface PostFormProps {
  post?: Post | null
  onCancel?: () => void
  onSaved?: () => void
}

export function PostForm({ post, onCancel, onSaved }: PostFormProps) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [userId, setUserId] = useState(1)

  const createPost = useCreatePost()
  const updatePost = useUpdatePost()

  const isEditing = !!post
  const isLoading = createPost.isPending || updatePost.isPending

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setUserId(post.userId)
    } else {
      setTitle("")
      setBody("")
      setUserId(1)
    }
  }, [post])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !body.trim()) {
      return
    }

    try {
      if (isEditing) {
        await updatePost.mutateAsync({
          id: post.id,
          title: title.trim(),
          body: body.trim(),
          userId,
        })
      } else {
        await createPost.mutateAsync({
          title: title.trim(),
          body: body.trim(),
          userId,
        })
      }
      onSaved?.()
    } catch (error) {
      // Error handling is done in the mutation hooks
    }
  }

  const handleCancel = () => {
    setTitle("")
    setBody("")
    setUserId(1)
    onCancel?.()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Post" : "Create New Post"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update the post details below" : "Fill in the details to create a new post"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              type="number"
              value={userId}
              onChange={(e) => setUserId(Number.parseInt(e.target.value) || 1)}
              min="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Content</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post content here..."
              rows={10}
              className="resize-none"
              required
            />
            <p className="text-sm text-muted-foreground">{body.length} characters</p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading || !title.trim() || !body.trim()}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
