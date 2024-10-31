import { FileCogIcon, LayoutDashboardIcon, UserPlusIcon } from 'lucide-react'
import { Link, useRouter } from '@tanstack/react-router'
import { useSidebar } from '@/contexts/SidebarContext'
import { Sheet, SheetContent } from './ui/Sheet'
import { cn } from '@/lib/utils'

const ITEMS_SIDEBAR = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Generar Documento',
    href: '/generate',
    icon: FileCogIcon,
  },
  {
    title: 'Crear usuario',
    href: '/create_user',
    icon: UserPlusIcon,
  },
  {
    title: 'Vincular cliente',
    href: '/vinculate_client',
    icon: UserPlusIcon,
  },
]

const Sidebar = () => {
  const { isMobile, isOpen, toggleSidebar } = useSidebar()
  const router = useRouter()

  const SidebarContent = () => (
    <div className="flex h-full w-full flex-col">
      {ITEMS_SIDEBAR.map((item) => {
        const isActive = router.state.location.pathname === item.href
        return (
          <Link
            to={item.href}
            key={item.title}
            className={cn(
              'flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm text-muted-foreground hover:underline',
              isActive && 'bg-accent text-accent-foreground',
            )}
            preload={false}
          >
            <span className="mr-2">{<item.icon size={22} />}</span>
            {item.title}
          </Link>
        )
      })}
    </div>
  )

  if (isMobile)
    return (
      <Sheet open={isOpen} onOpenChange={toggleSidebar}>
        <SheetContent side="left" className="h-full w-64 p-8">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    )

  return (
    <aside className="fixed top-0 z-30 hidden h-screen w-60 shrink-0 border-r-2 md:sticky md:block">
      <div className="m-4 grid grid-flow-row auto-rows-max p-4 text-xs">
        <SidebarContent />
      </div>
    </aside>
  )
}

export { Sidebar }
