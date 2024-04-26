import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuth) {
      console.log('hola')
      toast.error('Necesitas iniciar sesión para acceder a esta página')
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
    return {
      user: context.auth.user,
    }
  },
})
