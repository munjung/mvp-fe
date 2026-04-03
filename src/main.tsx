import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './router'
import './styles/main.css'
import DialogProvider from './providers/DialogProvider'
import BaseLoader from './components/common/BaseLoader'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <>
        <BaseLoader />
        <RouterProvider router={router} />
        <DialogProvider />
      </>
    </QueryClientProvider>
  </React.StrictMode>,
)
