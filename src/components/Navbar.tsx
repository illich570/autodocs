import { useAuth } from '@/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import { useNavigate } from '@tanstack/react-router'
import { MenuIcon, UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useSidebar } from '@/contexts/SidebarContext'
import { Button } from './ui/Button'
import { useIsMobile } from '@/hooks/UseBreakpoint'

const Navbar = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { toggleSidebar } = useSidebar()
  const fullName = `${user?.firstName} ${user?.lastName}`

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
    toast.info('Sesión cerrada')
  }
  return (
    <header className="sticky top-0 z-50  h-14 border-b-2 border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between">
        {isMobile && (
          <Button variant="ghost" onClick={toggleSidebar}>
            <MenuIcon />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 shadow-md"
            >
              <UserIcon />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" side="left" align="start">
            <DropdownMenuLabel className="bg-accent">{fullName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export { Navbar }
