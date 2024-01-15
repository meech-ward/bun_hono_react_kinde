import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "@/pages/home";
import AllExpensesPage from "./pages/all-expenses";
import NewExpensePage from "./pages/new-expense";
import RootLayout from "./root-layout";

import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  NotFoundRoute,
} from "@tanstack/react-router";

const rootRoute = new RootRoute({
  component: RootLayout,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const allExpensesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/all-expenses",
  component: AllExpensesPage,
});

const newExpenseRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/new-expense",
  component: NewExpensePage,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <h1 className="text-2xl">Page not found</h1>,
})

const routeTree = rootRoute.addChildren([indexRoute, allExpensesRoute, newExpenseRoute]);

const router = new Router({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
