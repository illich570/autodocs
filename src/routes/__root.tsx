import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { QueryClient } from '@tanstack/react-query'
import { authContextType } from '@/contexts/AuthContext'

export const Route = createRootRouteWithContext<{
  auth: authContextType
  queryClient: QueryClient
}>()({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools />
      <Toaster richColors />
    </>
  ),
})
