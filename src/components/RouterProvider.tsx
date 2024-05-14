import { useAuth } from '@/components/AuthContext'
import router from '@/lib/router'
import { RouterProvider } from '@tanstack/react-router'

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const RouterApp = () => {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

export default RouterApp
