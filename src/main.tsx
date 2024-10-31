import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'

import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/sonner'
import RouterApp from '@/components/RouterProvider'
import queryClient from '@/lib/queryClient'
import { CookiesProvider } from 'react-cookie'

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <AuthProvider>
          <RouterApp />
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>,
  )
}
