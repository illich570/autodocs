import { ReactNode } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { SidebarProvider } from '../contexts/SidebarContext'

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-svh w-full flex-1 bg-background">
      <SidebarProvider>
        <Sidebar />
        <main className="relative flex min-h-svh w-full flex-1 flex-col">
          <Navbar />
          <div className="flex w-full flex-1 bg-gray-50 p-4 dark:bg-gray-900">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}

export { Layout }
