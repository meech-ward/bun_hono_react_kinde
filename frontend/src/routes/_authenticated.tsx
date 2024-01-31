import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/user-query";
import { Login } from "@/components/login";

const Component = () => {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <Login />;
  }
  return <Outlet />;
}

export const Route = createFileRoute("/_authenticated")({
  component: Component,
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const user = await queryClient.fetchQuery(userQueryOptions);
      return { user };
    } catch (error) {
      return { user: null };
    }
  },
});

