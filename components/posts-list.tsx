"use client"

import { usePosts } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Eye } from "lucide-react"
import Link from "next/link"

export function PostsList() {
  const { data: posts, isLoading, error } = usePosts()

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-9 w-24 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load posts. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (!posts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            <CardDescription>Post #{post.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 line-clamp-3 mb-4">{post.body}</p>
            <Button asChild size="sm">
              <Link href={`/posts/${post.id}`}>
                <Eye className="w-4 h-4 mr-2" />
                Read More
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
