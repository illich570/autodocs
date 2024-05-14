import HomeWrapper from '@/pages/Home'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: HomeWrapper,
})
