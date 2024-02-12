import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});

async function getTotalExpense() {
  const res = await api.expenses["total-amount"].$get() //api.expenses.["total-amount"].$get()
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

function HomePage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getTotalSpent"],
    queryFn: getTotalExpense,
  });

  const totalSpent = formatCurrency(data?.total ?? 0);

  return (
    <>
      <Card className="w-fit mx-auto">
        <CardHeader>
          <CardTitle className="text-sm">Total Spent:</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? "An error has occurred: " + error.message : null}
          <div className="text-2xl font-bold">
            {isPending ? "..." : totalSpent}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
