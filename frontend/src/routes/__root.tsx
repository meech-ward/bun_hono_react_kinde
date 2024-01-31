import { Outlet, Link } from "@tanstack/react-router";

import { userQueryOptions } from "@/lib/user-query";
import { useQuery } from "@tanstack/react-query";
import { type QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext } from "@tanstack/react-router";


import { NotFound } from "@/components/not-found"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
    notFoundComponent: NotFound,
  },
);

function RootLayout() {
  const { data: user } = useQuery(userQueryOptions);

  return (
    <>
      <div className="py-2 flex max-w-2xl mx-auto justify-between items-center ">
        <Link to="/" className="text-2xl">
          Expense Tracker
        </Link>
        <div className="flex gap-x-4">
          {" "}
          <Link
            to="/all-expenses"
            className="[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors"
          >
            All Expenses
          </Link>{" "}
          <Link
            to="/new-expense"
            className="[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors"
          >
            New Expense
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors"
            >
              Profile
            </Link>
          ) : null}
        </div>
      </div>
      <hr />
      <div className="bg-background text-foreground flex flex-col m-10 gap-y-10 max-w-2xl mx-auto">
        <Outlet />
      </div>
    </>
  );
}
