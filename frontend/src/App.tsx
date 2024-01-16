import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import AllExpensesPage from "@/pages/all-expenses";
import NewExpensePage from "@/pages/new-expense";
import RootLayout from "@/root-layout";

import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  NotFoundRoute,
} from "@tanstack/react-router";

import api from "@/lib/api";
import ProfilePage from "./pages/profile";

const rootRoute = new RootRoute({
  component: RootLayout,
});

async function authenticatedUser() {
  try {
    const res = await api.me.$get();
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch (err) {
    return null;
  }
}

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "auth",
  beforeLoad: async () => {
    console.log("before load");
    const user = await authenticatedUser();
    return { user };
  },
});

const indexRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/",
  component: () => {
    const { user } = indexRoute.useRouteContext();
    console.log(user);
    if (!user) {
      return <LoginPage />;
    }
    return <HomePage />;
  },
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: NewExpensePage,
});

const profileRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/profile",
  component: () => {
    const { user } = profileRoute.useRouteContext();
    console.log(user);
    if (!user) {
      return <LoginPage />;
    }
    return <ProfilePage user={user} />;
  },
  // loader: async () => {
  //   // wait 
  //   await new Promise((resolve) => setTimeout(resolve, 4000));
  //   return queryClient.ensureQueryData(queryOptions({
  //     queryKey: ["user-me"],
  //     queryFn: () => authenticatedUser(),
  //   }))
  // },
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
