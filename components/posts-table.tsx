"use client"

import { usePosts, useDeletePost } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertCircle, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import type { Post } from "@/lib/api"

interface PostsTableProps {
  onEditPost: (post: Post) => void
}

export function PostsTable({ onEditPost }: PostsTableProps) {
  const { data: posts, isLoading, error } = usePosts()
  const deletePost = useDeletePost()

  const handleDelete = (id: number) => {
    deletePost.mutate(id)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>Manage your posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>No posts found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            No posts available. Create your first post to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts ({posts.length})</CardTitle>
        <CardDescription>Manage your posts</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-24">User</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-mono">{post.id}</TableCell>
                <TableCell>
                  <div className="max-w-md">
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{post.body}</p>
                  </div>
                </TableCell>
                <TableCell>{post.userId}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/posts/${post.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEditPost(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{post.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
