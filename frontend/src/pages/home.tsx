import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getTotalSpent"],
    queryFn: () => api.expenses.total.$get().then((res) => res.json()),
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
