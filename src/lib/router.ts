// Import the generated route tree
import { createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import queryClient from '@/lib/queryClient'
// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

export default router
