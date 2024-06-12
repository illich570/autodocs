import VinculateClientWrapper from '@/pages/VinculateClient'
import { TYPE_USERS } from '@/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/vinculate_client')({
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
  component: VinculateClientWrapper,
})
