"use client"

import { useState } from "react"
import { usePosts } from "@/lib/hooks"
import { PostForm } from "./post-form"
import { PostsTable } from "./posts-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, FileText, BarChart3 } from "lucide-react"
import type { Post } from "@/lib/api"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const { data: posts } = usePosts()

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setActiveTab("create")
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setActiveTab("posts")
  }

  const handlePostSaved = () => {
    setEditingPost(null)
    setActiveTab("posts")
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="posts">
            <FileText className="w-4 h-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="create">
            <Plus className="w-4 h-4 mr-2" />
            {editingPost ? "Edit Post" : "Create Post"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts?.length || 0}</div>
                <p className="text-xs text-muted-foreground">All posts in the system</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Posts</CardTitle>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts?.slice(0, 10).length || 0}</div>
                <p className="text-xs text-muted-foreground">Latest 10 posts</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button onClick={() => setActiveTab("create")}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("posts")}>
                <FileText className="w-4 h-4 mr-2" />
                Manage Posts
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts">
          <PostsTable onEditPost={handleEditPost} />
        </TabsContent>

        <TabsContent value="create">
          <PostForm post={editingPost} onCancel={handleCancelEdit} onSaved={handlePostSaved} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
