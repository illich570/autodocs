import HomeWrapper from '@/pages/HomeWrapper'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: HomeWrapper,
})
