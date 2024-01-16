import { Button } from "@/components/ui/button";

import { userQueryOptions } from "@/lib/user-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ProfilePage() {

  const {data: user} = useSuspenseQuery(userQueryOptions);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Hi {user.family_name}</h1>
      <Button asChild>
        <a href="/logout">Logout</a>
      </Button>
    </div>
  );
}
