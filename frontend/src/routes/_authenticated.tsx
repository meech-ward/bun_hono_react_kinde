import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/user-query";

import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    const { user } = await (async () => {
      try {
        const user = await queryClient.fetchQuery(userQueryOptions);
        return { user };
      } catch (error) {
        return { user: null };
      }
    })();
    console.log({ user });
    if (!user) {
      throw redirect({
        to: "/login",
      });
    }
  },
});
