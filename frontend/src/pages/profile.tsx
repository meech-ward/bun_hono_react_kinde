import { Button } from "@/components/ui/button";

import { userQueryOptions } from "@/lib/user-query";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {

  const {data: user} = useQuery(userQueryOptions);

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-4xl font-bold">Hi {user?.given_name}</h1>
      <div className="text-2xl font-bold">{user?.email}</div>
      <Button asChild>
        <a href="/logout">Logout</a>
      </Button>
    </div>
  );
}
