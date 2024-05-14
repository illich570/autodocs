import { FileCogIcon, LayoutDashboardIcon, UserPlusIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const ITEMS_SIDEBAR = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboardIcon />,
  },
  {
    title: 'Generar Documento',
    href: '/generate',
    icon: <FileCogIcon />,
  },
  {
    title: 'Crear usuario',
    href: '/create_user',
    icon: <UserPlusIcon />,
  },
]
const Sidebar = () => {
  return (
    <aside className="h-full w-full">
      <div className="m-4 grid grid-flow-row auto-rows-max p-4 text-sm">
        {ITEMS_SIDEBAR.map((item) => (
          <Link
            to={item.href}
            key={item.title}
            className="group flex h-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
            preload={false}
          >
            <span className="mr-2">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </div>
    </aside>
  )
}

export { Sidebar }
