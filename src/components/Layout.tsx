import { ReactNode } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { SidebarProvider } from './SidebarContext'

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-1 bg-background">
      <SidebarProvider>
        <Sidebar />
        <main className="relative flex flex-1 flex-col">
          <Navbar />
          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}

export { Layout }
