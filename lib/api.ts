export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface CreatePostData {
  title: string
  body: string
  userId: number
}

export interface UpdatePostData {
  id: number
  title: string
  body: string
  userId: number
}

const API_BASE = "https://jsonplaceholder.typicode.com"

export const postsApi = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE}/posts`)
    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }
    return response.json()
  },

  // Get single post
  getPost: async (id: number): Promise<Post> => {
    const response = await fetch(`${API_BASE}/posts/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch post")
    }
    return response.json()
  },

  // Create post
  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to create post")
    }
    return response.json()
  },

  // Update post
  updatePost: async (data: UpdatePostData): Promise<Post> => {
    const response = await fetch(`${API_BASE}/posts/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update post")
    }
    return response.json()
  },

  // Delete post
  deletePost: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete post")
    }
  },
}
