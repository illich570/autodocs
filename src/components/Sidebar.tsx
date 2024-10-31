import { FileCogIcon, LayoutDashboardIcon, UserPlusIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

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
  return (
    <aside className="fixed top-0 z-30 hidden h-screen w-60 shrink-0 border-r-2 lg:sticky lg:block">
      <div className="m-4 grid grid-flow-row auto-rows-max p-4 text-xs">
        {ITEMS_SIDEBAR.map((item) => (
          <Link
            to={item.href}
            key={item.title}
            className="group flex h-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
            preload={false}
          >
            <span className="mr-2">{<item.icon size={22} />}</span>
            {item.title}
          </Link>
        ))}
      </div>
    </aside>
  )
}

export { Sidebar }
