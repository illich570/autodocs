import GenerateDocument from '@/pages/GenerateDocument'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/generate')({
  component: GenerateDocument,
})
