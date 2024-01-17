import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "@/pages/home";
import AllExpensesPage from "@/pages/all-expenses";
import NewExpensePage from "@/pages/new-expense";
import LoginPage from "@/pages/login";
import AboutPage from "@/pages/about";

import RootLayout from "@/root-layout";

import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  NotFoundRoute,
  Outlet,
} from "@tanstack/react-router";
import ProfilePage from "./pages/profile";

import { userQueryOptions } from "@/lib/user-query";

const queryClient = new QueryClient();

const rootRoute = new RootRoute({
  component: RootLayout,
});

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: () => {
    const { user } = authRoute.useRouteContext();

    if (!user) {
      return <LoginPage />;
    }
    return <Outlet />;
  },
  beforeLoad: async () => {
    try {
      const user = await queryClient.fetchQuery(userQueryOptions);
      return { user };
    } catch (error) {
      return { user: null };
    }
  },
});

const indexRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/",
  component: HomePage,
});

const allExpensesRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/all-expenses",
  component: AllExpensesPage,
});

const newExpenseRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/new-expense",
  component: NewExpensePage,
});

const profileRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/profile",
  component: ProfilePage,
});

const aboutRoute = new Route({
  getParentRoute: () => indexRoute,
  path: "/about",
  component: AboutPage,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <h1 className="text-2xl">Page not found</h1>,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([
    indexRoute,
    allExpensesRoute,
    newExpenseRoute,
    profileRoute,
  ]),
  aboutRoute,
]);

const router = new Router({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
