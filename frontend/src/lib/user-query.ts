import api from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

async function authenticatedUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data.user;
}

export const userQueryOptions = queryOptions({
  queryKey: ["user-me"],
  queryFn: () => authenticatedUser(),
  staleTime: Infinity,
});
