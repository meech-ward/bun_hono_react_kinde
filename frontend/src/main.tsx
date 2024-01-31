import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { RouterProvider, createRouter } from '@tanstack/react-router'
// import { NotFoundRoute } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
// import { Route as rootRoute } from './routes/__root.tsx'


// const notFoundRoute = new NotFoundRoute({
//   getParentRoute: () => rootRoute,
//   component: () => '404 Not Found',
// })

const queryClient = new QueryClient();
// Set up a Router instance
const router = createRouter({
  routeTree,
  // notFoundRoute,
  context: {
    queryClient,
  }
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
