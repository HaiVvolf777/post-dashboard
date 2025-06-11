"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postsApi, type Post } from "./api"
import { toast } from "sonner"

// Query keys
export const queryKeys = {
  posts: ["posts"] as const,
  post: (id: number) => ["posts", id] as const,
}

// Get all posts
export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: postsApi.getPosts,
  })
}

// Get single post
export function usePost(id: number) {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
  })
}

// Create post mutation
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: (newPost) => {
      // Add the new post to the cache
      queryClient.setQueryData<Post[]>(queryKeys.posts, (old) => {
        return old ? [newPost, ...old] : [newPost]
      })
      toast.success("Post created successfully")
    },
    onError: () => {
      toast.error("Failed to create post")
    },
  })
}

// Update post mutation
export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postsApi.updatePost,
    onSuccess: (updatedPost) => {
      // Update the post in the cache
      queryClient.setQueryData<Post[]>(queryKeys.posts, (old) => {
        return old?.map((post) => (post.id === updatedPost.id ? updatedPost : post)) || []
      })
      // Update single post cache
      queryClient.setQueryData(queryKeys.post(updatedPost.id), updatedPost)
      toast.success("Post updated successfully")
    },
    onError: () => {
      toast.error("Failed to update post")
    },
  })
}

// Delete post mutation
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: (_, deletedId) => {
      // Remove the post from the cache
      queryClient.setQueryData<Post[]>(queryKeys.posts, (old) => {
        return old?.filter((post) => post.id !== deletedId) || []
      })
      toast.success("Post deleted successfully")
    },
    onError: () => {
      toast.error("Failed to delete post")
    },
  })
}
