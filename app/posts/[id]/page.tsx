import { PostDetail } from "@/components/post-detail"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" className="mb-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PostDetail postId={params.id} />
      </main>
    </div>
  )
}
