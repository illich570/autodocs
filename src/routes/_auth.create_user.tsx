import CreateUserWrapper from '@/pages/CreateUser'
import { TYPE_USERS } from '@/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/create_user')({
  beforeLoad: async ({ context }) => {
    if (context.auth.user?.typeUserName !== TYPE_USERS.Administrador.name) {
      toast.error('Necesitas ser administrador para acceder a esta página')
      throw redirect({
        to: '/dashboard',
      })
    }
    return {
      user: context.auth.user,
    }
  },
  component: CreateUserWrapper,
})
