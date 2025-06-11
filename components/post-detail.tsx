"use client"

import { usePost } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Calendar, User } from "lucide-react"

interface PostDetailProps {
  postId: string
}

export function PostDetail({ postId }: PostDetailProps) {
  const { data: post, isLoading, error } = usePost(Number.parseInt(postId))

  if (isLoading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-4xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load post. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Post not found.</p>
      </div>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-base">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            User {post.userId}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Post #{post.id}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{post.body}</p>
        </div>
      </CardContent>
    </Card>
  )
}
