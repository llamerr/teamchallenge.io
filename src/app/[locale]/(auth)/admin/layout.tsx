import type React from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <div className="font-bold text-xl mb-4">DevArtifacts Admin</div>
          <nav className="flex gap-6 text-sm">
            <Link href="/admin" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/tags" className="hover:text-primary transition-colors">
              Tags Management
            </Link>
            <Link href="/artifacts" className="hover:text-primary transition-colors">
              Back to Artifacts
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

