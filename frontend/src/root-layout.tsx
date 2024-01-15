import React, { Suspense } from "react";
import { Outlet, Link } from "@tanstack/react-router";
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

export default function RootLayout() {
  return (
    <>
      <div className="p-2 flex max-w-2xl mx-auto justify-between items-center ">
        <Link to="/" className="text-2xl">
          Expense Tracker
        </Link>
        <div className="flex gap-x-4">
          {" "}
          <Link to="/all-expenses" className="[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors">
            All Expenses
          </Link>{" "}
          <Link to="/new-expense" className="[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors">
            New Expense
          </Link>
        </div>
      </div>
      <hr />
      <div className="bg-background text-foreground flex flex-col m-10 gap-y-10 max-w-2xl mx-auto">
        <Outlet />
      </div>
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}
