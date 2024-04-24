import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuth) {
      toast.error('Debes iniciar sesión para acceder a esta página')
      throw redirect({
        to: '/login',
        search: {
          location: location.href,
        },
      })
    }
    return {
      user: context.auth.user,
    }
  },
})
