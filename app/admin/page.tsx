import { AdminDashboard } from "@/components/admin-dashboard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 text-sm">Manage your posts</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Public Site
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AdminDashboard />
      </main>
    </div>
  )
}
