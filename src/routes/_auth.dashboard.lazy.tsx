import { Home } from '@/pages/Home'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/dashboard')({
  component: Home,
})
