import { PostsList } from "@/components/posts-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Posts Hub</h1>
            <p className="text-slate-600 text-sm">Discover amazing content</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin">
              <Settings className="w-4 h-4 mr-2" />
              Admin Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Latest Posts</h2>
          <p className="text-slate-600">Browse through our collection of posts</p>
        </div>
        <PostsList />
      </main>
    </div>
  )
}
