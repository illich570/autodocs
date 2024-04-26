import Login from '@/pages/Login'
import { createFileRoute } from '@tanstack/react-router'
import { optional, parse, string } from 'valibot'

type redirectSearch = {
  redirect: string | undefined
}

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): redirectSearch => {
    const parsed = parse(optional(string()), search.redirect)
    return {
      redirect: parsed,
    }
  },
  component: Login,
})
