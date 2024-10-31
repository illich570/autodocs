import { useIsMobile } from '@/hooks/UseBreakpoint'
import { createContext, ReactNode, useContext, useState, useMemo, useCallback } from 'react'

type SidebarContextType = {
  isOpen: boolean
  toggleSidebar: () => void
  isMobile: boolean
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggleSidebar: () => {},
  isMobile: false,
})

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), [])
  const isMobile = useIsMobile()

  const value = useMemo(
    () => ({ isOpen, toggleSidebar, isMobile }),
    [isOpen, toggleSidebar, isMobile],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export { SidebarProvider, useSidebar }
