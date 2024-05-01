import { ReactNode } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <main className="flex-1 border-b">
        <div className="lg:grid lg:grid-cols-8">
          <div className="fixed top-0 z-30 hidden h-screen shrink-0 border-r-2 md:sticky md:block lg:col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-7">
            <Navbar />
            <div className="p-6">{children}</div>
          </div>
        </div>
      </main>
      <footer className="border-t py-2 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4  md:h-24 md:flex-row">
          <p className="text-balance text-center leading-loose text-muted-foreground md:text-left">
            Built by IllichR. 2024
          </p>
        </div>
      </footer>
    </div>
  )
}

export { Layout }
